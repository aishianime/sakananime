import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { tvshowApi } from '@/lib/tvshowApi';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { Card, CardContent } from '@/components/ui/card';
import { List, Tag } from 'lucide-react';

const TvShowGenres = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['tvshow-genres'],
    queryFn: () => tvshowApi.getGenres(),
  });

  const genres = data?.data?.genres || [];

  if (isLoading) return <LoadingGrid />;

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Unable to Load Genres"
          message="We couldn't fetch the genres. Please try again."
          onRetry={refetch}
          isRetrying={isFetching}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <List className="w-8 h-8 text-primary" />
          TV Show Genres
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Link key={genre.slug} to={`/tvshow/genre/${genre.slug}`}>
              <Card className="hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {genre.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvShowGenres;
