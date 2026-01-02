import { API_CONFIG, buildApiUrl } from './config';

export interface TvShowItem {
  id: string;
  title: string;
  slug: string;
  poster: string;
  type?: string;
  status?: string;
  rating?: string;
  year?: string;
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
  success: boolean;
  data: {
    animeList?: TvShowItem[];
    list?: TvShowItem[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

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

export const tvshowApi = {
  getTvShows: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/tvshow?page=${page}`));
    return response.json();
  },

  getOthers: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/others?page=${page}`));
    return response.json();
  },

  getSeries: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/series?page=${page}`));
    return response.json();
  },

  getFilms: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/film?page=${page}`));
    return response.json();
  },

  getFilmDetail: async (id: string): Promise<TvShowDetailResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/film/${id}`));
    return response.json();
  },

  getSeriesDetail: async (id: string): Promise<TvShowDetailResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/series/${id}`));
    return response.json();
  },

  getEpisode: async (id: string): Promise<TvShowEpisodeResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/episode/${id}`));
    return response.json();
  },

  search: async (keyword: string, page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/search?q=${encodeURIComponent(keyword)}&page=${page}`));
    return response.json();
  },

  getGenres: async (): Promise<TvShowGenresResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/genres`));
    return response.json();
  },

  getByGenre: async (slug: string, page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/genre/${slug}?page=${page}`));
    return response.json();
  },

  getAllReverse: async (page: number = 1): Promise<TvShowListResponse> => {
    const response = await fetch(buildApiUrl(`/anime/winbu/all-anime-reverse?page=${page}`));
    return response.json();
  },
};
