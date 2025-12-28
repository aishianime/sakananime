import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReadingHistory, ContentType, HistoryItem } from '@/hooks/useReadingHistory';
import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  History, 
  Heart, 
  Trash2, 
  BookOpen, 
  Film, 
  FileText, 
  Clock,
  Play,
  X
} from 'lucide-react';

const Library = () => {
  const { history, removeFromHistory, clearHistory } = useReadingHistory();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [contentFilter, setContentFilter] = useState<ContentType | 'all'>('all');

  const getDetailLink = (type: ContentType, slug: string) => {
    switch (type) {
      case 'comic': return `/comic/detail/${slug}`;
      case 'novel': return `/novel/detail/${slug}`;
      case 'anime': return `/anime/detail/${slug}`;
    }
  };

  const getContinueLink = (item: HistoryItem) => {
    switch (item.type) {
      case 'comic': 
        return item.lastChapterSlug 
          ? `/comic/bacakomik/chapter/${item.lastChapterSlug}` 
          : `/comic/detail/${item.slug}`;
      case 'novel': 
        return item.lastChapterSlug 
          ? `/novel/read/${item.slug}/${item.lastChapterSlug}` 
          : `/novel/detail/${item.slug}`;
      case 'anime': 
        return item.lastEpisodeId 
          ? `/anime/episode/${item.lastEpisodeId}` 
          : `/anime/detail/${item.slug}`;
    }
  };

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'comic': return <BookOpen className="h-3 w-3" />;
      case 'novel': return <FileText className="h-3 w-3" />;
      case 'anime': return <Film className="h-3 w-3" />;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredHistory = contentFilter === 'all' 
    ? history 
    : history.filter(h => h.type === contentFilter);

  const filteredFavorites = contentFilter === 'all' 
    ? favorites 
    : favorites.filter(f => f.type === contentFilter);

  const renderHistoryItem = (item: HistoryItem) => (
    <Card key={`${item.type}-${item.slug}`} className="overflow-hidden group">
      <div className="flex">
        <Link to={getDetailLink(item.type, item.slug)} className="flex-shrink-0">
          <img
            src={item.cover}
            alt={item.title}
            className="w-20 h-28 object-cover"
          />
        </Link>
        <CardContent className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs capitalize flex items-center gap-1">
                {getTypeIcon(item.type)}
                {item.type}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(item.timestamp)}
              </span>
            </div>
            <Link to={getDetailLink(item.type, item.slug)}>
              <h3 className="font-semibold text-sm line-clamp-1 hover:text-primary transition-colors">
                {item.title}
              </h3>
            </Link>
            {(item.lastChapter || item.lastEpisode) && (
              <p className="text-xs text-muted-foreground mt-1">
                {item.lastChapter || `Episode ${item.lastEpisode}`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Link to={getContinueLink(item)} className="flex-1">
              <Button size="sm" className="w-full h-7 text-xs">
                <Play className="h-3 w-3 mr-1" />
                Continue
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              onClick={() => removeFromHistory(item.type, item.slug)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  const renderFavoriteItem = (item: FavoriteItem) => (
    <Card key={`${item.type}-${item.slug}`} className="overflow-hidden group">
      <div className="flex">
        <Link to={getDetailLink(item.type, item.slug)} className="flex-shrink-0">
          <img
            src={item.cover}
            alt={item.title}
            className="w-20 h-28 object-cover"
          />
        </Link>
        <CardContent className="flex-1 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs capitalize flex items-center gap-1">
                {getTypeIcon(item.type)}
                {item.type}
              </Badge>
              {item.status && (
                <Badge variant="secondary" className="text-xs">
                  {item.status}
                </Badge>
              )}
            </div>
            <Link to={getDetailLink(item.type, item.slug)}>
              <h3 className="font-semibold text-sm line-clamp-1 hover:text-primary transition-colors">
                {item.title}
              </h3>
            </Link>
            {item.rating && (
              <p className="text-xs text-muted-foreground mt-1">⭐ {item.rating}</p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Link to={getDetailLink(item.type, item.slug)} className="flex-1">
              <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                View Details
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
              onClick={() => removeFromFavorites(item.type, item.slug)}
            >
              <Heart className="h-3 w-3 fill-current" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Library</h1>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'history' | 'favorites')}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                History ({history.length})
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                Favorites ({favorites.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={contentFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setContentFilter('all')}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={contentFilter === 'comic' ? 'default' : 'outline'}
                  onClick={() => setContentFilter('comic')}
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={contentFilter === 'novel' ? 'default' : 'outline'}
                  onClick={() => setContentFilter('novel')}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={contentFilter === 'anime' ? 'default' : 'outline'}
                  onClick={() => setContentFilter('anime')}
                >
                  <Film className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => activeTab === 'history' ? clearHistory() : clearFavorites()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="history">
            {filteredHistory.length === 0 ? (
              <Card className="p-12 text-center">
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reading history</h3>
                <p className="text-muted-foreground mb-4">
                  Start reading comics, novels, or watching anime to track your progress
                </p>
                <div className="flex justify-center gap-2">
                  <Link to="/comic"><Button variant="outline">Browse Comics</Button></Link>
                  <Link to="/novel"><Button variant="outline">Browse Novels</Button></Link>
                  <Link to="/anime"><Button variant="outline">Browse Anime</Button></Link>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHistory.map(renderHistoryItem)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {filteredFavorites.length === 0 ? (
              <Card className="p-12 text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add comics, novels, or anime to your favorites to find them easily
                </p>
                <div className="flex justify-center gap-2">
                  <Link to="/comic"><Button variant="outline">Browse Comics</Button></Link>
                  <Link to="/novel"><Button variant="outline">Browse Novels</Button></Link>
                  <Link to="/anime"><Button variant="outline">Browse Anime</Button></Link>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFavorites.map(renderFavoriteItem)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Library;
