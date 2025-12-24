import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { novelApi } from '@/lib/novelApi';
import { NovelCard } from '@/components/NovelCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NovelGenre = () => {
  const { genreId } = useParams<{ genreId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['novel-genre', genreId],
    queryFn: () => novelApi.getByGenre(genreId!),
    enabled: !!genreId,
  });

  if (isLoading) return <LoadingSkeleton />;

  const currentGenre = data?.result?.genres?.find((g: any) => g.genreId === genreId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        {currentGenre?.name || 'Genre'}
      </h1>

      {/* Genre Links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {data?.result?.genres?.slice(0, 10).map((genre: any) => (
          <Link key={genre.genreId} to={`/novel/genre/${genre.genreId}`}>
            <Button
              variant={genre.genreId === genreId ? "default" : "outline"}
              size="sm"
            >
              {genre.name}
            </Button>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.result?.items?.map((novel: any) => (
          <NovelCard key={novel.novelId} {...novel} />
        ))}
      </div>
    </div>
  );
};

export default NovelGenre;
