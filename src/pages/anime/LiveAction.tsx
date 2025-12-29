import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { animeApi } from '@/lib/animeApi';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film, Star, Play } from 'lucide-react';

const LiveAction = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['live-action'],
    queryFn: () => animeApi.getLiveAction(),
  });

  if (isLoading) return <LoadingSkeleton />;

  const actionList = data?.data?.animeList || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Live Action</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <Link to="/anime/j-drama" className="text-primary hover:underline">
            ← Japanese Drama
          </Link>
        </div>

        {actionList.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No live action found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {actionList.map((item, index) => (
              <Link key={index} to={`/anime/live-action/${item.animeId}`} className="group block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    {item.score && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                        <Star className="w-3 h-3 mr-1" />
                        {item.score}
                      </Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAction;
