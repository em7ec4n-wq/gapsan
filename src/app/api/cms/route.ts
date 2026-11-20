import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPO_OWNER = "em7ec4n-wq";
const REPO_NAME = "gapsan-cms-db";
const FILE_PATH = "cms-state.json";

let memoryCache: Record<string, unknown> | null = null;

function getHeaders() {
  const token = process.env.GITHUB_CMS_TOKEN;
  return {
    ...(token ? { Authorization: `token ${token}` } : {}),
    "User-Agent": "GAPSAN-CMS-Server",
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

export async function GET() {
  try {
    const token = process.env.GITHUB_CMS_TOKEN;
    if (!token) {
      return NextResponse.json({ ok: true, data: memoryCache });
    }

    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: getHeaders(),
        cache: "no-store",
      }
    );

    if (res.status === 404) {
      return NextResponse.json({ ok: true, data: memoryCache });
    }

    if (!res.ok) {
      return NextResponse.json({ ok: true, data: memoryCache });
    }

    const fileJson = await res.json();
    if (fileJson && fileJson.content) {
      const decoded = Buffer.from(fileJson.content, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded);
      memoryCache = parsed;
      return NextResponse.json({ ok: true, data: parsed });
    }

    return NextResponse.json({ ok: true, data: memoryCache });
  } catch {
    return NextResponse.json({ ok: true, data: memoryCache });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    memoryCache = body;

    const token = process.env.GITHUB_CMS_TOKEN;
    if (!token) {
      return NextResponse.json({ ok: true, saved: "memory" });
    }

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

    // Check existing SHA
    let sha: string | undefined;
    const getRes = await fetch(url, {
      headers: getHeaders(),
      cache: "no-store",
    });
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing?.sha;
    }

    const encodedContent = Buffer.from(
      JSON.stringify(body),
      "utf-8"
    ).toString("base64");

    const putRes = await fetch(url, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        message: `CMS update ${new Date().toISOString()}`,
        content: encodedContent,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      // Retry once if SHA conflict occurred
      const retryGet = await fetch(url, {
        headers: getHeaders(),
        cache: "no-store",
      });
      if (retryGet.ok) {
        const retryExisting = await retryGet.json();
        await fetch(url, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            message: `CMS retry update ${new Date().toISOString()}`,
            content: encodedContent,
            ...(retryExisting?.sha ? { sha: retryExisting.sha } : {}),
          }),
        });
      }
    }

    return NextResponse.json({ ok: true, saved: "cloud" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
