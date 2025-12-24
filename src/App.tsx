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
                <Route path="/anime/detail/:slug" element={<AnimeDetail />} />
                <Route path="/anime/episode/:slug" element={<AnimeEpisode />} />
                <Route path="/anime/search/:keyword" element={<AnimeSearch />} />
                
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
