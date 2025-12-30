import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
import { api } from '@/lib/api';
import { animeApi } from '@/lib/animeApi';
import { comicApi } from '@/lib/comicApi';
import { novelApi } from '@/lib/novelApi';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { DonghuaCard } from '@/components/DonghuaCard';
import { AnimeCard } from '@/components/AnimeCard';
import { ComicCard } from '@/components/ComicCard';
import { NovelCard } from '@/components/NovelCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Film, Tv, BookOpen, BookText, Clock, Loader2 } from 'lucide-react';

const UnifiedOngoing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animePage, setAnimePage] = useState(1);
  const [donghuaPage, setDonghuaPage] = useState(1);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [donghuaList, setDonghuaList] = useState<any[]>([]);
  const [animeHasMore, setAnimeHasMore] = useState(true);
  const [donghuaHasMore, setDonghuaHasMore] = useState(true);

  const { data: donghuaData, isLoading: donghuaLoading, isFetching: donghuaFetching } = useQuery({
    queryKey: ['donghua-ongoing', donghuaPage],
    queryFn: () => api.getOngoing(donghuaPage),
  });

  const { data: animeData, isLoading: animeLoading, isFetching: animeFetching } = useQuery({
    queryKey: ['anime-ongoing', animePage],
    queryFn: () => animeApi.getOngoing(animePage),
  });

  useEffect(() => {
    if (donghuaData) {
      const newList = donghuaData?.donghuaList || [];
      if (donghuaPage === 1) {
        setDonghuaList(newList);
      } else {
        setDonghuaList(prev => {
          const existingSlugs = new Set(prev.map(d => d.slug));
          const uniqueNew = newList.filter((d: any) => !existingSlugs.has(d.slug));
          return [...prev, ...uniqueNew];
        });
      }
      setDonghuaHasMore(newList.length >= 20);
    }
  }, [donghuaData, donghuaPage]);

  useEffect(() => {
    if (animeData) {
      const newList = animeData?.data?.animeList || [];
      if (animePage === 1) {
        setAnimeList(newList);
      } else {
        setAnimeList(prev => {
          const existingIds = new Set(prev.map(a => a.animeId));
          const uniqueNew = newList.filter((a: any) => !existingIds.has(a.animeId));
          return [...prev, ...uniqueNew];
        });
      }
      setAnimeHasMore(newList.length >= 20);
    }
  }, [animeData, animePage]);

  const { data: comicData, isLoading: comicLoading } = useQuery({
    queryKey: ['comic-latest'],
    queryFn: comicApi.getLatest,
  });

  const { data: novelData, isLoading: novelLoading } = useQuery({
    queryKey: ['novel-latest'],
    queryFn: novelApi.getLatest,
  });

  const filterByTitle = (items: any[], titleKey: string = 'title') => {
    if (!items) return [];
    return items.filter((item: any) =>
      item[titleKey]?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const loadMoreAnime = useCallback(() => {
    setAnimePage(prev => prev + 1);
  }, []);

  const loadMoreDonghua = useCallback(() => {
    setDonghuaPage(prev => prev + 1);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Clock className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Ongoing / Latest
        </h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Currently airing anime, donghua, and latest comic/novel updates
      </p>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="anime" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-2">
          <TabsTrigger value="anime" className="gap-2">
            <Tv className="h-4 w-4" /> Anime
          </TabsTrigger>
          <TabsTrigger value="donghua" className="gap-2">
            <Film className="h-4 w-4" /> Donghua
          </TabsTrigger>
          <TabsTrigger value="comic" className="gap-2">
            <BookOpen className="h-4 w-4" /> Comic
          </TabsTrigger>
          <TabsTrigger value="novel" className="gap-2">
            <BookText className="h-4 w-4" /> Light Novel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="anime">
          {animeLoading && animePage === 1 ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filterByTitle(animeList, 'title').map((anime: any) => (
                  <AnimeCard key={anime.animeId} {...anime} />
                ))}
              </div>
              {animeHasMore && !searchQuery && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={loadMoreAnime} 
                    disabled={animeFetching}
                    variant="outline"
                    size="lg"
                  >
                    {animeFetching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Load More'
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="donghua">
          {donghuaLoading && donghuaPage === 1 ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filterByTitle(donghuaList, 'title').map((donghua: any) => (
                  <DonghuaCard key={donghua.slug} {...donghua} />
                ))}
              </div>
              {donghuaHasMore && !searchQuery && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={loadMoreDonghua} 
                    disabled={donghuaFetching}
                    variant="outline"
                    size="lg"
                  >
                    {donghuaFetching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Load More'
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="comic">
          {comicLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filterByTitle(comicData?.komikList || [], 'title').map((comic: any) => (
                <ComicCard key={comic.slug} {...comic} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="novel">
          {novelLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filterByTitle(novelData?.novels || [], 'title').map((novel: any) => (
                <NovelCard key={novel.slug} {...novel} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedOngoing;
