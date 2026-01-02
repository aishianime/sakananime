import { useState, useEffect, useCallback } from 'react';

const LEVEL_KEY = 'user-level-data';

export interface LevelData {
  xp: number;
  level: number;
  totalChaptersRead: number;
  totalEpisodesWatched: number;
  comicsRead: number;
  novelsRead: number;
  animeWatched: number;
  donghuaWatched: number;
}

const DEFAULT_LEVEL_DATA: LevelData = {
  xp: 0,
  level: 1,
  totalChaptersRead: 0,
  totalEpisodesWatched: 0,
  comicsRead: 0,
  novelsRead: 0,
  animeWatched: 0,
  donghuaWatched: 0,
};

// XP required for each level (exponential growth)
export const getXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Get level from total XP
export const getLevelFromXp = (xp: number): number => {
  let level = 1;
  let xpNeeded = getXpForLevel(level);
  let totalXpNeeded = xpNeeded;
  
  while (xp >= totalXpNeeded) {
    level++;
    xpNeeded = getXpForLevel(level);
    totalXpNeeded += xpNeeded;
  }
  
  return level;
};

// XP rewards for different actions
const XP_REWARDS = {
  readChapter: 10,
  watchEpisode: 15,
  finishComic: 50,
  finishNovel: 100,
  finishAnime: 75,
  finishDonghua: 75,
};

export const useLevel = () => {
  const [levelData, setLevelData] = useState<LevelData>(DEFAULT_LEVEL_DATA);

  // Load level data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LEVEL_KEY);
    if (saved) {
      try {
        setLevelData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse level data:', e);
      }
    }
  }, []);

  // Save level data to localStorage
  const saveLevelData = useCallback((data: LevelData) => {
    localStorage.setItem(LEVEL_KEY, JSON.stringify(data));
    setLevelData(data);
  }, []);

  // Add XP and update level
  const addXp = useCallback((amount: number, type: keyof typeof XP_REWARDS) => {
    setLevelData(prev => {
      const newXp = prev.xp + amount;
      const newLevel = getLevelFromXp(newXp);
      
      const updates: Partial<LevelData> = { xp: newXp, level: newLevel };
      
      // Track specific stats
      switch (type) {
        case 'readChapter':
          updates.totalChaptersRead = prev.totalChaptersRead + 1;
          break;
        case 'watchEpisode':
          updates.totalEpisodesWatched = prev.totalEpisodesWatched + 1;
          break;
        case 'finishComic':
          updates.comicsRead = prev.comicsRead + 1;
          break;
        case 'finishNovel':
          updates.novelsRead = prev.novelsRead + 1;
          break;
        case 'finishAnime':
          updates.animeWatched = prev.animeWatched + 1;
          break;
        case 'finishDonghua':
          updates.donghuaWatched = prev.donghuaWatched + 1;
          break;
      }
      
      const newData = { ...prev, ...updates };
      localStorage.setItem(LEVEL_KEY, JSON.stringify(newData));
      return newData;
    });
  }, []);

  // Convenience methods
  const onReadChapter = useCallback(() => addXp(XP_REWARDS.readChapter, 'readChapter'), [addXp]);
  const onWatchEpisode = useCallback(() => addXp(XP_REWARDS.watchEpisode, 'watchEpisode'), [addXp]);
  const onFinishComic = useCallback(() => addXp(XP_REWARDS.finishComic, 'finishComic'), [addXp]);
  const onFinishNovel = useCallback(() => addXp(XP_REWARDS.finishNovel, 'finishNovel'), [addXp]);
  const onFinishAnime = useCallback(() => addXp(XP_REWARDS.finishAnime, 'finishAnime'), [addXp]);
  const onFinishDonghua = useCallback(() => addXp(XP_REWARDS.finishDonghua, 'finishDonghua'), [addXp]);

  // Get progress to next level
  const getProgress = useCallback(() => {
    const currentLevelXp = levelData.level > 1 
      ? Array.from({ length: levelData.level - 1 }, (_, i) => getXpForLevel(i + 1)).reduce((a, b) => a + b, 0)
      : 0;
    const xpInCurrentLevel = levelData.xp - currentLevelXp;
    const xpNeededForNext = getXpForLevel(levelData.level);
    return {
      current: xpInCurrentLevel,
      needed: xpNeededForNext,
      percentage: Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100),
    };
  }, [levelData]);

  const resetLevel = useCallback(() => {
    localStorage.removeItem(LEVEL_KEY);
    setLevelData(DEFAULT_LEVEL_DATA);
  }, []);

  return {
    levelData,
    addXp,
    onReadChapter,
    onWatchEpisode,
    onFinishComic,
    onFinishNovel,
    onFinishAnime,
    onFinishDonghua,
    getProgress,
    resetLevel,
    XP_REWARDS,
  };
};
