import { usePostContext } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { Grid3x3, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { posts } = usePostContext();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const userPosts = currentUser 
    ? posts.filter(post => post.userId === currentUser.id) 
    : [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <div className="pb-4">
      {/* Profile header */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img 
              src={currentUser.profilePicture} 
              alt={currentUser.username} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-grow justify-around ml-4">
            <div className="flex flex-col items-center">
              <span className="font-semibold">{userPosts.length}</span>
              <span className="text-sm text-gray-500">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">346</span>
              <span className="text-sm text-gray-500">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">289</span>
              <span className="text-sm text-gray-500">Following</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h1 className="font-semibold text-base">{currentUser.username}</h1>
          <p className="text-sm">Welcome to my Instamisboel profile! 📷</p>
          <p className="text-sm">Share your pet moments and connect with animal lovers.</p>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-grow py-1.5 bg-gray-100 rounded text-sm font-medium">
            Edit Profile
          </button>
          <button className="p-1.5 bg-gray-100 rounded">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={handleLogout}
            className="p-1.5 bg-red-100 rounded" 
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
      
      {/* Profile tabs */}
      <div className="border-t border-gray-200 flex justify-around">
        <button className="py-3 flex-grow flex justify-center border-b-2 border-black">
          <Grid3x3 className="w-5 h-5" />
        </button>
      </div>
      
      {/* Posts grid */}
      <div className="grid grid-cols-3 gap-1">
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <div key={post.id} className="aspect-square">
              <img 
                src={post.imageUrl} 
                alt="Post" 
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-gray-500">
            <div className="text-lg font-medium mb-2">No posts yet</div>
            <p className="text-sm px-8">
              When you post photos, they will appear here on your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
