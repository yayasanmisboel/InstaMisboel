import { useState } from 'react';
import { usePostContext, Post as PostType } from '../context/PostContext';
import { Bookmark, Heart, MessageCircle, Ellipsis, Send } from 'lucide-react';
import TimeAgo from './TimeAgo';

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const { toggleLike, addComment, currentUser } = usePostContext();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const isLiked = post.likes.includes(currentUser.id);
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    addComment(post.id, commentText);
    setCommentText('');
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      {/* Post header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={post.userProfilePicture} 
              alt={post.username} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-sm">{post.username}</span>
        </div>
        <button aria-label="More options">
          <Ellipsis className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Post image */}
      <div className="aspect-square w-full relative">
        <img 
          src={post.imageUrl} 
          alt="Post" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Post actions */}
      <div className="px-4 pt-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => toggleLike(post.id)} 
            aria-label={isLiked ? "Unlike post" : "Like post"}
            className="focus:outline-none"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-black'}`} 
            />
          </button>
          <button onClick={toggleComments} aria-label="Comments">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button aria-label="Share post">
            <Send className="w-6 h-6" />
          </button>
        </div>
        <button aria-label="Save post">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>
      
      {/* Likes */}
      {post.likes.length > 0 && (
        <div className="px-4 pt-2 text-sm font-semibold">
          {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
        </div>
      )}
      
      {/* Caption */}
      <div className="px-4 pt-1 text-sm">
        <span className="font-semibold mr-1">{post.username}</span>
        {post.caption}
      </div>
      
      {/* Comments preview */}
      {post.comments.length > 0 && !showComments && (
        <button 
          onClick={toggleComments}
          className="px-4 pt-1 text-sm text-gray-500 text-left"
        >
          {post.comments.length > 1 
            ? `View all ${post.comments.length} comments` 
            : 'View 1 comment'}
        </button>
      )}
      
      {/* Comments section */}
      {showComments && (
        <div className="px-4 pt-2 space-y-1">
          {post.comments.map(comment => (
            <div key={comment.id} className="text-sm">
              <span className="font-semibold mr-1">{comment.username}</span>
              {comment.text}
            </div>
          ))}
        </div>
      )}
      
      {/* Timestamp */}
      <div className="px-4 pt-1 text-xs text-gray-500">
        <TimeAgo timestamp={post.timestamp} />
      </div>
      
      {/* Add comment form */}
      <form onSubmit={handleAddComment} className="flex items-center px-4 pt-3">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow text-sm bg-transparent focus:outline-none"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        {commentText.trim() && (
          <button 
            type="submit" 
            className="text-blue-500 font-semibold text-sm"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default Post;
