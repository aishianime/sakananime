const BASE_URL = 'https://www.sankavollerei.com';

export interface TvShowItem {
  id: string;
  title: string;
  slug?: string;
  poster?: string;
  image?: string;
  type?: string;
  status?: string;
  rating?: string;
  year?: string;
  episode?: string;
  time?: string;
}

export interface TvShowDetailData {
  id: string;
  title: string;
  alternativeTitle?: string;
  poster: string;
  synopsis?: string;
  status?: string;
  type?: string;
  year?: string;
  rating?: string;
  genres?: { name: string; slug: string }[];
  episodes?: { id: string; title: string; slug: string }[];
}

export interface TvShowEpisodeData {
  id: string;
  title: string;
  streamUrl?: string;
  servers?: { id: string; name: string; url: string }[];
  prevEpisode?: { id: string; title: string };
  nextEpisode?: { id: string; title: string };
}

export interface TvShowGenre {
  name: string;
  slug: string;
}

export interface TvShowListResponse {
  status?: string;
  success?: boolean;
  data: TvShowItem[] | {
    animeList?: TvShowItem[];
    list?: TvShowItem[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Helper to extract shows from response (handles both array and object formats)
export const extractShows = (response?: TvShowListResponse): TvShowItem[] => {
  if (!response?.data) return [];
  if (Array.isArray(response.data)) return response.data;
  return response.data.animeList || response.data.list || [];
};

// Helper to extract pagination from response
export const extractPagination = (response?: TvShowListResponse) => {
  if (!response) return undefined;
  if (response.pagination) return response.pagination;
  if (!Array.isArray(response.data) && response.data?.pagination) {
    return response.data.pagination;
  }
  return undefined;
};

export interface TvShowDetailResponse {
  success: boolean;
  data: TvShowDetailData;
}

export interface TvShowEpisodeResponse {
  success: boolean;
  data: TvShowEpisodeData;
}

export interface TvShowGenresResponse {
  success: boolean;
  data: {
    genres: TvShowGenre[];
  };
}

export interface TvShowHomeData {
  spotlight?: TvShowItem[];
  recent?: TvShowItem[];
  popular?: TvShowItem[];
  trending?: TvShowItem[];
}

export interface TvShowHomeResponse {
  success: boolean;
  data: TvShowHomeData;
}

export interface TvShowScheduleItem {
  id: string;
  title: string;
  slug: string;
  poster: string;
  time?: string;
  episode?: string;
}

export interface TvShowScheduleResponse {
  success: boolean;
  data: {
    schedule?: TvShowScheduleItem[];
    list?: TvShowScheduleItem[];
  };
}

export const tvshowApi = {
  getTvShows: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/tvshow?page=${page}`);
    return response.json();
  },

  getOthers: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/others?page=${page}`);
    return response.json();
  },

  getSeries: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/series?page=${page}`);
    return response.json();
  },

  getFilms: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/film?page=${page}`);
    return response.json();
  },

  getFilmDetail: async (id: string): Promise<TvShowDetailResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/film/${id}`);
    return response.json();
  },

  getSeriesDetail: async (id: string): Promise<TvShowDetailResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/series/${id}`);
    return response.json();
  },

  getEpisode: async (id: string): Promise<TvShowEpisodeResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/episode/${id}`);
    return response.json();
  },

  search: async (keyword: string, page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/search?q=${encodeURIComponent(keyword)}&page=${page}`);
    return response.json();
  },

  getGenres: async (): Promise<TvShowGenresResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/genres`);
    return response.json();
  },

  getByGenre: async (slug: string, page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/genre/${slug}?page=${page}`);
    return response.json();
  },

  getAllReverse: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/all-anime-reverse?page=${page}`);
    return response.json();
  },

  getHome: async (): Promise<TvShowHomeResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/home`);
    return response.json();
  },

  getSchedule: async (day: string): Promise<TvShowScheduleResponse> => {
    const response = await fetch(`${BASE_URL}/anime/winbu/schedule?day=${day}`);
    return response.json();
  },

  getList: async (order?: string, status?: string, type?: string): Promise<TvShowListResponse> => {
    const params = new URLSearchParams();
    if (order) params.append('order', order);
    if (status) params.append('status', status);
    if (type) params.append('type', type);
    const queryString = params.toString();
    const response = await fetch(`${BASE_URL}/anime/winbu/list${queryString ? `?${queryString}` : ''}`);
    return response.json();
  },
};
