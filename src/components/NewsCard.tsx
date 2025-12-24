import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface NewsCardProps {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt?: string;
}

export const NewsCard = ({ id, slug, title, image, date, excerpt }: NewsCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/news/detail/${id}/${slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{excerpt}</p>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
