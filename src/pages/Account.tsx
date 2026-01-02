import { useAuth } from "@/hooks/useAuth";
import { useLevel, getXpForLevel } from "@/hooks/useLevel";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { useFavorites } from "@/hooks/useFavorites";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Trophy, 
  BookOpen, 
  Play, 
  Heart, 
  Clock, 
  Star,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

const getLevelTitle = (level: number): string => {
  if (level <= 5) return "Novice Reader";
  if (level <= 10) return "Casual Viewer";
  if (level <= 20) return "Dedicated Fan";
  if (level <= 35) return "Otaku Expert";
  if (level <= 50) return "Weeb Master";
  if (level <= 75) return "Culture Connoisseur";
  return "Legendary Otaku";
};

const getLevelColor = (level: number): string => {
  if (level <= 5) return "bg-zinc-500";
  if (level <= 10) return "bg-emerald-500";
  if (level <= 20) return "bg-blue-500";
  if (level <= 35) return "bg-purple-500";
  if (level <= 50) return "bg-amber-500";
  if (level <= 75) return "bg-rose-500";
  return "bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600";
};

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { levelData, getProgress, XP_REWARDS } = useLevel();
  const { history } = useReadingHistory();
  const { favorites } = useFavorites();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const progress = getProgress();
  const levelTitle = getLevelTitle(levelData.level);
  const levelColor = getLevelColor(levelData.level);

  const stats = [
    { label: "Chapters Read", value: levelData.totalChaptersRead, icon: BookOpen, color: "text-blue-400" },
    { label: "Episodes Watched", value: levelData.totalEpisodesWatched, icon: Play, color: "text-purple-400" },
    { label: "Comics Completed", value: levelData.comicsRead, icon: BookOpen, color: "text-emerald-400" },
    { label: "Novels Completed", value: levelData.novelsRead, icon: BookOpen, color: "text-amber-400" },
    { label: "Anime Completed", value: levelData.animeWatched, icon: Play, color: "text-rose-400" },
    { label: "Donghua Completed", value: levelData.donghuaWatched, icon: Play, color: "text-cyan-400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Track your progress and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">{user?.name || "User"}</CardTitle>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className={`${levelColor} text-white px-4 py-1 text-sm`}>
                  <Trophy className="w-4 h-4 mr-1" />
                  Level {levelData.level}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">{levelTitle}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="text-foreground font-medium">
                    {progress.current} / {progress.needed}
                  </span>
                </div>
                <Progress value={progress.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {Math.ceil(progress.needed - progress.current)} XP to Level {levelData.level + 1}
                </p>
              </div>

              <Separator />

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total XP</span>
                <span className="text-foreground font-bold flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  {levelData.xp.toLocaleString()}
                </span>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={logout}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Stats */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Activity Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-background/50 rounded-lg p-4 text-center border border-border/30"
                    >
                      <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* XP Rewards Info */}
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  XP Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">+{XP_REWARDS.readChapter}</Badge>
                    <span className="text-muted-foreground">per chapter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">+{XP_REWARDS.watchEpisode}</Badge>
                    <span className="text-muted-foreground">per episode</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">+{XP_REWARDS.finishComic}</Badge>
                    <span className="text-muted-foreground">finish comic</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">+{XP_REWARDS.finishNovel}</Badge>
                    <span className="text-muted-foreground">finish novel</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">+{XP_REWARDS.finishAnime}</Badge>
                    <span className="text-muted-foreground">finish anime</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary">+{XP_REWARDS.finishDonghua}</Badge>
                    <span className="text-muted-foreground">finish donghua</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-rose-500/10">
                      <Heart className="w-6 h-6 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{favorites.length}</p>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Clock className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{history.length}</p>
                      <p className="text-sm text-muted-foreground">History Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
