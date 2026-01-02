import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { tvshowApi } from '@/lib/tvshowApi';
import TvShowCard from '@/components/TvShowCard';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Tv, Film, List, Shuffle } from 'lucide-react';

const TvShowHome = () => {
  const [tvshowPage, setTvshowPage] = useState(1);
  const [seriesPage, setSeriesPage] = useState(1);
  const [filmsPage, setFilmsPage] = useState(1);
  const [othersPage, setOthersPage] = useState(1);

  const { data: tvshowData, isLoading: tvshowLoading } = useQuery({
    queryKey: ['tvshows', tvshowPage],
    queryFn: () => tvshowApi.getTvShows(tvshowPage),
  });

  const { data: seriesData, isLoading: seriesLoading } = useQuery({
    queryKey: ['tvshow-series', seriesPage],
    queryFn: () => tvshowApi.getSeries(seriesPage),
  });

  const { data: filmsData, isLoading: filmsLoading } = useQuery({
    queryKey: ['tvshow-films', filmsPage],
    queryFn: () => tvshowApi.getFilms(filmsPage),
  });

  const { data: othersData, isLoading: othersLoading } = useQuery({
    queryKey: ['tvshow-others', othersPage],
    queryFn: () => tvshowApi.getOthers(othersPage),
  });

  const renderPagination = (
    currentPage: number,
    setPage: (page: number) => void,
    pagination?: { hasNextPage: boolean; hasPrevPage: boolean }
  ) => (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        variant="outline"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
      </Button>
      <span className="flex items-center px-4 py-2 bg-muted rounded-lg">
        Page {currentPage}
      </span>
      <Button
        variant="outline"
        onClick={() => setPage(currentPage + 1)}
        disabled={!pagination?.hasNextPage}
      >
        Next <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );

  const renderGrid = (items: any[], type: 'film' | 'series' = 'series') => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((show, index) => (
        <TvShowCard key={show.id || index} show={show} type={type} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Tv className="w-8 h-8 text-primary" />
            TV Shows
          </h1>
          <div className="flex gap-2">
            <Link to="/tvshow/genres">
              <Button variant="outline" size="sm">
                <List className="w-4 h-4 mr-2" /> Genres
              </Button>
            </Link>
            <Link to="/tvshow/all">
              <Button variant="outline" size="sm">
                <Shuffle className="w-4 h-4 mr-2" /> All Shows
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="tvshow" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="tvshow" className="flex items-center gap-2">
              <Tv className="w-4 h-4" /> TV Shows
            </TabsTrigger>
            <TabsTrigger value="series" className="flex items-center gap-2">
              <List className="w-4 h-4" /> Series
            </TabsTrigger>
            <TabsTrigger value="films" className="flex items-center gap-2">
              <Film className="w-4 h-4" /> Films
            </TabsTrigger>
            <TabsTrigger value="others" className="flex items-center gap-2">
              <Shuffle className="w-4 h-4" /> Others
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tvshow">
            {tvshowLoading ? (
              <LoadingGrid />
            ) : (
              <>
                {renderGrid(tvshowData?.data?.animeList || tvshowData?.data?.list || [])}
                {renderPagination(tvshowPage, setTvshowPage, tvshowData?.data?.pagination)}
              </>
            )}
          </TabsContent>

          <TabsContent value="series">
            {seriesLoading ? (
              <LoadingGrid />
            ) : (
              <>
                {renderGrid(seriesData?.data?.animeList || seriesData?.data?.list || [])}
                {renderPagination(seriesPage, setSeriesPage, seriesData?.data?.pagination)}
              </>
            )}
          </TabsContent>

          <TabsContent value="films">
            {filmsLoading ? (
              <LoadingGrid />
            ) : (
              <>
                {renderGrid(filmsData?.data?.animeList || filmsData?.data?.list || [], 'film')}
                {renderPagination(filmsPage, setFilmsPage, filmsData?.data?.pagination)}
              </>
            )}
          </TabsContent>

          <TabsContent value="others">
            {othersLoading ? (
              <LoadingGrid />
            ) : (
              <>
                {renderGrid(othersData?.data?.animeList || othersData?.data?.list || [])}
                {renderPagination(othersPage, setOthersPage, othersData?.data?.pagination)}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TvShowHome;
