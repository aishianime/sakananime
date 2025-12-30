import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { animeApi } from '@/lib/animeApi';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const AnimeGenreList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['anime-genre-list'],
    queryFn: () => animeApi.getGenres(),
  });

  if (isLoading) return <LoadingSkeleton />;

  const genres = data?.data || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">🎭 Anime Genres</h1>

        <div className="flex flex-wrap gap-3">
          {genres.map((genre, index) => (
            <Link key={index} to={`/anime/genre/${genre.slug}`}>
              <Button
                variant="outline"
                className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
              >
                {genre.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeGenreList;
