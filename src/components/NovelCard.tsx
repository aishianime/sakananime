import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, BookOpen } from 'lucide-react';

interface NovelCardProps {
  novelId: number;
  title: string;
  cover: { url: string };
  score?: string;
  totalViews?: string;
  totalChapters?: number;
  genres?: string[];
}

export const NovelCard = ({ novelId, title, cover, score, totalViews, totalChapters, genres }: NovelCardProps) => {
  return (
    <Link to={`/novel/chapters/${novelId}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={cover.url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {score && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white">{score}</span>
              </div>
            )}
            {totalViews && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-white" />
                <span className="text-xs text-white">{totalViews}</span>
              </div>
            )}
            {totalChapters && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-white" />
                <span className="text-xs text-white">{totalChapters} ch</span>
              </div>
            )}
          </div>
          {genres && genres.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {genres[0]}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};
