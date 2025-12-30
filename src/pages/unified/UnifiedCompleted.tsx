import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
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
import { Search, Film, Tv, BookOpen, BookText, CheckCircle } from 'lucide-react';

const UnifiedCompleted = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: donghuaData, isLoading: donghuaLoading } = useQuery({
    queryKey: ['donghua-completed'],
    queryFn: () => api.getCompleted(1),
  });

  const { data: animeData, isLoading: animeLoading } = useQuery({
    queryKey: ['anime-completed'],
    queryFn: () => animeApi.getCompleted(1),
  });

  const { data: comicData, isLoading: comicLoading } = useQuery({
    queryKey: ['comic-top'],
    queryFn: comicApi.getTop,
  });

  const { data: novelData, isLoading: novelLoading } = useQuery({
    queryKey: ['novel-popular'],
    queryFn: novelApi.getPopular,
  });

  const filterByTitle = (items: any[], titleKey: string = 'title') => {
    if (!items) return [];
    return items.filter((item: any) =>
      item[titleKey]?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <CheckCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Completed / Popular
        </h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Finished series and top-rated content across all categories
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
          {animeLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filterByTitle(animeData?.data?.animeList || [], 'title').map((anime: any) => (
                <AnimeCard key={anime.animeId} {...anime} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="donghua">
          {donghuaLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filterByTitle(donghuaData?.donghuaList || [], 'title').map((donghua: any) => (
                <DonghuaCard key={donghua.slug} {...donghua} />
              ))}
            </div>
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

export default UnifiedCompleted;
