import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";
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
    <AuthProvider>
      <PostProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen bg-gray-50 font-sans" style={{ fontFamily: "Inter, sans-serif" }}>
                    <Header />
                    <main className="flex-grow pb-16 pt-14 max-w-md mx-auto w-full">
                      <Feed />
                    </main>
                    <BottomNavigation />
                  </div>
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen bg-gray-50 font-sans" style={{ fontFamily: "Inter, sans-serif" }}>
                    <Header />
                    <main className="flex-grow pb-16 pt-14 max-w-md mx-auto w-full">
                      <Profile />
                    </main>
                    <BottomNavigation />
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <div className="flex flex-col min-h-screen bg-gray-50 font-sans" style={{ fontFamily: "Inter, sans-serif" }}>
                    <Header />
                    <main className="flex-grow pb-16 pt-14 max-w-md mx-auto w-full">
                      <CreatePost />
                    </main>
                    <BottomNavigation />
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
