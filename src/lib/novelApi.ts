const BASE_URL = '';

export interface NovelCard {
  title: string;
  slug: string;
  image: string;
  rating?: string;
  latestChapter?: string;
  latestChapterSlug?: string;
}

export interface NovelGenre {
  name: string;
  slug: string;
  count?: string;
}

export interface NovelDetail {
  title: string;
  image: string;
  rating: string;
  status: string;
  author: string;
  artist: string;
  release: string;
  type: string;
  synopsis: string;
  genres: { name: string; slug: string }[];
  chapters: { title: string; slug: string; date?: string }[];
}

export const novelApi = {
  // MeioNovel endpoints
  getHome: async () => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/home`);
    return response.json();
  },

  getPopular: async () => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/popular`);
    return response.json();
  },

  getLatest: async () => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/latest`);
    return response.json();
  },

  getList: async (page: number = 1, orderby: string = 'latest') => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/list?page=${page}&orderby=${orderby}`);
    return response.json();
  },

  getGenres: async () => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/genres`);
    return response.json();
  },

  getByGenre: async (slug: string, page: number = 1) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/genre/${slug}/${page}`);
    return response.json();
  },

  getDetail: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/detail/${slug}`);
    return response.json();
  },

  getChapter: async (novelSlug: string, chapterSlug: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/chapter/${novelSlug}/${chapterSlug}`);
    return response.json();
  },

  // Alternative chapter endpoint using single slug
  getChapterBySlug: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/chapter/${slug}`);
    return response.json();
  },

  search: async (query: string, page: number = 1) => {
    if (page === 1) {
      const response = await fetch(`${BASE_URL}/novel/meionovel/search/${encodeURIComponent(query)}`);
      return response.json();
    }
    const response = await fetch(`${BASE_URL}/novel/meionovel/search/${encodeURIComponent(query)}/${page}`);
    return response.json();
  },
};
