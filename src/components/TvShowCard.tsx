import { Link } from 'react-router-dom';
import { TvShowItem } from '@/lib/tvshowApi';
import { Badge } from '@/components/ui/badge';
import { Tv, Star } from 'lucide-react';

interface TvShowCardProps {
  show: TvShowItem;
  type?: 'film' | 'series';
}

const TvShowCard = ({ show, type = 'series' }: TvShowCardProps) => {
  const detailPath = type === 'film' ? `/tvshow/film/${show.id || show.id}` : `/tvshow/series/${show.id || show.id}`;

  return (
    <Link to={detailPath} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={show.poster || '/placeholder.svg'}
            alt={show.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {show.type && (
            <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs">
              <Tv className="w-3 h-3 mr-1" />
              {show.type}
            </Badge>
          )}
          
          {show.rating && (
            <Badge className="absolute top-2 right-2 bg-accent/90 text-accent-foreground text-xs">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {show.rating}
            </Badge>
          )}
        </div>
        
        <div className="p-3 space-y-1">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {show.title}
          </h3>
          {show.year && (
            <p className="text-xs text-muted-foreground">{show.year}</p>
          )}
          {show.status && (
            <Badge variant="outline" className="text-xs">
              {show.status}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TvShowCard;
