import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoAPI, likeAPI, commentAPI, subscriptionAPI } from '../services/api';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetchVideoData();
    fetchComments();
  }, [videoId]);

  useEffect(() => {
    // Update page title when video loads
    if (video) {
      document.title = `${video.title} - YouTube`;
    }
    return () => {
      document.title = 'YouTube';
    };
  }, [video]);

  const fetchVideoData = async () => {
    try {
      const response = await videoAPI.getVideoById(videoId);
      setVideo(response.data.data);
      setLikeCount(response.data.data.likes || 0);
      setIsLiked(response.data.data.isLiked || false);
      setIsSubscribed(response.data.data.isSubscribed || false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching video:', error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentAPI.getVideoComments(videoId);
      setComments(response.data.data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      await likeAPI.toggleVideoLike(videoId);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleSubscribe = async () => {
    try {
      await subscriptionAPI.toggleSubscription(video.owner._id);
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error('Error toggling subscription:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      const response = await commentAPI.addComment(videoId, newComment);
      setComments([response.data.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentAPI.deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCommentLike = async (commentId, isLiked) => {
    try {
      await likeAPI.toggleCommentLike(commentId);
      setComments(comments.map(c => 
        c._id === commentId 
          ? { ...c, likes: isLiked ? c.likes - 1 : c.likes + 1, isLiked: !isLiked }
          : c
      ));
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-xl">Video not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-14">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex gap-6 px-6 py-6">
          {/* Main Video Section */}
          <div className="flex-1 max-w-[1280px]">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden mb-3">
              <video
                className="w-full aspect-video"
                controls
                autoPlay
                src={video.videoFile}
                poster={video.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Title */}
            <h1 className="text-xl font-semibold text-white mb-2 leading-7">
              {video.title}
            </h1>

            {/* Video Title */}
            <h1 className="text-xl font-semibold text-white mb-2 leading-7">
              {video.title}
            </h1>

            {/* Video Info Bar */}
            <div className="flex items-center justify-between mb-3">
              {/* Channel Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">
                    {video.owner?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="mr-6">
                  <h3 className="text-base font-medium text-white leading-5">{video.owner?.fullName || video.owner?.username}</h3>
                  <p className="text-xs text-[#aaa] leading-4 mt-0.5">1.2M subscribers</p>
                </div>
                <button
                  onClick={handleSubscribe}
                  className={`px-4 h-9 rounded-full text-sm font-medium transition-all ${
                    isSubscribed
                      ? 'bg-[#272727] text-white hover:bg-[#3f3f3f]'
                      : 'bg-white text-black hover:bg-[#d9d9d9]'
                  }`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Like/Dislike Buttons */}
                <div className="flex items-center bg-[#272727] rounded-full h-9 overflow-hidden">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 h-full hover:bg-[#3f3f3f] transition-colors border-r border-[#3f3f3f] ${
                      isLiked ? 'text-white' : 'text-[#f1f1f1]'
                    }`}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span className="text-sm font-medium">{likeCount > 0 ? likeCount.toLocaleString() : 0}</span>
                  </button>
                  <button className="flex items-center px-4 h-full text-[#f1f1f1] hover:bg-[#3f3f3f] transition-colors">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                    </svg>
                  </button>
                </div>

                {/* Share Button */}
                <button className="flex items-center gap-2 px-4 h-9 bg-[#272727] rounded-full text-white hover:bg-[#3f3f3f] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  <span className="text-sm font-medium">Share</span>
                </button>

                {/* More Options */}
                <button className="flex items-center justify-center w-9 h-9 bg-[#272727] rounded-full text-white hover:bg-[#3f3f3f] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Description */}
            <div className="bg-[#272727] hover:bg-[#3f3f3f] rounded-xl p-3 mb-6 cursor-pointer transition-colors">
              <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <span>{video.views?.toLocaleString() || '0'} views</span>
                <span>•</span>
                <span>{new Date(video.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <p className="text-sm text-white leading-5 whitespace-pre-wrap line-clamp-2">
                {video.description}
              </p>
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <div className="flex items-center gap-8 mb-6">
                <h2 className="text-xl font-medium text-white">
                  {comments.length} Comments
                </h2>
                <button className="flex items-center gap-2 text-sm font-medium text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="15" y2="18"/>
                  </svg>
                  Sort by
                </button>
              </div>

              {/* Add Comment */}
              <form onSubmit={handleAddComment} className="mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">Y</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full bg-transparent border-b border-[#303030] pb-2 text-sm text-white placeholder-[#717171] focus:border-white focus:outline-none transition-colors"
                    />
                    {newComment && (
                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => setNewComment('')}
                          className="px-4 py-2 text-sm font-medium text-[#aaa] hover:bg-[#272727] rounded-full transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!newComment.trim() || commentLoading}
                          className="px-4 py-2 text-sm font-medium bg-[#3ea6ff] text-black rounded-full hover:bg-[#4ea6ff] disabled:bg-[#263850] disabled:text-[#717171] disabled:cursor-not-allowed transition-colors"
                        >
                          {commentLoading ? 'Posting...' : 'Comment'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">
                        {comment.owner?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          @{comment.owner?.username || 'anonymous'}
                        </span>
                        <span className="text-xs text-[#aaa]">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-sm text-white mb-2 leading-5">{comment.content}</p>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleCommentLike(comment._id, comment.isLiked)}
                          className={`flex items-center gap-2 group ${
                            comment.isLiked ? 'text-white' : 'text-[#aaa]'
                          } hover:text-white transition-colors`}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                          </svg>
                          {comment.likes > 0 && (
                            <span className="text-xs font-medium">{comment.likes}</span>
                          )}
                        </button>
                        <button className="flex items-center gap-2 text-[#aaa] hover:text-white transition-colors group">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                          </svg>
                        </button>
                        <button className="text-xs font-medium text-[#aaa] hover:text-white transition-colors px-3 py-1.5 hover:bg-[#272727] rounded-full">
                          Reply
                        </button>
                        {comment.owner?._id === localStorage.getItem('userId') && (
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-xs font-medium text-[#aaa] hover:text-red-500 transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="w-[400px] flex-shrink-0">
            <div className="sticky top-[72px]">
              {/* Filter Chips */}
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
                <button className="px-3 py-1.5 bg-white text-black rounded-lg text-sm font-medium whitespace-nowrap">
                  All
                </button>
                <button className="px-3 py-1.5 bg-[#272727] text-white hover:bg-[#3f3f3f] rounded-lg text-sm font-medium whitespace-nowrap transition-colors">
                  From {video.owner?.username}
                </button>
                <button className="px-3 py-1.5 bg-[#272727] text-white hover:bg-[#3f3f3f] rounded-lg text-sm font-medium whitespace-nowrap transition-colors">
                  Related
                </button>
              </div>

              {/* Related Videos List */}
              <div className="space-y-2">
                <p className="text-sm text-[#aaa] px-2">No related videos available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
