import { useQuery } from '@tanstack/react-query';
import { novelApi } from '@/lib/novelApi';
import { NovelCard } from '@/components/NovelCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Clock } from 'lucide-react';

const NovelLatest = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['novel-latest'],
    queryFn: novelApi.getLatest,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent flex items-center gap-3">
        <Clock className="h-8 w-8" />
        Latest Novels
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.data?.map((novel: any) => (
          <NovelCard key={novel.slug} {...novel} />
        ))}
      </div>

      {(!data?.data || data.data.length === 0) && (
        <p className="text-center text-muted-foreground">No novels found.</p>
      )}
    </div>
  );
};

export default NovelLatest;
