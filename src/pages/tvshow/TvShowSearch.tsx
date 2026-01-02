import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tvshowApi } from '@/lib/tvshowApi';
import TvShowCard from '@/components/TvShowCard';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const TvShowSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const [searchInput, setSearchInput] = useState(keyword);

  const { data, isLoading } = useQuery({
    queryKey: ['tvshow-search', keyword, page],
    queryFn: () => tvshowApi.search(keyword, page),
    enabled: !!keyword,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim(), page: '1' });
    }
  };

  const setPage = (newPage: number) => {
    setSearchParams({ q: keyword, page: newPage.toString() });
  };

  const shows = data?.data?.animeList || data?.data?.list || [];
  const pagination = data?.data?.pagination;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <Search className="w-8 h-8 text-primary" />
          Search TV Shows
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-xl">
          <Input
            type="text"
            placeholder="Search TV shows..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </form>

        {isLoading ? (
          <LoadingGrid />
        ) : shows.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-4">
              Found {shows.length} results for "{keyword}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {shows.map((show, index) => (
                <TvShowCard key={show.id || index} show={show} />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="flex items-center px-4 py-2 bg-muted rounded-lg">
                Page {page}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={!pagination?.hasNextPage}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        ) : keyword ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No results found for "{keyword}"</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Enter a keyword to search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowSearch;
