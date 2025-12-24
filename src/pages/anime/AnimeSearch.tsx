import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { animeApi, AnimeCard as AnimeCardType } from '@/lib/animeApi';
import { AnimeCard } from '@/components/AnimeCard';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';

export default function AnimeSearch() {
  const { keyword } = useParams<{ keyword: string }>();
  const [results, setResults] = useState<AnimeCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!keyword) return;

      try {
        setLoading(true);
        const data = await animeApi.search(keyword);
        setResults(data.data?.animeList || []);
      } catch (error) {
        console.error('Error searching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="text-muted-foreground">Results for "{keyword}"</p>
          </div>
        </div>

        {loading ? (
          <LoadingGrid count={12} />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((anime, index) => (
              <AnimeCard key={index} anime={anime} showScore />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No anime found for "{keyword}"</p>
            <Link to="/anime">
              <Button>Back to Anime Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
