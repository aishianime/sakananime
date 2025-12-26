import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Ongoing from "./pages/Ongoing";
import Completed from "./pages/Completed";
import Search from "./pages/Search";
import Genres from "./pages/Genres";
import GenreDetail from "./pages/GenreDetail";
import ByYear from "./pages/ByYear";
import Detail from "./pages/Detail";
import Episode from "./pages/Episode";
import NotFound from "./pages/NotFound";

// Anime pages
import AnimeHome from "./pages/anime/AnimeHome";
import AnimeOngoing from "./pages/anime/AnimeOngoing";
import AnimeCompleted from "./pages/anime/AnimeCompleted";
import AnimeSchedule from "./pages/anime/AnimeSchedule";
import AnimeDetail from "./pages/anime/AnimeDetail";
import AnimeEpisode from "./pages/anime/AnimeEpisode";
import AnimeSearch from "./pages/anime/AnimeSearch";
import Animegenres from "./pages/anime/animegenres

// Comic pages
import ComicHome from "./pages/comic/ComicHome";
import ComicGenres from "./pages/comic/ComicGenres";
import ComicByGenre from "./pages/comic/ComicByGenre";
import ComicByType from "./pages/comic/ComicByType";
import ComicSearch from "./pages/comic/ComicSearch";

// News pages
import NewsHome from "./pages/news/NewsHome";
import NewsRubrik from "./pages/news/NewsRubrik";
import NewsDetail from "./pages/news/NewsDetail";
import NewsSearch from "./pages/news/NewsSearch";

// Novel pages
import NovelHome from "./pages/novel/NovelHome";
import NovelGenre from "./pages/novel/NovelGenre";
import NovelSearch from "./pages/novel/NovelSearch";
import NovelDetail from "./pages/novel/NovelDetail";
import NovelChapter from "./pages/novel/NovelChapter";
import NovelGenres from "./pages/novel/NovelGenres";
import NovelPopular from "./pages/novel/NovelPopular";
import NovelLatest from "./pages/novel/NovelLatest";

// Comic detail pages
import ComicDetail from "./pages/comic/ComicDetail";
import ComicChapter from "./pages/comic/ComicChapter";

const queryClient = new QueryClient();

const App = () => {
  // Auto dark mode based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial theme
    if (mediaQuery.matches) {
      document.documentElement.classList.add('dark');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ongoing" element={<Ongoing />} />
                <Route path="/completed" element={<Completed />} />
                <Route path="/search/:keyword" element={<Search />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/genre/:slug" element={<GenreDetail />} />
                <Route path="/by-year" element={<ByYear />} />
                <Route path="/detail/:slug" element={<Detail />} />
                <Route path="/episode/:slug" element={<Episode />} />
                
                {/* Anime Routes */}
                <Route path="/anime" element={<AnimeHome />} />
                <Route path="/anime/ongoing" element={<AnimeOngoing />} />
                <Route path="/anime/completed" element={<AnimeCompleted />} />
                <Route path="/anime/schedule" element={<AnimeSchedule />} />
                <Route path="/anime/genre:slug" element={<Animegenres />} />
                <Route path="/anime/detail/:slug" element={<AnimeDetail />} />
                <Route path="/anime/episode/:slug" element={<AnimeEpisode />} />
                <Route path="/anime/search/:keyword" element={<AnimeSearch />} />

                {/* Comic Routes */}
                <Route path="/comic" element={<ComicHome />} />
                <Route path="/comic/genres" element={<ComicGenres />} />
                <Route path="/comic/genre/:slug" element={<ComicByGenre />} />
                <Route path="/comic/type/:type" element={<ComicByType />} />
                <Route path="/comic/search/:query" element={<ComicSearch />} />

                {/* News Routes */}
                <Route path="/news" element={<NewsHome />} />
                <Route path="/news/rubrik/:rubrik" element={<NewsRubrik />} />
                <Route path="/news/detail/:id/:slug" element={<NewsDetail />} />
                <Route path="/news/search/:query" element={<NewsSearch />} />

                {/* Novel Routes */}
                <Route path="/novel" element={<NovelHome />} />
                <Route path="/novel/genre/:genreId" element={<NovelGenre />} />
                <Route path="/novel/search/:keyword" element={<NovelSearch />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
