import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { tvshowApi } from '@/lib/tvshowApi';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const TvShowSchedule = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const [selectedDay, setSelectedDay] = useState(today);

  const { data, isLoading } = useQuery({
    queryKey: ['tvshow-schedule', selectedDay],
    queryFn: () => tvshowApi.getSchedule(selectedDay),
  });

  const scheduleList = data?.data?.schedule || data?.data?.list || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/tvshow">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            TV Show Schedule
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {DAYS.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? 'default' : 'outline'}
              onClick={() => setSelectedDay(day)}
              className="capitalize"
            >
              {day}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <LoadingGrid />
        ) : scheduleList.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No shows scheduled for {selectedDay}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {scheduleList.map((show, index) => (
              <Link key={show.id || index} to={`/tvshow/series/${show.slug || show.id}`}>
                <Card className="overflow-hidden hover:ring-2 hover:ring-primary transition-all group">
                  <div className="relative aspect-[2/3]">
                    <img
                      src={show.poster}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {show.time && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {show.time}
                      </div>
                    )}
                    {show.episode && (
                      <div className="absolute bottom-2 left-2 bg-background/90 text-foreground px-2 py-1 rounded text-xs">
                        {show.episode}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-foreground line-clamp-2 text-sm">{show.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowSchedule;
