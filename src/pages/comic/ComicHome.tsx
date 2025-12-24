import { useQuery } from '@tanstack/react-query';
import { comicApi } from '@/lib/comicApi';
import { ComicCard } from '@/components/ComicCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ComicHome = () => {
  const { data: latestData, isLoading: latestLoading } = useQuery({
    queryKey: ['comic-latest'],
    queryFn: comicApi.getLatest,
  });

  const { data: popularData, isLoading: popularLoading } = useQuery({
    queryKey: ['comic-popular'],
    queryFn: comicApi.getPopular,
  });

  const { data: topData, isLoading: topLoading } = useQuery({
    queryKey: ['comic-top'],
    queryFn: comicApi.getTop,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Comic
      </h1>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link to="/comic/type/manga">
          <Button variant="outline" size="sm">Manga</Button>
        </Link>
        <Link to="/comic/type/manhwa">
          <Button variant="outline" size="sm">Manhwa</Button>
        </Link>
        <Link to="/comic/type/manhua">
          <Button variant="outline" size="sm">Manhua</Button>
        </Link>
        <Link to="/comic/genres">
          <Button variant="outline" size="sm">Genres</Button>
        </Link>
      </div>

      {/* Latest Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>
        {latestLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {latestData?.komikList?.slice(0, 12).map((comic: any) => (
              <ComicCard key={comic.slug} {...comic} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Popular</h2>
        {popularLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popularData?.komikList?.slice(0, 12).map((comic: any) => (
              <ComicCard key={comic.slug} {...comic} />
            ))}
          </div>
        )}
      </section>

      {/* Top Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Top Rated</h2>
        {topLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {topData?.komikList?.slice(0, 12).map((comic: any) => (
              <ComicCard key={comic.slug} {...comic} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ComicHome;
