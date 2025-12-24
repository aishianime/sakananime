import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { animeApi, AnimeEpisodeData, ServerQuality } from '@/lib/animeApi';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnimeEpisode() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<AnimeEpisodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [streamingUrl, setStreamingUrl] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [loadingServer, setLoadingServer] = useState(false);

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await animeApi.getEpisode(slug);
        if (data.status === 'success' && data.data) {
          setEpisode(data.data);
          setStreamingUrl(data.data.defaultStreamingUrl);
          // Set default quality
          if (data.data.server?.qualities && data.data.server.qualities.length > 0) {
            setSelectedQuality(data.data.server.qualities[0].title);
          }
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching episode:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [slug]);

  const handleServerChange = async (serverId: string) => {
    try {
      setLoadingServer(true);
      const data = await animeApi.getServerUrl(serverId);
      if (data.status === 'success' && data.data?.url) {
        setStreamingUrl(data.data.url);
      }
    } catch (error) {
      console.error('Error fetching server URL:', error);
    } finally {
      setLoadingServer(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading episode...</p>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
          <Link to="/anime">
            <Button>Back to Anime Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const qualities = episode.server?.qualities || [];

  return (
    <div className="min-h-screen pb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{episode.title}</h1>
          {episode.releaseTime && (
            <p className="text-sm text-muted-foreground">{episode.releaseTime}</p>
          )}
        </div>

        {/* Video Player */}
        <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-hover mb-6">
          <div className="aspect-video">
            {loadingServer ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <iframe
                src={streamingUrl}
                className="w-full h-full"
                allowFullScreen
                title={episode.title}
              />
            )}
          </div>
        </div>

        {/* Server Selection */}
        {qualities.length > 0 && (
          <div className="bg-card border rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium mb-3">Select Server</h3>
            <Tabs value={selectedQuality} onValueChange={setSelectedQuality}>
              <TabsList className="mb-3">
                {qualities.map((q) => (
                  <TabsTrigger key={q.title} value={q.title}>
                    {q.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {qualities.map((q) => (
                <TabsContent key={q.title} value={q.title}>
                  <div className="flex flex-wrap gap-2">
                    {q.serverList.map((server) => (
                      <Button
                        key={server.serverId}
                        variant="outline"
                        size="sm"
                        onClick={() => handleServerChange(server.serverId)}
                        disabled={loadingServer}
                      >
                        {server.title}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 mb-6">
          {episode.hasPrevEpisode && episode.prevEpisode ? (
            <Button
              onClick={() => navigate(`/anime/episode/${episode.prevEpisode!.episodeId}`)}
              variant="outline"
              size="sm"
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-9 px-3" disabled>
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
          )}

          <Link to={`/anime/detail/${episode.animeId}`} className="flex-1">
            <Button variant="default" className="w-full h-9">
              <Home className="h-4 w-4 mr-2" />
              All Episodes
            </Button>
          </Link>

          {episode.hasNextEpisode && episode.nextEpisode ? (
            <Button
              onClick={() => navigate(`/anime/episode/${episode.nextEpisode!.episodeId}`)}
              variant="outline"
              size="sm"
              className="h-9 px-3"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-9 px-3" disabled>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Download Links */}
        {episode.downloadUrl?.qualities && episode.downloadUrl.qualities.length > 0 && (
          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">Download</h3>
            <div className="space-y-3">
              {episode.downloadUrl.qualities.map((q, qIndex) => (
                <div key={qIndex}>
                  <span className="text-xs text-muted-foreground">{q.title}</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {q.urls.map((dl, dlIndex) => (
                      <a
                        key={dlIndex}
                        href={dl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm">
                          {dl.title}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
