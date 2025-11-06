import VideoCard from '../components/VideoCard';

const Home = () => {
  // Mock video data with real YouTube thumbnails
  const videos = [
    {
      id: 1,
      title: 'Building a Full Stack MERN Application | MongoDB, Express, React, Node.js',
      channelName: 'Traversy Media',
      views: '1.2M',
      uploadedAt: '3 months ago',
      duration: '1:24:35',
      thumbnail: 'https://i.ytimg.com/vi/fnpmR6Q5lEc/hq720.jpg'
    },
    {
      id: 2,
      title: 'React Tutorial for Beginners',
      channelName: 'Programming with Mosh',
      views: '3.8M',
      uploadedAt: '1 year ago',
      duration: '1:18:23',
      thumbnail: 'https://i.ytimg.com/vi/SqcY0GlETPk/hq720.jpg'
    },
    {
      id: 3,
      title: 'JavaScript Crash Course For Beginners',
      channelName: 'Traversy Media',
      views: '5.2M',
      uploadedAt: '2 years ago',
      duration: '1:40:27',
      thumbnail: 'https://i.ytimg.com/vi/hdI2bqOjy3c/hq720.jpg'
    },
    {
      id: 4,
      title: 'Node.js Tutorial for Beginners: Learn Node in 1 Hour',
      channelName: 'Programming with Mosh',
      views: '2.1M',
      uploadedAt: '4 years ago',
      duration: '1:12:18',
      thumbnail: 'https://i.ytimg.com/vi/TlB_eWDSMt4/hq720.jpg'
    },
    {
      id: 5,
      title: 'Tailwind CSS Full Course for Beginners | Complete All-in-One Tutorial',
      channelName: 'Dave Gray',
      views: '892K',
      uploadedAt: '1 year ago',
      duration: '2:43:18',
      thumbnail: 'https://i.ytimg.com/vi/lCxcTsOHrjo/hq720.jpg'
    },
    {
      id: 6,
      title: 'MongoDB Crash Course',
      channelName: 'Web Dev Simplified',
      views: '1.5M',
      uploadedAt: '3 years ago',
      duration: '30:44',
      thumbnail: 'https://i.ytimg.com/vi/ofme2o29ngU/hq720.jpg'
    },
    {
      id: 7,
      title: 'Git and GitHub for Beginners - Crash Course',
      channelName: 'freeCodeCamp.org',
      views: '4.3M',
      uploadedAt: '2 years ago',
      duration: '1:08:53',
      thumbnail: 'https://i.ytimg.com/vi/RGOj5yH7evk/hq720.jpg'
    },
    {
      id: 8,
      title: 'React Hooks Course - All React Hooks Explained',
      channelName: 'Codevolution',
      views: '687K',
      uploadedAt: '1 year ago',
      duration: '42:50',
      thumbnail: 'https://i.ytimg.com/vi/cF2lQ_gZeA8/hq720.jpg'
    },
    {
      id: 9,
      title: 'TypeScript Tutorial for Beginners',
      channelName: 'Programming with Mosh',
      views: '1.9M',
      uploadedAt: '1 year ago',
      duration: '1:11:25',
      thumbnail: 'https://i.ytimg.com/vi/d56mG7DezGs/hq720.jpg'
    },
    {
      id: 10,
      title: 'RESTful APIs in 100 Seconds',
      channelName: 'Fireship',
      views: '2.8M',
      uploadedAt: '2 years ago',
      duration: '2:38',
      thumbnail: 'https://i.ytimg.com/vi/-MTSQjw5DrM/hq720.jpg'
    },
    {
      id: 11,
      title: 'Next.js 14 Full Course 2024',
      channelName: 'JavaScript Mastery',
      views: '956K',
      uploadedAt: '6 months ago',
      duration: '3:42:15',
      thumbnail: 'https://i.ytimg.com/vi/wm5gMKuwSYk/hq720.jpg'
    },
    {
      id: 12,
      title: 'Docker Tutorial for Beginners',
      channelName: 'TechWorld with Nana',
      views: '3.4M',
      uploadedAt: '3 years ago',
      duration: '3:10:23',
      thumbnail: 'https://i.ytimg.com/vi/3c-iBn73dDE/hq720.jpg'
    },
    {
      id: 13,
      title: 'CSS Grid Layout Crash Course',
      channelName: 'Traversy Media',
      views: '1.1M',
      uploadedAt: '5 years ago',
      duration: '26:54',
      thumbnail: 'https://i.ytimg.com/vi/jV8B24rSN5o/hq720.jpg'
    },
    {
      id: 14,
      title: 'Python for Beginners - Learn Python in 1 Hour',
      channelName: 'Programming with Mosh',
      views: '8.9M',
      uploadedAt: '4 years ago',
      duration: '1:00:05',
      thumbnail: 'https://i.ytimg.com/vi/kqtD5dpn9C8/hq720.jpg'
    },
    {
      id: 15,
      title: 'JWT Authentication Tutorial',
      channelName: 'Web Dev Simplified',
      views: '1.3M',
      uploadedAt: '3 years ago',
      duration: '23:19',
      thumbnail: 'https://i.ytimg.com/vi/mbsmsi7l3r4/hq720.jpg'
    },
    {
      id: 16,
      title: 'SQL Tutorial - Full Database Course for Beginners',
      channelName: 'freeCodeCamp.org',
      views: '7.2M',
      uploadedAt: '4 years ago',
      duration: '4:20:07',
      thumbnail: 'https://i.ytimg.com/vi/HXV3zeQKqGY/hq720.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-14">
      {/* YouTube Category Chips - Sticky */}
      <div className="sticky top-14 z-40 bg-[#0f0f0f] border-b border-[#303030]">
        <div className="px-6 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {['All', 'Music', 'Gaming', 'Live', 'Sports', 'News', 'Learning', 'Fashion', 'Podcasts', 'Recently uploaded', 'Watched', 'New to you'].map((category, index) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-white text-black hover:bg-[#f1f1f1]'
                    : 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Video Grid - Full Width */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-10">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
