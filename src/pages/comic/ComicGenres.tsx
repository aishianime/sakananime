import { useQuery } from '@tanstack/react-query';
import { comicApi } from '@/lib/comicApi';
import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const ComicGenres = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['comic-genres'],
    queryFn: comicApi.getGenres,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Comic Genres
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.genres?.map((genre: any) => (
          <Link
            key={genre.slug}
            to={`/comic/genre/${genre.slug}`}
            className="p-4 rounded-lg bg-card hover:bg-accent transition-colors text-center font-medium"
          >
            {genre.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComicGenres;
