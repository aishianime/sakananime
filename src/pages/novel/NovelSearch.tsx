import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { novelApi } from '@/lib/novelApi';
import { NovelCard } from '@/components/NovelCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';

const NovelSearch = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['novel-search', keyword],
    queryFn: () => novelApi.search(keyword!),
    enabled: !!keyword,
  });

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          title="Search Failed"
          message="We couldn't complete your search. Please try again."
          onRetry={refetch}
          isRetrying={isFetching}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Search: "{keyword}"
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.result?.items?.map((novel: any) => (
          <NovelCard key={novel.novelId} {...novel} />
        ))}
      </div>

      {(!data?.result?.items || data.result.items.length === 0) && (
        <p className="text-center text-muted-foreground">No novels found.</p>
      )}
    </div>
  );
};

export default NovelSearch;
