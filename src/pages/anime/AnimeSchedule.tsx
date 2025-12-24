import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { animeApi, ScheduleDay } from '@/lib/animeApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnimeSchedule() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await animeApi.getSchedule();
        setSchedule(data.data || []);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get today's day in Indonesian
  const dayMap: { [key: number]: string } = {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu'
  };
  const today = dayMap[new Date().getDay()];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10">
            <Calendar className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Jadwal Rilis Anime</h1>
            <p className="text-muted-foreground">Jadwal rilis anime mingguan</p>
          </div>
        </div>

        <Tabs defaultValue={today} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 mb-6">
            {schedule.map((day) => (
              <TabsTrigger 
                key={day.day} 
                value={day.day}
                className="flex-1 min-w-[80px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {schedule.map((day) => (
            <TabsContent key={day.day} value={day.day}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {day.anime_list.map((anime, index) => (
                  <Link 
                    key={index} 
                    to={`/anime/detail/${anime.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-card shadow-card hover:shadow-hover transition-all duration-300">
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={anime.poster}
                          alt={anime.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <p className="text-white text-sm font-medium">Watch Now</p>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {anime.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
