import { useEffect, useState } from 'react';
import { Tv } from 'lucide-react';
import { animeApi, AnimeCard as AnimeCardType } from '@/lib/animeApi';
import { AnimeCard } from '@/components/AnimeCard';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';

export default function AnimeOngoing() {
  const [animeList, setAnimeList] = useState<AnimeCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await animeApi.getOngoing(page);
        const newList = data.data?.animeList || [];
        
        if (page === 1) {
          setAnimeList(newList);
        } else {
          setAnimeList(prev => [...prev, ...newList]);
        }
        
        setHasMore(newList.length >= 20);
      } catch (error) {
        console.error('Error fetching ongoing anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10">
            <Tv className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Ongoing Anime</h1>
            <p className="text-muted-foreground">Anime yang sedang tayang</p>
          </div>
        </div>

        {loading && page === 1 ? (
          <LoadingGrid count={20} />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {animeList.map((anime, index) => (
                <AnimeCard key={index} anime={anime} showReleaseDay />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={() => setPage(p => p + 1)} 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
