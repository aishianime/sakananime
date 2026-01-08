import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { novelApi } from '@/lib/novelApi';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

const NovelGenres = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['novel-genres'],
    queryFn: novelApi.getGenres,
  });

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Unable to Load Genres"
          message="We couldn't fetch the novel genres. Please try again."
          onRetry={refetch}
          isRetrying={isFetching}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
        Novel Genres
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data?.data?.map((genre: { name: string; slug: string; count: string }) => (
          <Link key={genre.slug} to={`/novel/genre/${genre.slug}`}>
            <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full min-h-[100px]">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{genre.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {genre.count?.trim()} novels
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NovelGenres;
