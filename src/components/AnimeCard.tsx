import { Link } from 'react-router-dom';
import { Play, Star, Calendar } from 'lucide-react';
import { AnimeCard as AnimeCardType } from '@/lib/animeApi';

interface AnimeCardProps {
  anime: AnimeCardType;
  showScore?: boolean;
  showEpisodes?: boolean;
  showReleaseDay?: boolean;
}

export const AnimeCard = ({ anime, showScore = false, showEpisodes = true, showReleaseDay = false }: AnimeCardProps) => {
  const targetUrl = `/anime/detail/${anime.animeId}`;

  return (
    <Link to={targetUrl} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-card shadow-card hover:shadow-hover transition-all duration-300 animate-fade-in">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center space-y-2">
              <Play className="w-12 h-12 mx-auto" />
              <p className="text-sm font-medium">Watch Now</p>
            </div>
          </div>
          {/* Status badge */}
          {anime.status && (
            <div className="absolute top-2 left-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  anime.status === 'Ongoing'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {anime.status}
              </span>
            </div>
          )}
          {/* Episode count badge */}
          {showEpisodes && anime.episodes && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 text-xs font-semibold rounded bg-black/70 text-white">
                Ep {anime.episodes}
              </span>
            </div>
          )}
          {/* Score badge */}
          {showScore && anime.score && (
            <div className="absolute bottom-2 right-2">
              <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-500/90 text-black flex items-center gap-1">
                <Star className="w-3 h-3" />
                {anime.score}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          {showReleaseDay && (anime.releaseDay || anime.latestReleaseDate) && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{anime.releaseDay}</span>
              {anime.latestReleaseDate && <span>• {anime.latestReleaseDate}</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
