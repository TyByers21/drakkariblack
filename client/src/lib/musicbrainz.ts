// MusicBrainz API service for fetching album artwork
// API Documentation: https://musicbrainz.org/doc/MusicBrainz_API

const MUSICBRAINZ_BASE_URL = 'https://musicbrainz.org/ws/2';
const COVERART_BASE_URL = 'https://coverartarchive.org';

// Rate limiting: MusicBrainz allows 1 request per second
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000; // 1 second

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest));
  }
  
  lastRequestTime = Date.now();
  
  return fetch(url, {
    headers: {
      'User-Agent': 'DrakkariBlackWebsite/1.0 (contact@drakkariblack.com)',
      'Accept': 'application/json'
    }
  });
}

interface MusicBrainzRecording {
  id: string;
  title: string;
  'artist-credit': Array<{
    name: string;
    artist: {
      id: string;
      name: string;
    };
  }>;
  releases?: Array<{
    id: string;
    title: string;
    'cover-art-archive': {
      artwork: boolean;
      count: number;
      front: boolean;
      back: boolean;
    };
  }>;
}

interface MusicBrainzSearchResponse {
  recordings: MusicBrainzRecording[];
  count: number;
}

interface CoverArtResponse {
  images: Array<{
    id: string;
    image: string;
    thumbnails: {
      large: string;
      small: string;
      '250': string;
      '500': string;
      '1200': string;
    };
    front: boolean;
    back: boolean;
    types: string[];
    edit: number;
    approved: boolean;
    comment: string;
  }>;
  release: string;
}

export interface SongWithArtwork {
  artist: string;
  title: string;
  album: string;
  spotifyId?: string;
  image?: string;
  musicbrainzImage?: string;
  musicbrainzReleaseId?: string;
}

/**
 * Search for a recording by artist and title
 */
async function searchRecording(artist: string, title: string): Promise<MusicBrainzRecording | null> {
  try {
    // Try multiple search strategies for better results
    const searchStrategies = [
      // Strategy 1: Search for main album releases (exclude compilations, singles)
      `artist:"${artist}" AND recording:"${title}" AND primarytype:album`,
      // Strategy 2: Exact quoted search
      `artist:"${artist}" AND recording:"${title}"`,
      // Strategy 3: Fuzzy search without quotes
      `artist:${artist} AND recording:${title}`,
      // Strategy 4: Broader search with partial matches
      `${artist} ${title}`
    ];

    for (let index = 0; index < searchStrategies.length; index++) {
      const query = searchStrategies[index];
      console.log(`Searching MusicBrainz for: ${artist} - ${title} (strategy ${index + 1})`);
      
      const searchUrl = `${MUSICBRAINZ_BASE_URL}/recording?query=${encodeURIComponent(query)}&fmt=json&inc=releases+artist-credits&limit=5`;
      
      const response = await rateLimitedFetch(searchUrl);
      
      if (!response.ok) {
        console.warn(`MusicBrainz search failed for ${artist} - ${title}: ${response.status}`);
        continue;
      }
      
      const data: MusicBrainzSearchResponse = await response.json();
      
      if (data.recordings && data.recordings.length > 0) {
        console.log(`Found ${data.recordings.length} recordings with strategy ${index + 1}`);
        
        // Find the best match - prefer exact artist name match
        let bestMatch = data.recordings.find(recording => 
          recording['artist-credit']?.some(credit => 
            credit.artist.name.toLowerCase() === artist.toLowerCase()
          )
        );
        
        // If no exact match, look for partial matches
        if (!bestMatch) {
          bestMatch = data.recordings.find(recording => 
            recording['artist-credit']?.some(credit => 
              credit.artist.name.toLowerCase().includes(artist.toLowerCase()) ||
              artist.toLowerCase().includes(credit.artist.name.toLowerCase())
            )
          );
        }
        
        // If still no match, use the first result
        if (!bestMatch && data.recordings.length > 0) {
          bestMatch = data.recordings[0];
        }
        
        if (bestMatch) {
          console.log(`Selected recording: ${bestMatch.title} by ${bestMatch['artist-credit']?.[0]?.artist?.name}`);
          return bestMatch;
        }
      }
    }
    
    console.log(`No recordings found for ${artist} - ${title} after trying all strategies`);
    return null;
  } catch (error) {
    console.error(`Error searching MusicBrainz for ${artist} - ${title}:`, error);
    return null;
  }
}

/**
 * Get cover art for a MusicBrainz release
 */
async function getCoverArt(releaseId: string): Promise<string | null> {
  try {
    const coverArtUrl = `${COVERART_BASE_URL}/release/${releaseId}`;
    
    const response = await rateLimitedFetch(coverArtUrl);
    
    if (!response.ok) {
      console.warn(`Cover art not found for release ${releaseId}: ${response.status}`);
      return null;
    }
    
    const data: CoverArtResponse = await response.json();
    
    if (data.images && data.images.length > 0) {
      // Prefer front cover, or first image if no front cover specified
      const frontCover = data.images.find(img => img.front) || data.images[0];
      
      // Return medium-sized thumbnail (500px) for better performance
      return frontCover.thumbnails['500'] || frontCover.thumbnails.large || frontCover.image;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching cover art for release ${releaseId}:`, error);
    return null;
  }
}

/**
 * Get album artwork for a song using MusicBrainz API
 */
export async function getMusicBrainzArtwork(artist: string, title: string): Promise<string | null> {
  try {
    // Search for the recording
    const recording = await searchRecording(artist, title);
    
    if (!recording) {
      console.log(`No recording found for ${artist} - ${title}`);
      return null;
    }
    
    if (!recording.releases || recording.releases.length === 0) {
      console.log(`No releases found for recording: ${recording.title}`);
      return null;
    }
    
    console.log(`Found ${recording.releases.length} releases for ${recording.title}`);
    
    // Try each release to find one with cover art
    // Since the search API doesn't include cover-art-archive details, we'll try to fetch cover art directly
    for (const release of recording.releases) {
      console.log(`Checking release: ${release.title} (${release.id})`);
      
      try {
        // Directly try to get cover art - the Cover Art Archive will return 404 if no art exists
        const artwork = await getCoverArt(release.id);
        
        if (artwork) {
          console.log(`Successfully found cover art for ${artist} - ${title}: ${release.title}`);
          return artwork;
        } else {
          console.log(`No cover art found for release ${release.title}`);
        }
      } catch (error) {
        console.log(`Error fetching cover art for release ${release.title}:`, error);
        continue;
      }
    }
    
    console.log(`No cover art available for any release of ${artist} - ${title}`);
    return null;
  } catch (error) {
    console.error(`Error getting MusicBrainz artwork for ${artist} - ${title}:`, error);
    return null;
  }
}

/**
 * Enhance setlist songs with MusicBrainz artwork
 * Falls back to existing images if MusicBrainz fails
 */
export async function enhanceSetlistWithArtwork(songs: SongWithArtwork[]): Promise<SongWithArtwork[]> {
  const enhancedSongs: SongWithArtwork[] = [];
  
  console.log('Enhancing setlist with MusicBrainz artwork...');
  
  for (const song of songs) {
    try {
      // Try to get MusicBrainz artwork
      const musicbrainzImage = await getMusicBrainzArtwork(song.artist, song.title);
      
      enhancedSongs.push({
        ...song,
        musicbrainzImage: musicbrainzImage || undefined,
        // Use MusicBrainz image if available, otherwise fall back to existing image
        image: musicbrainzImage || song.image
      });
    } catch (error) {
      console.error(`Failed to enhance ${song.artist} - ${song.title}:`, error);
      // Keep original song data if enhancement fails
      enhancedSongs.push(song);
    }
  }
  
  console.log(`Enhanced ${enhancedSongs.filter(s => s.musicbrainzImage).length}/${songs.length} songs with MusicBrainz artwork`);
  
  return enhancedSongs;
}