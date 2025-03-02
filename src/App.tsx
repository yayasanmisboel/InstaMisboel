import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import { PostProvider } from "./context/PostContext";
import "./index.css";

function App() {
  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <PostProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans" style={{ fontFamily: "Inter, sans-serif" }}>
          <Header />
          <main className="flex-grow pb-16 pt-14 max-w-md mx-auto w-full">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<CreatePost />} />
            </Routes>
          </main>
          <BottomNavigation />
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
