import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch/${video.id}`);
  };

  return (
    <div className="cursor-pointer group" onClick={handleVideoClick}>
      {/* Video Thumbnail */}
      <div className="relative mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover rounded-xl bg-[#272727] group-hover:rounded-none transition-all duration-200"
          loading="lazy"
        />
        {/* Duration Badge */}
        <span className="absolute bottom-1 right-1 bg-black/90 text-white text-xs font-semibold px-1 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Video Info - YouTube Exact Layout */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0 pt-0.5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-semibold">
            {video.channelName ? video.channelName[0].toUpperCase() : 'C'}
          </div>
        </div>

        {/* Video Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium leading-tight mb-1 line-clamp-2 text-[#f1f1f1] group-hover:text-white">
            {video.title || 'Video Title'}
          </h3>
          <div className="text-xs leading-[18px] text-[#aaa]">
            <p className="hover:text-[#f1f1f1] cursor-pointer mb-1 font-normal">{video.channelName || 'Channel Name'}</p>
            <div className="flex items-center gap-1 font-normal">
              <span>{video.views || '100K'} views</span>
              <span>•</span>
              <span>{video.uploadedAt || '2 days ago'}</span>
            </div>
          </div>
        </div>

        {/* More Options - Shows on Hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-[#3f3f3f] rounded-full">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="12" cy="19" r="2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

