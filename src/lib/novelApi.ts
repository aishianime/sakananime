const BASE_URL = 'https://www.sankavollerei.com';

export interface NovelCard {
  novelld: number;
  novelType: number;
  title: string;
  cover: {
    url: string;
    width: number;
    height: number;
  };
  summary: string;
  score: string;
  totalViews: string;
  totalChapters: number;
  genres: string[];
  tags: string[];
}

export interface NovelGenre {
  slug: string;
  name: string;
}

export const novelApi = {
  getHome: async () => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/home`);
    return response.json();
  },

  search: async (query: string) => {
    const response = await fetch(`${BASE_URL}/novel/search?q=${query}`);
    return response.json();
  },

  getByGenre: async (keyword: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/genre/${keyword}`);
    return response.json();
  },

  getChapters: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/novel/chapters/${novelld}`);
    return response.json();
  },
  
};
getDetail: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/detail/${slug}`);
    return response.json();
  },
};
