import VideoCard from '../components/VideoCard';

const Home = () => {
  // Mock video data - will be replaced with API data
  const videos = [
    {
      id: 1,
      title: 'Building a Full Stack YouTube Clone with MERN Stack',
      channelName: 'Code Master',
      views: '125K',
      uploadedAt: '3 days ago',
      duration: '45:20',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+1'
    },
    {
      id: 2,
      title: 'React Router Tutorial - Complete Guide',
      channelName: 'Dev Academy',
      views: '89K',
      uploadedAt: '1 week ago',
      duration: '32:15',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+2'
    },
    {
      id: 3,
      title: 'MongoDB Crash Course for Beginners',
      channelName: 'Tech Tutorials',
      views: '210K',
      uploadedAt: '2 weeks ago',
      duration: '28:45',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+3'
    },
    {
      id: 4,
      title: 'JWT Authentication Explained',
      channelName: 'Security First',
      views: '156K',
      uploadedAt: '5 days ago',
      duration: '18:30',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+4'
    },
    {
      id: 5,
      title: 'Tailwind CSS - Modern UI Design',
      channelName: 'UI Masters',
      views: '342K',
      uploadedAt: '1 month ago',
      duration: '52:10',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+5'
    },
    {
      id: 6,
      title: 'Node.js Express REST API Tutorial',
      channelName: 'Backend Dev',
      views: '198K',
      uploadedAt: '3 weeks ago',
      duration: '38:25',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+6'
    },
    {
      id: 7,
      title: 'Git and GitHub Complete Course',
      channelName: 'Version Control Pro',
      views: '445K',
      uploadedAt: '2 months ago',
      duration: '1:15:30',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+7'
    },
    {
      id: 8,
      title: 'React Hooks Deep Dive',
      channelName: 'React Expert',
      views: '267K',
      uploadedAt: '1 week ago',
      duration: '42:50',
      thumbnail: 'https://via.placeholder.com/320x180/1a1a1a/ffffff?text=Video+8'
    }
  ];

  return (
    <div className="min-h-screen bg-yt-black pt-14">
      {/* Clean Category Tabs */}
      <div className="sticky top-14 z-40 bg-yt-black/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 py-3">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {['All', 'Music', 'Gaming', 'Live', 'Sports', 'News', 'Learning', 'Fashion', 'Podcasts'].map((category) => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                  category === 'All'
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-white/10 text-yt-spec-text-primary hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Video Grid */}
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
