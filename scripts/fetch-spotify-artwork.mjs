#!/usr/bin/env node
/**
 * Build-time Spotify artwork prefetch.
 *
 * SPEAKEASY_SETLIST is a static constant, so album art cannot change between
 * deploys. Resolving it here instead of at runtime means the browser never
 * needs a token endpoint -- which is what lets the site ship as pure static
 * files with no API credentials exposed.
 *
 *   node scripts/fetch-spotify-artwork.mjs
 *
 * Requires SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET (read from .env).
 * Output: client/src/lib/spotify-artwork.json
 */
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_FILE = path.join(root, "client/src/lib/spotify-artwork.json");

/** constants.ts imports images (@/images/*.jpg). Stub them so Node can load it. */
const stubAssets = {
  name: "stub-assets",
  setup(build) {
    build.onResolve({ filter: /\.(png|jpe?g|gif|svg|webp|avif)$/ }, (args) => ({
      path: args.path,
      namespace: "stub-assets",
    }));
    build.onLoad({ filter: /.*/, namespace: "stub-assets" }, () => ({
      contents: "export default ''",
      loader: "js",
    }));
  },
};

async function loadSetlist() {
  const result = await esbuild.build({
    entryPoints: [path.join(root, "client/src/lib/constants.ts")],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    plugins: [stubAssets],
    alias: { "@": path.join(root, "client/src") },
  });
  const code = result.outputFiles[0].text;
  const dataUrl =
    "data:text/javascript;base64," + Buffer.from(code).toString("base64");
  const mod = await import(dataUrl);
  return mod.SPEAKEASY_SETLIST;
}

async function getToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error(
      "Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET. Add them to .env.",
    );
  }
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`Spotify token request failed: ${res.status}`);
  return (await res.json()).access_token;
}

/** Mirrors getBestSpotifyImage() in client/src/lib/spotify.ts. */
function bestImage(images) {
  if (!images?.length) return null;
  const preferred = images.find((i) => i.width >= 300 && i.width <= 640);
  if (preferred) return preferred.url;
  return [...images].sort((a, b) => b.width - a.width)[0].url;
}

/** Mirrors searchSpotifyTrack() match precedence in client/src/lib/spotify.ts. */
function pickTrack(items, artist) {
  const lower = artist.toLowerCase();
  return (
    items.find((t) =>
      t.artists.some((a) => a.name.toLowerCase() === lower),
    ) ??
    items.find((t) =>
      t.artists.some(
        (a) =>
          a.name.toLowerCase().includes(lower) ||
          lower.includes(a.name.toLowerCase()),
      ),
    ) ??
    items[0] ??
    null
  );
}

async function searchArtwork(token, artist, title) {
  const cleanArtist = artist.replace(/[^\w\s]/g, "").trim();
  const cleanTitle = title.replace(/[^\w\s]/g, "").trim();
  const query = `track:"${cleanTitle}" artist:"${cleanArtist}"`;
  const url =
    "https://api.spotify.com/v1/search?q=" +
    encodeURIComponent(query) +
    "&type=track&limit=10";

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 429) {
    const wait = Number(res.headers.get("retry-after") ?? 2);
    console.log(`  rate limited, waiting ${wait}s...`);
    await new Promise((r) => setTimeout(r, (wait + 1) * 1000));
    return searchArtwork(token, artist, title);
  }
  if (!res.ok) return null;

  const data = await res.json();
  const track = pickTrack(data.tracks?.items ?? [], artist);
  return track ? bestImage(track.album?.images) : null;
}

export const artworkKey = (artist, title) =>
  `${artist}|||${title}`.toLowerCase();

async function main() {
  const setlist = await loadSetlist();
  if (!Array.isArray(setlist) || setlist.length === 0) {
    throw new Error("SPEAKEASY_SETLIST is empty or failed to load");
  }
  console.log(`Loaded ${setlist.length} songs from constants.ts`);

  const token = await getToken();
  console.log("Spotify token acquired\n");

  const artwork = {};
  let found = 0;

  for (const [i, song] of setlist.entries()) {
    const label = `${song.artist} - ${song.title}`;
    try {
      const url = await searchArtwork(token, song.artist, song.title);
      if (url) {
        artwork[artworkKey(song.artist, song.title)] = url;
        found++;
        console.log(`  [${i + 1}/${setlist.length}] OK   ${label}`);
      } else {
        console.log(`  [${i + 1}/${setlist.length}] MISS ${label}`);
      }
    } catch (err) {
      console.log(`  [${i + 1}/${setlist.length}] ERR  ${label}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 100)); // be polite to the API
  }

  await fs.writeFile(OUT_FILE, JSON.stringify(artwork, null, 2) + "\n", "utf8");
  console.log(
    `\nWrote ${found}/${setlist.length} artwork URLs to ${path.relative(root, OUT_FILE)}`,
  );
}

main().catch((err) => {
  console.error(`\nFailed: ${err.message}`);
  process.exit(1);
});
