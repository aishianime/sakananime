const BASE_URL = 'https://www.sankavollerei.com';

export interface NovelCard {
  novelId: number;
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
  genreId: string;
  name: string;
}

export const novelApi = {
  getHome: async () => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/home`);
    return response.json();
  },

  search: async (keyword: string) => {
    const response = await fetch(`${BASE_URL}/novel/search?q=${keyword}`);
    return response.json();
  },

  getByGenre: async (genreId: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/genre/${genreId}`);
    return response.json();
  },

  getChapters: async (novelId: string) => {
    const response = await fetch(`${BASE_URL}/novel/chapters/${novelId}`);
    return response.json();
  },
  
getDetail: async (slug: string) => {
    const response = await fetch(`${BASE_URL}/novel/meionovel/detail/${slug}`);
    return response.json();
  },
};
