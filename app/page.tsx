"use client";

import { useState, useEffect, useMemo } from 'react';
import { Search, Copy, Star, Clock, TrendingUp, Monitor, Smartphone, Tablet, Keyboard, Zap, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

interface Shortcut {
  id: string;
  name: string;
  description: string;
  windows?: string;
  mac?: string;
  linux?: string;
  category: string;
  application: string;
  tags: string[];
  popularity: number;
}

const shortcuts: Shortcut[] = [
  // Essential System Shortcuts
  {
    id: '1',
    name: 'Copy',
    description: 'Copy selected text or item to clipboard',
    windows: 'Ctrl + C',
    mac: 'Cmd + C',
    linux: 'Ctrl + C',
    category: 'System',
    application: 'Universal',
    tags: ['copy', 'clipboard', 'essential'],
    popularity: 100
  },
  {
    id: '2',
    name: 'Paste',
    description: 'Paste from clipboard',
    windows: 'Ctrl + V',
    mac: 'Cmd + V',
    linux: 'Ctrl + V',
    category: 'System',
    application: 'Universal',
    tags: ['paste', 'clipboard', 'essential'],
    popularity: 100
  },
  {
    id: '3',
    name: 'Cut',
    description: 'Cut selected text or item to clipboard',
    windows: 'Ctrl + X',
    mac: 'Cmd + X',
    linux: 'Ctrl + X',
    category: 'System',
    application: 'Universal',
    tags: ['cut', 'clipboard', 'essential'],
    popularity: 95
  },
  {
    id: '4',
    name: 'Undo',
    description: 'Undo the last action',
    windows: 'Ctrl + Z',
    mac: 'Cmd + Z',
    linux: 'Ctrl + Z',
    category: 'System',
    application: 'Universal',
    tags: ['undo', 'essential'],
    popularity: 95
  },
  {
    id: '5',
    name: 'Redo',
    description: 'Redo the last undone action',
    windows: 'Ctrl + Y',
    mac: 'Cmd + Shift + Z',
    linux: 'Ctrl + Y',
    category: 'System',
    application: 'Universal',
    tags: ['redo', 'essential'],
    popularity: 85
  },
  {
    id: '6',
    name: 'Select All',
    description: 'Select all text or items',
    windows: 'Ctrl + A',
    mac: 'Cmd + A',
    linux: 'Ctrl + A',
    category: 'System',
    application: 'Universal',
    tags: ['select', 'all', 'essential'],
    popularity: 90
  },
  {
    id: '7',
    name: 'Save',
    description: 'Save current document or file',
    windows: 'Ctrl + S',
    mac: 'Cmd + S',
    linux: 'Ctrl + S',
    category: 'System',
    application: 'Universal',
    tags: ['save', 'file', 'essential'],
    popularity: 98
  },
  {
    id: '8',
    name: 'Find',
    description: 'Open search/find dialog',
    windows: 'Ctrl + F',
    mac: 'Cmd + F',
    linux: 'Ctrl + F',
    category: 'System',
    application: 'Universal',
    tags: ['find', 'search', 'essential'],
    popularity: 90
  },

  // Browser Shortcuts
  {
    id: '9',
    name: 'New Tab',
    description: 'Open a new browser tab',
    windows: 'Ctrl + T',
    mac: 'Cmd + T',
    linux: 'Ctrl + T',
    category: 'Browser',
    application: 'Chrome/Firefox/Safari',
    tags: ['tab', 'new', 'browser'],
    popularity: 95
  },
  {
    id: '10',
    name: 'Close Tab',
    description: 'Close current browser tab',
    windows: 'Ctrl + W',
    mac: 'Cmd + W',
    linux: 'Ctrl + W',
    category: 'Browser',
    application: 'Chrome/Firefox/Safari',
    tags: ['tab', 'close', 'browser'],
    popularity: 90
  },
  {
    id: '11',
    name: 'Reopen Closed Tab',
    description: 'Reopen the last closed tab',
    windows: 'Ctrl + Shift + T',
    mac: 'Cmd + Shift + T',
    linux: 'Ctrl + Shift + T',
    category: 'Browser',
    application: 'Chrome/Firefox/Safari',
    tags: ['tab', 'reopen', 'browser'],
    popularity: 75
  },
  {
    id: '12',
    name: 'Private Window',
    description: 'Open private/incognito browsing window',
    windows: 'Ctrl + Shift + N',
    mac: 'Cmd + Shift + N',
    linux: 'Ctrl + Shift + N',
    category: 'Browser',
    application: 'Chrome/Firefox/Safari',
    tags: ['private', 'incognito', 'browser'],
    popularity: 70
  },
  {
    id: '13',
    name: 'Refresh Page',
    description: 'Reload current web page',
    windows: 'F5',
    mac: 'Cmd + R',
    linux: 'F5',
    category: 'Browser',
    application: 'Chrome/Firefox/Safari',
    tags: ['refresh', 'reload', 'browser'],
    popularity: 85
  },
  {
    id: '14',
    name: 'Hard Refresh',
    description: 'Reload page ignoring cache',
    windows: 'Ctrl + F5',
    mac: 'Cmd + Shift + R',
    linux: 'Ctrl + F5',
    category: 'Browser',
    application: 'Chrome/Firefox/Safari',
    tags: ['refresh', 'cache', 'browser'],
    popularity: 60
  },

  // VS Code Shortcuts
  {
    id: '15',
    name: 'Command Palette',
    description: 'Open VS Code command palette',
    windows: 'Ctrl + Shift + P',
    mac: 'Cmd + Shift + P',
    linux: 'Ctrl + Shift + P',
    category: 'Development',
    application: 'VS Code',
    tags: ['command', 'palette', 'vscode'],
    popularity: 95
  },
  {
    id: '16',
    name: 'Quick Open',
    description: 'Quickly open file by name',
    windows: 'Ctrl + P',
    mac: 'Cmd + P',
    linux: 'Ctrl + P',
    category: 'Development',
    application: 'VS Code',
    tags: ['file', 'open', 'vscode'],
    popularity: 90
  },
  {
    id: '17',
    name: 'Toggle Terminal',
    description: 'Show/hide integrated terminal',
    windows: 'Ctrl + `',
    mac: 'Cmd + `',
    linux: 'Ctrl + `',
    category: 'Development',
    application: 'VS Code',
    tags: ['terminal', 'toggle', 'vscode'],
    popularity: 85
  },
  {
    id: '18',
    name: 'Format Document',
    description: 'Auto-format the entire document',
    windows: 'Shift + Alt + F',
    mac: 'Shift + Option + F',
    linux: 'Shift + Alt + F',
    category: 'Development',
    application: 'VS Code',
    tags: ['format', 'document', 'vscode'],
    popularity: 80
  },
  {
    id: '19',
    name: 'Multi-Cursor',
    description: 'Add cursor at next occurrence',
    windows: 'Ctrl + D',
    mac: 'Cmd + D',
    linux: 'Ctrl + D',
    category: 'Development',
    application: 'VS Code',
    tags: ['cursor', 'select', 'vscode'],
    popularity: 75
  },

  // Window Management
  {
    id: '20',
    name: 'Switch Apps',
    description: 'Switch between open applications',
    windows: 'Alt + Tab',
    mac: 'Cmd + Tab',
    linux: 'Alt + Tab',
    category: 'Window Management',
    application: 'System',
    tags: ['switch', 'app', 'window'],
    popularity: 95
  },
  {
    id: '21',
    name: 'Minimize Window',
    description: 'Minimize current window',
    windows: 'Windows + Down',
    mac: 'Cmd + M',
    linux: 'Alt + F9',
    category: 'Window Management',
    application: 'System',
    tags: ['minimize', 'window'],
    popularity: 70
  },
  {
    id: '22',
    name: 'Maximize Window',
    description: 'Maximize current window',
    windows: 'Windows + Up',
    mac: 'Cmd + Ctrl + F',
    linux: 'Alt + F10',
    category: 'Window Management',
    application: 'System',
    tags: ['maximize', 'window'],
    popularity: 70
  },
  {
    id: '23',
    name: 'Split Screen Left',
    description: 'Snap window to left half of screen',
    windows: 'Windows + Left',
    mac: 'Cmd + Left',
    linux: 'Super + Left',
    category: 'Window Management',
    application: 'System',
    tags: ['split', 'window', 'left'],
    popularity: 65
  },
  {
    id: '24',
    name: 'Split Screen Right',
    description: 'Snap window to right half of screen',
    windows: 'Windows + Right',
    mac: 'Cmd + Right',
    linux: 'Super + Right',
    category: 'Window Management',
    application: 'System',
    tags: ['split', 'window', 'right'],
    popularity: 65
  },

  // Screenshot Shortcuts
  {
    id: '25',
    name: 'Full Screenshot',
    description: 'Capture entire screen',
    windows: 'Windows + Print Screen',
    mac: 'Cmd + Shift + 3',
    linux: 'Print Screen',
    category: 'Screenshot',
    application: 'System',
    tags: ['screenshot', 'capture', 'full'],
    popularity: 80
  },
  {
    id: '26',
    name: 'Area Screenshot',
    description: 'Capture selected area',
    windows: 'Windows + Shift + S',
    mac: 'Cmd + Shift + 4',
    linux: 'Shift + Print Screen',
    category: 'Screenshot',
    application: 'System',
    tags: ['screenshot', 'capture', 'area'],
    popularity: 85
  }
];

const categories = ['All', 'System', 'Browser', 'Development', 'Window Management', 'Screenshot'];
const platforms = ['all', 'windows', 'mac', 'linux'] as const;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState<typeof platforms[number]>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Load saved data on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('shortcuts-favorites');
      const savedRecent = localStorage.getItem('shortcuts-recent');
      
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch (error) {
      console.warn('Failed to load saved data:', error);
    }
  }, []);

  // Memoized filtered shortcuts for better performance
  const filteredShortcuts = useMemo(() => {
    let filtered = shortcuts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(shortcut => shortcut.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(shortcut =>
        shortcut.name.toLowerCase().includes(searchLower) ||
        shortcut.description.toLowerCase().includes(searchLower) ||
        shortcut.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        shortcut.application.toLowerCase().includes(searchLower)
      );
    }

    return filtered.sort((a, b) => b.popularity - a.popularity);
  }, [searchTerm, selectedCategory]);

  const copyToClipboard = async (shortcut: Shortcut) => {
    try {
      let textToCopy = '';
      
      switch (selectedPlatform) {
        case 'windows':
          textToCopy = shortcut.windows || '';
          break;
        case 'mac':
          textToCopy = shortcut.mac || '';
          break;
        case 'linux':
          textToCopy = shortcut.linux || '';
          break;
        default:
          textToCopy = shortcut.windows || shortcut.mac || shortcut.linux || '';
      }

      if (!textToCopy) {
        toast.error('Shortcut not available for selected platform');
        return;
      }

      await navigator.clipboard.writeText(textToCopy);
      toast.success(`Copied "${textToCopy}" to clipboard!`);
      
      // Add to recently viewed
      const updated = [shortcut.id, ...recentlyViewed.filter(id => id !== shortcut.id)].slice(0, 10);
      setRecentlyViewed(updated);
      localStorage.setItem('shortcuts-recent', JSON.stringify(updated));
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const toggleFavorite = (shortcutId: string) => {
    try {
      const updated = favorites.includes(shortcutId)
        ? favorites.filter(id => id !== shortcutId)
        : [...favorites, shortcutId];
      
      setFavorites(updated);
      localStorage.setItem('shortcuts-favorites', JSON.stringify(updated));
      
      toast.success(
        favorites.includes(shortcutId) 
          ? 'Removed from favorites' 
          : 'Added to favorites'
      );
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const getShortcutForPlatform = (shortcut: Shortcut) => {
    switch (selectedPlatform) {
      case 'windows':
        return shortcut.windows;
      case 'mac':
        return shortcut.mac;
      case 'linux':
        return shortcut.linux;
      default:
        return shortcut.windows || shortcut.mac || shortcut.linux;
    }
  };

  const popularShortcuts = useMemo(() => 
    shortcuts.sort((a, b) => b.popularity - a.popularity).slice(0, 8)
  , []);

  const favoriteShortcuts = useMemo(() => 
    shortcuts.filter(s => favorites.includes(s.id))
  , [favorites]);

  const recentShortcuts = useMemo(() => 
    shortcuts
      .filter(s => recentlyViewed.includes(s.id))
      .sort((a, b) => recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id))
      .slice(0, 8)
  , [recentlyViewed]);

  const ShortcutCard = ({ shortcut }: { shortcut: Shortcut }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              {shortcut.name}
            </CardTitle>
            <CardDescription className="text-sm mt-1 text-slate-600 dark:text-slate-400">
              {shortcut.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(shortcut.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={favorites.includes(shortcut.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star 
              className={`w-4 h-4 ${
                favorites.includes(shortcut.id) 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-slate-400'
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {shortcut.application}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {shortcut.category}
            </Badge>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 font-mono text-center">
            <div className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
              {getShortcutForPlatform(shortcut) || 'Not available'}
            </div>
            <Button
              onClick={() => copyToClipboard(shortcut)}
              size="sm"
              variant="outline"
              className="w-full"
              disabled={!getShortcutForPlatform(shortcut)}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Shortcut
            </Button>
          </div>

          {shortcut.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {shortcut.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Shortcuts Hub
            </h1>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Master keyboard shortcuts to boost your productivity. Find, learn, and copy shortcuts for all your favorite applications.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search shortcuts, apps, or descriptions..."
              className="pl-12 h-14 text-lg shadow-lg border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Platform Selection */}
          <div className="flex justify-center items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Platform:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform(platform)}
                  className="capitalize"
                >
                  {platform === 'all' ? (
                    <>All Platforms</>
                  ) : platform === 'windows' ? (
                    <>Windows</>
                  ) : platform === 'mac' ? (
                    <>macOS</>
                  ) : (
                    <>Linux</>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="text-sm">
              All ({filteredShortcuts.length})
            </TabsTrigger>
            <TabsTrigger value="popular" className="text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              Popular
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm">
              <Star className="w-4 h-4 mr-1" />
              Favorites ({favoriteShortcuts.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredShortcuts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredShortcuts.map((shortcut) => (
                  <ShortcutCard key={shortcut.id} shortcut={shortcut} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No shortcuts found
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularShortcuts.map((shortcut) => (
                <ShortcutCard key={shortcut.id} shortcut={shortcut} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteShortcuts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteShortcuts.map((shortcut) => (
                  <ShortcutCard key={shortcut.id} shortcut={shortcut} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Star className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No favorites yet
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Click the star icon on any shortcut to add it to favorites
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            {recentShortcuts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recentShortcuts.map((shortcut) => (
                  <ShortcutCard key={shortcut.id} shortcut={shortcut} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No recent shortcuts
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Copy a shortcut to add it to your recent list
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{shortcuts.length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Shortcuts</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{categories.length - 1}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Categories</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{platforms.length - 1}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Platforms</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{favoriteShortcuts.length}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Your Favorites</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-600 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50 pt-8">
          <p className="mb-2 flex items-center justify-center gap-2">
            Made with <span className="text-red-500">❤️</span> for productivity enthusiasts
          </p>
          <p className="text-sm">
            Boost your workflow with keyboard shortcuts • Save time • Work smarter
          </p>
        </footer>
      </div>
      
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}