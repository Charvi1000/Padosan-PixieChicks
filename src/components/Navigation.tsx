import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Mic, Users, Heart, Shield, Star, Home, User, LogOut, Menu, X,
  MessageCircle, Calculator, Building2, PiggyBank, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  {
    id: 'enter-padosan',
    label: 'Enter Padosan',
    description: 'Find your perfect roommate match',
    path: '/enter-padosan',
    icon: Users,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'chat',
    label: 'Chat',
    description: 'Talk to your matches in real-time',
    path: '/chat',
    icon: MessageCircle,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'budget-splitwise',
    label: 'Budget Splitwise',
    description: 'Manage expenses and split bills',
    path: '/budget-splitwise',
    icon: Calculator,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'pg-suggestions',
    label: 'PG Suggestions',
    description: 'Find the perfect accommodation',
    path: '/pg-suggestions',
    icon: Building2,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'budget-options',
    label: 'Budget Options',
    description: 'Financial planning and optimization',
    path: '/budget-options',
    icon: PiggyBank,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'sos',
    label: 'SOS',
    description: 'Emergency and safety features',
    path: '/sos',
    icon: Shield,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'mutual-friends',
    label: 'Mutual Friends',
    description: 'Connect through shared connections',
    path: '/mutual-friends',
    icon: Heart,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'family-mode',
    label: 'Family Mode',
    description: 'Family approval and safety',
    path: '/family-mode',
    icon: Star,
    color: 'from-violet-500 to-purple-500'
  }
];

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Enhanced Toggle Button - Always Visible */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`${
            isHomePage
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200'
              : 'bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg hover:bg-white'
          } px-4 py-2 rounded-full`}
          size="sm"
        >
          {isSidebarOpen ? (
            <>
              <X className="h-4 w-4 mr-2" />
              {isHomePage && <span className="text-sm font-medium">Close Menu</span>}
            </>
          ) : (
            <>
              <Menu className="h-4 w-4 mr-2" />
              {isHomePage && <span className="text-sm font-medium">Open Menu</span>}
            </>
          )}
        </Button>
      </div>

      {/* Interactive Message for Homepage */}
      {isHomePage && !isSidebarOpen && (
        <div className="fixed top-16 left-4 z-40 animate-pulse">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <p className="text-sm text-gray-700 font-medium">
                Click the menu button to explore all features! 🚀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sliding Sidebar */}
      <div className={`hidden lg:block fixed top-0 left-0 h-full bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-xl z-40 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo and Brand - Removed from all pages */}

          {/* Scrollable Navigation Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <nav className="space-y-3 pb-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105'
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isActive(item.path)
                            ? 'bg-white/20'
                            : 'bg-gradient-to-r ' + item.color + ' text-white'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.label}</h3>
                          <p className={`text-xs ${
                            isActive(item.path) ? 'text-white/80' : 'text-muted-foreground'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </nav>
          </div>

          {/* Home Button - Fixed at Bottom */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* User Profile - Fixed on Right Side */}
      {isAuthenticated && (
        <div className="hidden lg:block fixed top-4 right-4 z-50">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-4 max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
            >
              <LogOut className="h-3 w-3 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        {/* Mobile Header */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg max-h-[70vh] overflow-y-auto">
            <div className="p-4 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r ' + item.color + ' text-white'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isActive(item.path)
                            ? 'bg-white/20'
                            : 'bg-gradient-to-r ' + item.color + ' text-white'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{item.label}</h3>
                          <p className={`text-xs ${
                            isActive(item.path) ? 'text-white/80' : 'text-muted-foreground'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}

              <div className="pt-3 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Padding for Desktop - Only when sidebar is open */}
      <div className={`hidden lg:block transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'lg:ml-80' : 'lg:ml-0'
      }`} />
    </>
  );
}; 