import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen } from 'lucide-react';

interface NovelCardProps {
  title: string;
  slug: string;
  image: string;
  rating?: string;
  latestChapter?: string;
  cover?: { url: string };
}

export const NovelCard = ({ title, slug, image, rating, latestChapter, cover }: NovelCardProps) => {
  // Handle different image formats
  const imageUrl = cover?.url || image?.split(' ')[0] || image;

  return (
    <Link to={`/novel/meionovel/detail/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2">{title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {rating && rating !== '' && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white">{rating}</span>
              </div>
            )}
            {latestChapter && (
              <Badge variant="secondary" className="text-xs truncate max-w-[120px]">
                <BookOpen className="h-3 w-3 mr-1" />
                {latestChapter}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
