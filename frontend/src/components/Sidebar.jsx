import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-14 w-60 h-[calc(100vh-56px)] bg-[#0f0f0f] overflow-y-auto border-r border-[#303030] scrollbar-thin">
      {/* Main Navigation */}
      <div className="py-3 border-b border-[#303030]">
        <Link to="/" className="flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"/>
          </svg>
          <span className="text-sm font-medium">Home</span>
        </Link>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"/>
          </svg>
          <span className="text-sm font-medium">Shorts</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"/>
          </svg>
          <span className="text-sm font-medium">Subscriptions</span>
        </button>
      </div>

      {/* You Section */}
      <div className="py-3 border-b border-[#303030]">
        <div className="px-6 py-2 text-base font-medium">You</div>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <span className="text-sm font-medium">Your channel</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
          </svg>
          <span className="text-sm font-medium">History</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 9.35 15 12l-5 2.65zM12 6a9.77 9.77 0 0 1 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5A9.77 9.77 0 0 1 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4z"/>
          </svg>
          <span className="text-sm font-medium">Watch Later</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3V20zM19.98 13.17l-1.34 6C18.54 19.65 18.03 20 17.43 20H8v-8.61l5.6-6.06C13.79 5.12 14.08 5 14.38 5c.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94L13.18 12h1.35h4.23c.41 0 .8.17 1.03.46.12.15.25.32.18.57l-.01.02z"/>
          </svg>
          <span className="text-sm font-medium">Liked videos</span>
        </button>
      </div>

      {/* Subscriptions */}
      <div className="py-3 border-b border-[#303030]">
        <div className="px-6 py-2 text-base font-medium">Subscriptions</div>
        
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
              <span className="text-xs font-bold">C{i}</span>
            </div>
            <span className="text-sm font-medium truncate">Channel {i}</span>
          </button>
        ))}
      </div>

      {/* Explore */}
      <div className="py-3 border-b border-[#303030]">
        <div className="px-6 py-2 text-base font-medium">Explore</div>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM17.45 11.27c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
          <span className="text-sm font-medium">Trending</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z"/>
          </svg>
          <span className="text-sm font-medium">Music</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.03-4.35-4.5 2.53-.49.27-.49-.27-4.5-2.53L3 7.39v6.43l8.98 5.04 8.98-5.04V7.39l-3.99-2.24m0-1.15 4.99 2.8v7.6L11.98 20 2 14.4V6.8L6.99 4l4.99 2.8L16.97 4z"/>
          </svg>
          <span className="text-sm font-medium">Gaming</span>
        </button>
        
        <button className="w-full flex items-center gap-6 px-6 py-2.5 hover:bg-[#272727] transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-sm font-medium">Sports</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-6 text-xs text-[#aaa]">
        <div className="space-y-1 mb-4">
          <a href="#" className="hover:text-white">About</a>
          <span className="mx-1">•</span>
          <a href="#" className="hover:text-white">Press</a>
          <span className="mx-1">•</span>
          <a href="#" className="hover:text-white">Copyright</a>
        </div>
        <div className="space-y-1 mb-4">
          <a href="#" className="hover:text-white">Contact us</a>
          <span className="mx-1">•</span>
          <a href="#" className="hover:text-white">Creators</a>
        </div>
        <div className="space-y-1 mb-4">
          <a href="#" className="hover:text-white">Advertise</a>
          <span className="mx-1">•</span>
          <a href="#" className="hover:text-white">Developers</a>
        </div>
        <div className="space-y-1 mb-4">
          <a href="#" className="hover:text-white">Terms</a>
          <span className="mx-1">•</span>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
        <p className="text-[#717171] mt-4">© 2024 YouTube Clone</p>
      </div>
    </aside>
  );
};

export default Sidebar;
