import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { newsApi } from '@/lib/newsApi';
import { NewsCard } from '@/components/NewsCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const NewsSearch = () => {
  const { query } = useParams<{ query: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['news-search', query],
    queryFn: () => newsApi.search(query!),
    enabled: !!query,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Search: "{query}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((article: any) => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>

      {(!data?.data || data.data.length === 0) && (
        <p className="text-center text-muted-foreground">No articles found.</p>
      )}
    </div>
  );
};

export default NewsSearch;
