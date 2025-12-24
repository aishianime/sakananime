import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/lib/newsApi';
import { NewsCard } from '@/components/NewsCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NewsHome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['news-latest'],
    queryFn: newsApi.getLatest,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Berita
      </h1>

      {/* Rubrik Links */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link to="/news/rubrik/anime">
          <Button variant="outline" size="sm">Anime</Button>
        </Link>
        <Link to="/news/rubrik/vtuber">
          <Button variant="outline" size="sm">VTuber</Button>
        </Link>
        <Link to="/news/rubrik/jepang">
          <Button variant="outline" size="sm">Jepang</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((article: any) => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default NewsHome;
