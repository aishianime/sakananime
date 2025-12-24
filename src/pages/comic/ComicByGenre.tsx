import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { comicApi } from '@/lib/comicApi';
import { ComicCard } from '@/components/ComicCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const ComicByGenre = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['comic-genre', slug],
    queryFn: () => comicApi.getByGenre(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent capitalize">
        {slug?.replace(/-/g, ' ')}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data?.komikList?.map((comic: any) => (
          <ComicCard key={comic.slug} {...comic} />
        ))}
      </div>
    </div>
  );
};

export default ComicByGenre;
