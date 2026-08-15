/**
 * Album artwork lookup.
 *
 * The setlist is a static constant, so artwork is resolved at build time by
 * scripts/fetch-spotify-artwork.mjs and committed as spotify-artwork.json.
 * Nothing here touches the network: no access token is needed in the browser,
 * which is what allows the site to be deployed as pure static files.
 *
 * To refresh artwork after editing SPEAKEASY_SETLIST:
 *   npm run build:artwork
 */
import artworkData from "./spotify-artwork.json";

const artwork: Record<string, string> = artworkData;

export interface SongWithSpotifyArt {
  artist: string;
  title: string;
  album: string;
  genre?: string;
  spotifyId?: string;
  image?: string;
  spotifyImage?: string;
  spotifyAlbumId?: string;
}

/** Must match artworkKey() in scripts/fetch-spotify-artwork.mjs. */
function artworkKey(artist: string, title: string): string {
  return `${artist}|||${title}`.toLowerCase();
}

/**
 * Look up prefetched album artwork for a song.
 * Returns null when the build-time search found no match.
 */
export async function getSpotifyArtwork(
  artist: string,
  title: string,
): Promise<string | null> {
  return artwork[artworkKey(artist, title)] ?? null;
}

/**
 * Attach album artwork to setlist songs.
 *
 * Songs carrying a hand-picked local image keep it — the same precedence the
 * previous runtime implementation used.
 */
export async function enhanceSetlistWithSpotifyArt(
  songs: SongWithSpotifyArt[],
): Promise<SongWithSpotifyArt[]> {
  return songs.map((song) => {
    const hasLocalCustomImage =
      !!song.image &&
      !song.image.includes("390c6afbbe4b4e38c11eb8da") && // not placeholder
      !song.image.includes("i.scdn.co"); // not an existing Spotify image

    return {
      ...song,
      spotifyImage: hasLocalCustomImage
        ? undefined
        : (artwork[artworkKey(song.artist, song.title)] ?? undefined),
    };
  });
}
