const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

interface SpotifyAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  artists: Array<{
    id: string;
    name: string;
  }>;
}

interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: Array<{
    id: string;
    name: string;
  }>;
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
    total: number;
  };
}

export interface SongWithSpotifyArt {
  artist: string;
  title: string;
  album: string;
  spotifyId?: string;
  image?: string;
  spotifyImage?: string;
  spotifyAlbumId?: string;
}

// Cache for access token
let accessToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get Spotify access token using server-side proxy
 */
async function getSpotifyAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const response = await fetch('/api/spotify-token', {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(`Failed to get Spotify access token: ${response.status}`);
  }

  const data: SpotifyAuthToken = await response.json();
  
  // Cache the token
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety
  
  return accessToken;
}

/**
 * Search for a track on Spotify
 */
async function searchSpotifyTrack(artist: string, title: string): Promise<SpotifyTrack | null> {
  try {
    const token = await getSpotifyAccessToken();
    
    // Clean up search terms for better results
    const cleanArtist = artist.replace(/[^\w\s]/g, '').trim();
    const cleanTitle = title.replace(/[^\w\s]/g, '').trim();
    
    const query = `track:"${cleanTitle}" artist:"${cleanArtist}"`;
    const searchUrl = `${SPOTIFY_API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
    
    console.log(`Searching Spotify for: ${artist} - ${title}`);
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.warn(`Spotify search failed for ${artist} - ${title}: ${response.status}`);
      return null;
    }

    const data: SpotifySearchResponse = await response.json();
    
    if (data.tracks.items.length === 0) {
      console.log(`No Spotify tracks found for ${artist} - ${title}`);
      return null;
    }

    // Find the best match - prefer exact artist name match
    let bestMatch = data.tracks.items.find(track => 
      track.artists.some(trackArtist => 
        trackArtist.name.toLowerCase() === artist.toLowerCase()
      )
    );

    // If no exact match, look for partial matches
    if (!bestMatch) {
      bestMatch = data.tracks.items.find(track => 
        track.artists.some(trackArtist => 
          trackArtist.name.toLowerCase().includes(artist.toLowerCase()) ||
          artist.toLowerCase().includes(trackArtist.name.toLowerCase())
        )
      );
    }

    // If still no match, use the first result
    if (!bestMatch && data.tracks.items.length > 0) {
      bestMatch = data.tracks.items[0];
    }

    if (bestMatch) {
      console.log(`Found Spotify track: ${bestMatch.name} by ${bestMatch.artists[0].name} from ${bestMatch.album.name}`);
      return bestMatch;
    }

    return null;
  } catch (error) {
    console.error(`Error searching Spotify for ${artist} - ${title}:`, error);
    return null;
  }
}

/**
 * Get the best quality album artwork from Spotify images
 */
function getBestSpotifyImage(images: SpotifyImage[]): string | null {
  if (!images || images.length === 0) {
    return null;
  }

  // Prefer images around 300x300 for good quality without being too large
  const preferredImage = images.find(img => img.width >= 300 && img.width <= 640);
  
  if (preferredImage) {
    return preferredImage.url;
  }

  // Fall back to the largest image
  const sortedImages = images.sort((a, b) => b.width - a.width);
  return sortedImages[0].url;
}

/**
 * Get album artwork for a song using Spotify Web API
 */
export async function getSpotifyArtwork(artist: string, title: string): Promise<string | null> {
  try {
    const track = await searchSpotifyTrack(artist, title);
    
    if (!track || !track.album.images) {
      console.log(`No Spotify album artwork found for ${artist} - ${title}`);
      return null;
    }

    const imageUrl = getBestSpotifyImage(track.album.images);
    
    if (imageUrl) {
      console.log(`Found Spotify artwork for ${artist} - ${title}: ${track.album.name}`);
    }

    return imageUrl;
  } catch (error) {
    console.error(`Error getting Spotify artwork for ${artist} - ${title}:`, error);
    return null;
  }
}

/**
 * Enhance setlist songs with Spotify artwork
 */
export async function enhanceSetlistWithSpotifyArt(songs: SongWithSpotifyArt[]): Promise<SongWithSpotifyArt[]> {
  console.log('Enhancing setlist with Spotify artwork...');
  
  const enhancedSongs: SongWithSpotifyArt[] = [];
  let successCount = 0;

  for (const song of songs) {
    try {
      const spotifyArtwork = await getSpotifyArtwork(song.artist, song.title);
      
      const enhancedSong: SongWithSpotifyArt = {
        ...song,
        spotifyImage: spotifyArtwork || undefined
      };

      if (spotifyArtwork) {
        successCount++;
      }

      enhancedSongs.push(enhancedSong);
      
      // Add a small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to enhance ${song.artist} - ${song.title}:`, error);
      enhancedSongs.push(song);
    }
  }

  console.log(`Enhanced ${successCount}/${songs.length} songs with Spotify artwork`);
  return enhancedSongs;
}