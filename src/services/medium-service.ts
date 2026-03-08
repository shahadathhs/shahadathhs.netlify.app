export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  categories: string[];
}

const CACHE_DURATION = 3600 * 1000; // 1 hour

const getCache = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

const setCache = (key: string, data: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

export const fetchMediumPosts = async (
  username: string = 'shahadathhs',
): Promise<MediumPost[]> => {
  const cacheKey = `medium_posts_${username}`;
  const cachedData = getCache<MediumPost[]>(cacheKey);
  if (cachedData) return cachedData;

  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch from rss2json: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(`rss2json error: ${data.message}`);
    }

    // Map to MediumPost interface
    const posts: MediumPost[] = data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      author: item.author,
      content: item.content,
      contentSnippet: item.description
        .replace(/<[^>]*>?/gm, '')
        .substring(0, 200),
      categories: item.categories,
    }));

    setCache(cacheKey, posts);
    return posts;
  } catch (error: any) {
    console.error('Error fetching Medium posts:', error.message || error);
    return [];
  }
};
