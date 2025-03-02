import { useLocation, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Instamisboel';
      case '/profile':
        return 'Profile';
      case '/create':
        return 'Create Post';
      default:
        return 'Instamisboel';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-10">
      <div className="max-w-md mx-auto h-full px-4 flex items-center justify-between">
        {location.pathname === '/' ? (
          <div className="text-xl font-semibold flex items-center">
            <span className="text-black">Instamisboel</span>
          </div>
        ) : (
          <Link to="/" className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
        )}
        
        {location.pathname === '/' && (
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-black" />
          </div>
        )}
        
        {location.pathname !== '/' && (
          <div className="text-lg font-medium">{getTitle()}</div>
        )}
        
        {location.pathname === '/' && <div className="w-6"></div>}
      </div>
    </header>
  );
};

export default Header;
