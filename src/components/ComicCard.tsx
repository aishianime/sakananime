import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComicCardProps {
  title: string;
  slug: string;
  cover: string;
  chapter?: string;
  date?: string;
  type?: string;
  rating?: string;
  className?: string;
}

export const ComicCard = ({ 
  title, 
  slug, 
  cover, 
  chapter, 
  date, 
  type, 
  rating,
  className 
}: ComicCardProps) => {
  return (
    <Link 
      to={`/comic/bacakomik/detail/${slug}`} 
      className={cn("group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
      aria-label={`Baca komik ${title}`}
    >
      <div className="relative overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]">
        {/* Cover Image */}
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-comic.jpg';
              e.currentTarget.alt = `Gambar tidak tersedia untuk ${title}`;
            }}
          />
          {/* Fallback overlay while loading */}
          <div className="absolute inset-0 bg-muted animate-pulse" aria-hidden="true" />
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" 
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1 leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {/* Type Badge */}
            {type && (
              <Badge 
                variant="secondary" 
                className="text-xs capitalize font-medium max-w-[80px] truncate"
                title={type}
              >
                {type}
              </Badge>
            )}
            
            {/* Chapter Badge */}
            {chapter && (
              <Badge 
                variant="outline" 
                className="text-xs text-white border-white/50 bg-black/40 backdrop-blur-sm"
              >
                {chapter}
              </Badge>
            )}
            
            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-1 ml-auto">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="text-xs text-white font-medium">{rating}</span>
              </div>
            )}
          </div>
          
          {/* Date */}
          {date && (
            <p className="text-xs text-gray-300/90 mt-1 font-medium">
              {date}
            </p>
          )}
        </div>
        
        {/* Hover Effect Indicator */}
        <div 
          className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-colors duration-300 pointer-events-none" 
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};
