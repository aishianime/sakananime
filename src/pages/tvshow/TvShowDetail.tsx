import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tvshowApi } from '@/lib/tvshowApi';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Star, Calendar, Tv } from 'lucide-react';

interface TvShowDetailProps {
  type: 'film' | 'series';
}

const TvShowDetail = ({ type }: TvShowDetailProps) => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tvshow-detail', type, id],
    queryFn: () => type === 'film' ? tvshowApi.getFilmDetail(id!) : tvshowApi.getSeriesDetail(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingGrid />;

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Not Found</h2>
          <Link to="/tvshow">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to TV Shows
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const show = data.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-xl"
          style={{ backgroundImage: `url(${show.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link to="/tvshow" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to TV Shows
          </Link>

          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={show.poster || '/placeholder.svg'}
                  alt={show.title}
                  className="w-full aspect-[2/3] object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {show.title}
                </h1>
                {show.alternativeTitle && (
                  <p className="text-lg text-muted-foreground">{show.alternativeTitle}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {show.type && (
                  <Badge className="bg-primary/20 text-primary">
                    <Tv className="w-3 h-3 mr-1" /> {show.type}
                  </Badge>
                )}
                {show.status && (
                  <Badge variant="outline">{show.status}</Badge>
                )}
                {show.year && (
                  <Badge variant="secondary">
                    <Calendar className="w-3 h-3 mr-1" /> {show.year}
                  </Badge>
                )}
                {show.rating && (
                  <Badge className="bg-accent/20 text-accent-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" /> {show.rating}
                  </Badge>
                )}
              </div>

              {show.genres && show.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {show.genres.map((genre) => (
                    <Link key={genre.slug} to={`/tvshow/genre/${genre.slug}`}>
                      <Badge variant="outline" className="hover:bg-primary/20 cursor-pointer">
                        {genre.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {show.synopsis && (
                <Card>
                  <CardHeader>
                    <CardTitle>Synopsis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{show.synopsis}</p>
                  </CardContent>
                </Card>
              )}

              {show.episodes && show.episodes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Episodes ({show.episodes.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {show.episodes.map((episode) => (
                        <Link key={episode.id} to={`/tvshow/episode/${episode.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            <Play className="w-3 h-3 mr-1" />
                            {episode.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShowDetail;
