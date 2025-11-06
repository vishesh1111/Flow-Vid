const VideoCard = ({ video }) => {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail - Clean hover effect */}
      <div className="relative mb-3 overflow-hidden rounded-xl bg-white/5">
        <img
          src={video.thumbnail || 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video'}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          {video.duration || '10:30'}
        </div>
      </div>

      {/* Video Info - Clean spacing */}
      <div className="flex gap-3">
        {/* Channel Avatar - Subtle gradient */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
            {video.channelName ? video.channelName[0].toUpperCase() : 'C'}
          </div>
        </div>

        {/* Video Details - Clean typography */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium leading-tight mb-1.5 line-clamp-2 text-yt-spec-text-primary group-hover:text-white transition-colors">
            {video.title || 'Video Title'}
          </h3>
          <p className="text-xs text-yt-spec-text-secondary hover:text-yt-spec-text-primary cursor-pointer transition-colors mb-0.5">
            {video.channelName || 'Channel Name'}
          </p>
          <div className="flex items-center gap-1 text-xs text-yt-spec-text-secondary">
            <span>{video.views || '100K'} views</span>
            <span>•</span>
            <span>{video.uploadedAt || '2 days ago'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
