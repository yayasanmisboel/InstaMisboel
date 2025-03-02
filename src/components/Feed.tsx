import { usePostContext } from '../context/PostContext';
import Post from './Post';

const Feed = () => {
  const { posts } = usePostContext();

  return (
    <div className="flex flex-col w-full">
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-lg font-medium mb-2">No posts yet</div>
          <p className="text-sm text-center">
            Create your first post or follow others to see their posts here!
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
