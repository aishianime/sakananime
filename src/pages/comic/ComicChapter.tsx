import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { comicApi } from '@/lib/comicApi';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useReadingHistory } from '@/hooks/useReadingHistory';

const ComicChapter = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(true);
  const { addToHistory } = useReadingHistory();

  const { data, isLoading } = useQuery({
    queryKey: ['comic-chapter', slug],
    queryFn: () => comicApi.getChapter(slug!),
    enabled: !!slug,
  });

  // Extract comic slug from chapter slug (e.g., "kingdom-chapter-818" -> "kingdom")
  const comicSlug = slug?.replace(/-chapter-\d+.*$/, '') || '';

  // Track reading history
  useEffect(() => {
    if (data?.title && comicSlug && slug) {
      addToHistory({
        type: 'comic',
        slug: comicSlug,
        title: data.title.replace(/Chapter.*$/i, '').trim() || comicSlug,
        cover: data.images?.[0] || '',
        lastChapter: data.title,
        lastChapterSlug: slug,
      });
    }
  }, [data, comicSlug, slug, addToHistory]);

  // Handle scroll to show/hide navigation
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowNav(currentScroll < lastScroll || currentScroll < 100);
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && data?.navigation?.prev?.slug) {
        navigate(`/comic/bacakomik/chapter/${data.navigation.prev.slug}`);
      } else if (e.key === 'ArrowRight' && data?.navigation?.next?.slug) {
        navigate(`/comic/bacakomik/chapter/${data.navigation.next.slug}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, navigate]);

  if (isLoading) return <LoadingSkeleton />;

  if (!data?.images) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Chapter not found</p>
        <Link to="/comic">
          <Button className="mt-4">Back to Comics</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 transition-transform duration-300 ${
          showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between bg-card/95 backdrop-blur rounded-xl p-3 shadow-lg border">
            <div className="flex items-center gap-2">
              <Link to={`/comic/detail/${comicSlug}`}>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Chapters</span>
                </Button>
              </Link>
              <Link to="/comic">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <h1 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-none">
              {data.title}
            </h1>

            <div className="flex items-center gap-2">
              {data.navigation?.prev?.slug && (
                <Link to={`/comic/bacakomik/chapter/${data.navigation.prev.slug}`}>
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Prev</span>
                  </Button>
                </Link>
              )}
              {data.navigation?.next?.slug && (
                <Link to={`/comic/bacakomik/chapter/${data.navigation.next.slug}`}>
                  <Button variant="outline" size="sm">
                    <span className="hidden sm:inline mr-1">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Images Container */}
      <div className="max-w-4xl mx-auto pt-20 pb-20">
        <div className="flex flex-col items-center">
          {data.images.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`Page ${index + 1}`}
              className="w-full"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t p-4">
        <div className="container mx-auto flex items-center justify-between">
          {data.navigation?.prev?.slug ? (
            <Link to={`/comic/bacakomik/chapter/${data.navigation.prev.slug}`}>
              <Button variant="default">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            </Link>
          ) : (
            <div />
          )}

          <Link to={`/comic/detail/${comicSlug}`}>
            <Button variant="outline">
              <List className="h-4 w-4 mr-2" />
              All Chapters
            </Button>
          </Link>

          {data.navigation?.next?.slug ? (
            <Link to={`/comic/bacakomik/chapter/${data.navigation.next.slug}`}>
              <Button variant="default">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicChapter;
