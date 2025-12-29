import { useQuery } from '@tanstack/react-query';
import { animeApi } from '@/lib/animeApi';
import { AnimeCard } from '@/components/AnimeCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Tv } from 'lucide-react';

const AnimeAll = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['anime-all'],
    queryFn: () => animeApi.getAllAnime(),
  });

  if (isLoading) return <LoadingSkeleton />;

  const animeList = data?.data?.animeList || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Tv className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">All Anime</h1>
        </div>

        {animeList.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No anime found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeList.map((anime, index) => (
              <AnimeCard key={index} anime={anime} showScore />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeAll;
