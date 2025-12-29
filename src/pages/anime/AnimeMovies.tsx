import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { animeApi } from '@/lib/animeApi';
import { AnimeCard } from '@/components/AnimeCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';

const AnimeMovies = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['anime-movies', page],
    queryFn: () => animeApi.getMovies(page),
  });

  if (isLoading) return <LoadingSkeleton />;

  const animeList = data?.data?.animeList || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Anime Movies</h1>
        </div>

        {animeList.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No movies found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeList.map((anime, index) => (
              <AnimeCard key={index} anime={anime} showScore />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-muted-foreground">Page {page}</span>
          <Button
            variant="outline"
            onClick={() => setPage(p => p + 1)}
            disabled={animeList.length === 0}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimeMovies;
