import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tvshowApi } from '@/lib/tvshowApi';
import TvShowCard from '@/components/TvShowCard';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

const TvShowAll = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['tvshow-all', page],
    queryFn: () => tvshowApi.getAllReverse(page),
  });

  const shows = data?.data?.animeList || data?.data?.list || [];
  const pagination = data?.data?.pagination;

  if (isLoading) return <LoadingGrid />;

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Unable to Load Shows"
          message="We couldn't fetch the TV shows. Please try again."
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
          <Shuffle className="w-8 h-8 text-primary" />
          All TV Shows
        </h1>

        {shows.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {shows.map((show, index) => (
                <TvShowCard key={show.id || index} show={show} />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(p => p - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="flex items-center px-4 py-2 bg-muted rounded-lg">
                Page {page}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => p + 1)}
                disabled={!pagination?.hasNextPage}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No shows found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowAll;
