import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { tvshowApi } from '@/lib/tvshowApi';
import { useLevel } from '@/hooks/useLevel';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight, Tv } from 'lucide-react';

const TvShowEpisode = () => {
  const { id } = useParams<{ id: string }>();
  const { onWatchEpisode } = useLevel();

  const { data, isLoading, error } = useQuery({
    queryKey: ['tvshow-episode', id],
    queryFn: () => tvshowApi.getEpisode(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.data) {
      onWatchEpisode();
    }
  }, [data?.data, onWatchEpisode]);

  if (isLoading) return <LoadingGrid />;

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Episode Not Found</h2>
          <Link to="/tvshow">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to TV Shows
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const episode = data.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/tvshow" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to TV Shows
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Tv className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {episode.title}
            </h1>
          </div>

          {episode.streamUrl && (
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={episode.streamUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {episode.servers && episode.servers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Servers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {episode.servers.map((server) => (
                    <a key={server.id} href={server.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        {server.name}
                      </Button>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            {episode.prevEpisode ? (
              <Link to={`/tvshow/episode/${episode.prevEpisode.id}`}>
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-1" /> {episode.prevEpisode.title}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {episode.nextEpisode && (
              <Link to={`/tvshow/episode/${episode.nextEpisode.id}`}>
                <Button variant="outline">
                  {episode.nextEpisode.title} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShowEpisode;
