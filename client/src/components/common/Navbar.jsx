import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Heart, Bell, MessageCircle,
         User, ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector(state => state.auth);
  const { unreadCount } = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80
                    border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-500" />
            <span className="font-display text-xl font-bold
              bg-gradient-to-r from-primary-600 to-accent-500
              bg-clip-text text-transparent">
              UniKart
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2
                text-gray-400 h-4 w-4" />
              <input
                type="text" value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search textbooks, electronics, furniture..."
                className="w-full pl-10 pr-4 py-2 rounded-full border
                  border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-800
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                  text-sm transition-all"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors text-gray-600 dark:text-gray-300">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <>
                <Link to="/wishlist"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors text-gray-600 dark:text-gray-300">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link to="/chat"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors text-gray-600 dark:text-gray-300">
                  <MessageCircle className="h-5 w-5" />
                </Link>
                <Link to="/notifications" className="relative p-2 rounded-full
                  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  text-gray-600 dark:text-gray-300">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500
                      text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full
                    bg-primary-500 text-white text-sm font-medium
                    hover:bg-primary-600 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block">Dashboard</span>
                </Link>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login"
                  className="px-4 py-1.5 text-sm font-medium text-primary-600
                    dark:text-primary-400 hover:underline">
                  Login
                </Link>
                <Link to="/register"
                  className="px-4 py-1.5 bg-primary-500 text-white text-sm
                    font-medium rounded-full hover:bg-primary-600 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}