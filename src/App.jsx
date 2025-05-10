import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import JournalUpload from './components/JournalUpload.jsx';
import JournalList from './components/JournalList.jsx';
import JournalDetail from './components/JournalDetail.jsx';
import Home from "./pages/Home.jsx";
import ManageJournal from "./pages/ManageJournal.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import JournalArchive from "./pages/JournalArchive.jsx";
import JournalSubmission from "./components/JournalSubmission.jsx";
import Navigation from "./components/Navigation.jsx";
import About from "./components/About.jsx";
import Guide from "./components/Guide.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TestComponent from "./components/TestComponent.jsx";

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
            <div className="app-container min-h-screen">
                {/* Overall layout container */}
                <div className={`layout-container ${sidebarOpen ? 'sidebar-open' : ''} ${isMobile ? 'mobile' : ''}`}>
                    {/* Navigation bar contained within layout */}
                    <div className="nav-container">
                        <Navigation user={user} toggleSidebar={toggleSidebar} />
                    </div>

                    {/* Content area - sidebar and main content */}
                    <div className="content-area">
                        {/* Sidebar component */}
                        <Sidebar
                            className={`site-sidebar ${sidebarOpen ? 'open' : ''}`}
                            onClose={() => setSidebarOpen(false)}
                        />

                        {/* Backdrop overlay for mobile */}
                        {isMobile && sidebarOpen && (
                            <div
                                className="sidebar-backdrop"
                                onClick={() => setSidebarOpen(false)}
                            />
                        )}

                        {/* Main content wrapper */}
                        <div className="main-content-wrapper">
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
                                    <Route path="/test" element={<TestComponent />} />

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

                            {/* Footer - direct child of main-content-wrapper */}
                            <Footer />

                            {/* Toast notifications */}
                            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;