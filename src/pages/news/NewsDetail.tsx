import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { newsApi } from '@/lib/newsApi';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

const NewsDetail = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['news-detail', id, slug],
    queryFn: () => newsApi.getDetail(id!, slug!),
    enabled: !!id && !!slug,
  });

  if (isLoading) return <LoadingSkeleton />;

  const article = data?.data;
  if (!article) return <div className="container mx-auto px-4 py-8">Article not found</div>;

  const formattedDate = new Date(article.date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <img
        src={article.image}
        alt={article.title}
        className="w-full aspect-video object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <div className="flex items-center gap-4 mb-4 text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span className="text-sm">{article.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formattedDate}</span>
        </div>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      )}

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default NewsDetail;
