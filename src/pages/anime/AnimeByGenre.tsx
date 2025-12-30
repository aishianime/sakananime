import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { animeApi } from '@/lib/animeApi';
import { AnimeCard } from '@/components/AnimeCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AnimeByGenre = () => {
  const { genre } = useParams<{ genre: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['anime-by-genre', genre],
    queryFn: () => animeApi.getByGenre(genre!),
    enabled: !!genre,
  });

  if (isLoading) return <LoadingSkeleton />;

  const animeList = data?.data?.animeList || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/anime/genres">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {genre?.replace(/-/g, ' ')} Anime
          </h1>
        </div>

        {animeList.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No anime found in this genre</p>
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

export default AnimeByGenre;
