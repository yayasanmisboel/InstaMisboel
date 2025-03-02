import { NavLink } from 'react-router-dom';
import { House, SquarePlus, User } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-10">
      <div className="max-w-md mx-auto h-full flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <House className="w-6 h-6" />
          <span className="text-xs mt-1">House</span>
        </NavLink>
        
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <SquarePlus className="w-6 h-6" />
          <span className="text-xs mt-1">Create</span>
        </NavLink>
        
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
