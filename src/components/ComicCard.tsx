import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ComicCardProps {
  title: string;
  slug: string;
  cover: string;
  chapter?: string;
  date?: string;
  type?: string;
  rating?: string;
}

export const ComicCard = ({ title, slug, cover, chapter, date, type, rating }: ComicCardProps) => {
  return (
    <Link to={`/comic/bacakomik/detail/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {type && (
              <Badge variant="secondary" className="text-xs capitalize">
                {type}
              </Badge>
            )}
            {chapter && (
              <Badge variant="outline" className="text-xs text-white border-white/50">
                {chapter}
              </Badge>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white">{rating}</span>
              </div>
            )}
          </div>
          {date && (
            <p className="text-xs text-gray-300 mt-1">{date}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
