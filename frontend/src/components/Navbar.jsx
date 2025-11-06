import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-yt-black/95 backdrop-blur-md border-b border-white/5 z-50">
      <div className="flex items-center justify-between h-14 px-4 max-w-[2000px] mx-auto">
        {/* Logo - Clean and Minimal */}
        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity flex-shrink-0">
          <svg className="w-7 h-7 text-yt-red" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
          </svg>
          <span className="text-lg font-bold tracking-tight">YouTube</span>
        </Link>

        {/* Search Bar - Ultra Clean */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex items-center gap-0">
            <div className="flex-1 flex items-center bg-transparent border border-white/10 rounded-full overflow-hidden hover:border-white/20 focus-within:border-yt-blue transition-colors">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-5 py-2 text-sm text-yt-spec-text-primary placeholder-yt-spec-text-secondary/60 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 border-l border-white/10 hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-yt-spec-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* User Actions - Minimal Icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {user ? (
            <>
              <button 
                className="p-2 hover:bg-white/5 rounded-full transition-colors" 
                aria-label="Create"
                title="Create"
              >
                <svg className="w-5 h-5 text-yt-spec-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button 
                className="p-2 hover:bg-white/5 rounded-full transition-colors relative" 
                aria-label="Notifications"
                title="Notifications"
              >
                <svg className="w-5 h-5 text-yt-spec-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center gap-3 ml-1 pl-3 border-l border-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 hover:ring-white/20 transition-all">
                  {user.userName ? user.userName[0].toUpperCase() : 'U'}
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-yt-blue hover:text-blue-400 font-medium transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-1.5 border border-white/20 hover:bg-white/5 rounded-full transition-all text-sm font-medium text-yt-blue"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
