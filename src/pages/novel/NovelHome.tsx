import { useQuery } from '@tanstack/react-query';
import { novelApi } from '@/lib/novelApi';
import { NovelCard } from '@/components/NovelCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NovelHome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['novel-home'],
    queryFn: novelApi.getHome,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
        Novel
      </h1>

      {/* Genre Links */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link to="/novel/genre/1002">
          <Button variant="outline" size="sm">Modern Romance</Button>
        </Link>
        <Link to="/novel/genre/1003">
          <Button variant="outline" size="sm">Fantasy Romance</Button>
        </Link>
        <Link to="/novel/genre/1006">
          <Button variant="outline" size="sm">Eastern Fantasy</Button>
        </Link>
        <Link to="/novel/genre/1007">
          <Button variant="outline" size="sm">Western Fantasy</Button>
        </Link>
      </div>

      {data?.result?.items?.map((section: any) => (
        <section key={section.title} className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {section.contents?.slice(0, 12).map((novel: any) => (
              <NovelCard key={novel.novelId} {...novel} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default NovelHome;
