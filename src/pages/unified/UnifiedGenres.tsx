import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { animeApi } from '@/lib/animeApi';
import { comicApi } from '@/lib/comicApi';
import { novelApi } from '@/lib/novelApi';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Film, Tv, BookOpen, BookText } from 'lucide-react';

const UnifiedGenres = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: donghuaGenres, isLoading: donghuaLoading } = useQuery({
    queryKey: ['donghua-genres'],
    queryFn: api.getGenres,
  });

  const { data: animeGenres, isLoading: animeLoading } = useQuery({
    queryKey: ['anime-genres'],
    queryFn: animeApi.getGenres,
  });

  const { data: comicGenres, isLoading: comicLoading } = useQuery({
    queryKey: ['comic-genres'],
    queryFn: comicApi.getGenres,
  });

  const { data: novelGenres, isLoading: novelLoading } = useQuery({
    queryKey: ['novel-genres'],
    queryFn: novelApi.getGenres,
  });

  const filterGenres = (genres: any, nameKey: string = 'name') => {
    if (!genres || !Array.isArray(genres)) return [];
    return genres.filter((g: any) => 
      g[nameKey]?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
        Browse by Genre
      </h1>
      <p className="text-muted-foreground mb-6">
        Explore content across anime, donghua, comics, and light novels by genre
      </p>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search genres..."
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
            <div className="flex flex-wrap gap-2">
              {filterGenres(animeGenres?.data || [], 'name').map((genre: any) => (
                <Link key={genre.slug} to={`/anime/genre/${genre.slug}`}>
                  <Badge variant="outline" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {genre.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="donghua">
          {donghuaLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="flex flex-wrap gap-2">
              {filterGenres(donghuaGenres?.genres || [], 'name').map((genre: any) => (
                <Link key={genre.slug} to={`/genres/${genre.slug}`}>
                  <Badge variant="outline" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {genre.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="comic">
          {comicLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="flex flex-wrap gap-2">
              {filterGenres(comicGenres?.genres || [], 'title').map((genre: any) => (
                <Link key={genre.slug} to={`/comic/genre/${genre.slug}`}>
                  <Badge variant="outline" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {genre.title}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="novel">
          {novelLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="flex flex-wrap gap-2">
              {filterGenres(novelGenres?.genres || [], 'name').map((genre: any) => (
                <Link key={genre.slug} to={`/novel/genre/${genre.slug}`}>
                  <Badge variant="outline" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    {genre.name} {genre.count && `(${genre.count})`}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedGenres;
