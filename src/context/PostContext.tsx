import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  profilePicture: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userProfilePicture: string;
  imageUrl: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: number;
}

interface PostContextType {
  posts: Post[];
  currentUser: User;
  addPost: (post: Omit<Post, 'id' | 'userId' | 'username' | 'userProfilePicture' | 'likes' | 'comments' | 'timestamp'>) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Mock current user
const mockCurrentUser: User = {
  id: 'user-1',
  username: 'instamisboel_official',
  profilePicture: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=150&h=150&auto=format&fit=crop'
};

// Mock initial posts
const initialPosts: Post[] = [
  {
    id: 'post-1',
    userId: 'user-2',
    username: 'pet_lover',
    userProfilePicture: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&h=150&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop',
    caption: 'My cute little friend! 🐱 #cats #catlover',
    likes: ['user-1', 'user-3'],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        username: 'catfan',
        text: 'So adorable! 😍',
        timestamp: Date.now() - 3600000
      }
    ],
    timestamp: Date.now() - 86400000
  },
  {
    id: 'post-2',
    userId: 'user-3',
    username: 'catfan',
    userProfilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=600&auto=format&fit=crop',
    caption: 'Afternoon nap time 💤 #catnap #sleepy',
    likes: ['user-2'],
    comments: [],
    timestamp: Date.now() - 172800000
  },
  {
    id: 'post-3',
    userId: 'user-1',
    username: 'instamisboel_official',
    userProfilePicture: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=150&h=150&auto=format&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80&w=600&auto=format&fit=crop',
    caption: 'Welcome to Instamisboel! Share your favorite pet moments.',
    likes: ['user-2', 'user-3'],
    comments: [
      {
        id: 'comment-2',
        userId: 'user-2',
        username: 'pet_lover',
        text: 'Love this app already!',
        timestamp: Date.now() - 43200000
      }
    ],
    timestamp: Date.now() - 259200000
  }
];

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser] = useState<User>(mockCurrentUser);

  useEffect(() => {
    // Load posts from localStorage or use initial posts
    const savedPosts = localStorage.getItem('instamisboel_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('instamisboel_posts', JSON.stringify(initialPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('instamisboel_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = (post: Omit<Post, 'id' | 'userId' | 'username' | 'userProfilePicture' | 'likes' | 'comments' | 'timestamp'>) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userProfilePicture: currentUser.profilePicture,
      ...post,
      likes: [],
      comments: [],
      timestamp: Date.now()
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const toggleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const userLikedIndex = post.likes.indexOf(currentUser.id);
          if (userLikedIndex === -1) {
            // User hasn't liked the post yet, add like
            return { ...post, likes: [...post.likes, currentUser.id] };
          } else {
            // User already liked the post, remove like
            const newLikes = [...post.likes];
            newLikes.splice(userLikedIndex, 1);
            return { ...post, likes: newLikes };
          }
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      text,
      timestamp: Date.now()
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  return (
    <PostContext.Provider value={{ posts, currentUser, addPost, toggleLike, addComment }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
