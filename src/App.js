import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import JournalUpload from './components/JournalUpload';
import JournalList from './components/JournalList';
import JournalDetail from './components/JournalDetail';
import Home from "./pages/Home";
import ManageJournal from "./pages/ManageJournal";
import LogoutPage from "./pages/LogoutPage";
import JournalArchive from "./pages/JournalArchive";
import JournalSubmission from "./components/JournalSubmission";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Guide from "./components/Guide";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Get user from localStorage if available
    const storedUser = localStorage.getItem('authUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Function to check if device is mobile
    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        // Check mobile on mount and window resize
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                {/* Navigation appears on every page */}
                <Navigation user={user} toggleSidebar={toggleSidebar} />

                <div className={`app-content-wrapper flex flex-1 ${sidebarOpen ? 'sidebar-open' : ''} ${isMobile ? 'mobile' : ''}`}>
                    {/* Sidebar component */}
                    <Sidebar
                        className={`site-sidebar ${sidebarOpen ? 'open' : ''}`}
                        onClose={() => setSidebarOpen(false)}
                    />

                    {/* Backdrop overlay for mobile when sidebar is open */}
                    {isMobile && sidebarOpen && (
                        <div
                            className="sidebar-backdrop"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    {/* Main content area with footer */}
                    <div className="main-content-wrapper flex flex-col flex-1">
                        <main className="flex-grow">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/logout" element={<LogoutPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgotpassword" element={<ForgotPassword />} />
                                <Route path="/resetpassword/:token" element={<ResetPassword />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/guide" element={<Guide />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/journals" element={<JournalList />} />
                                <Route path="/journals/:id" element={<JournalDetail />} />
                                <Route path="/archive" element={<JournalArchive />} />
                                <Route path="/unauthorized" element={<Unauthorized />} />

                                {/* Protected Routes - Only require login, not admin */}
                                <Route path="/dashboard" element={
                                    <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/updateprofile" element={
                                    <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                                        <UpdateProfilePage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/submission" element={
                                    <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                                        <JournalSubmission />
                                    </ProtectedRoute>
                                } />

                                {/* Admin-only Routes - Only accessible to admin users */}
                                <Route path="/journals/uploads" element={
                                    <ProtectedRoute allowedRoles={["admin"]}>
                                        <JournalUpload />
                                    </ProtectedRoute>
                                } />
                                <Route path="/manage-journals" element={
                                    <ProtectedRoute allowedRoles={["admin"]}>
                                        <ManageJournal />
                                    </ProtectedRoute>
                                } />

                                {/* Not Found Route */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>

                        {/* Footer inside the main content wrapper */}
                        <Footer />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;