import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WelcomeScreen from "./Welcome/Welcome";
import Home from "./main/Home";
import EuphoricRegistration from "./Registration/Form";
// import AdminDashboard from "./Admin/Dashboard";
import ProtectedAdminDashboard from "./Admin/protected";
import ScrollProgress from "./main/progress";

function AppContent() {
  const location = useLocation();
  
  // Don't show scroll progress on welcome screen
  const showScrollProgress = location.pathname !== "/";

  return (
    <>
      {showScrollProgress && <ScrollProgress />}
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<EuphoricRegistration />} />
        <Route path="/admin" element={<ProtectedAdminDashboard />} />
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl text-white">404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;