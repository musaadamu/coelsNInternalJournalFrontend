import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaSave, FaIdCard, FaShieldAlt } from "react-icons/fa";

const UpdateProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    // Form states
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Validation states
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("personal"); // "personal" or "security"

    // Handle error messages from Redux
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Handle successful profile update
    useEffect(() => {
        if (isSubmitted && !loading && !error) {
            toast.success("Profile updated successfully!");
            setIsSubmitted(false);
            setPassword("");
            setConfirmPassword("");
        }
    }, [isSubmitted, loading, error]);

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (password && password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (password && password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Show validation errors
            Object.values(formErrors).forEach(error => {
                toast.error(error);
            });
            return;
        }

        // Prepare update data - only include fields supported by the backend
        const updateData = {
            name,
            email
        };

        // Only include password if it's provided
        if (password) {
            updateData.password = password;
        }

        dispatch(updateUserProfile(updateData));
        setIsSubmitted(true);
    };

    // Get initials for avatar
    const getInitials = () => {
        if (name && name.trim()) {
            const nameParts = name.trim().split(' ');
            if (nameParts.length > 1) {
                return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
            }
            return name.charAt(0).toUpperCase();
        }
        return user?.email?.charAt(0).toUpperCase() || "U";
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Page header with breadcrumb */}
                <div className="mb-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center hover:text-blue-600 transition-colors"
                        >
                            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Dashboard
                        </button>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-gray-700">Profile Settings</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-2 text-gray-600 max-w-3xl">
                        Manage your account information and change your password. Your profile information will be used for identification and communication purposes.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Profile header with avatar */}
                    <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-8 py-10 text-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-tr-full opacity-10"></div>

                        <div className="flex flex-col md:flex-row items-center relative z-10">
                            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-lg">
                                {getInitials()}
                            </div>
                            <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
                                <h2 className="text-2xl font-bold">{name || user?.email}</h2>
                                <div className="flex items-center justify-center md:justify-start mt-2">
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}
                                    </span>
                                    <span className="ml-3 text-blue-100 flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                    </span>
                                </div>
                                <p className="text-blue-100 mt-4 max-w-lg">
                                    Update your personal information and manage your account security settings below.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tab navigation */}
                    <div className="border-b border-gray-200 bg-gray-50">
                        <div className="px-4 sm:px-6">
                            <nav className="flex space-x-4">
                                <button
                                    className={`py-4 px-6 font-medium text-sm flex items-center relative ${
                                        activeTab === "personal"
                                            ? "text-blue-700"
                                            : "text-gray-500 hover:text-gray-700"
                                    } transition-colors`}
                                    onClick={() => setActiveTab("personal")}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                                        activeTab === "personal"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-gray-100 text-gray-500"
                                    }`}>
                                        <FaUser className="h-4 w-4" />
                                    </div>
                                    <span>Personal Information</span>
                                    {activeTab === "personal" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                    )}
                                </button>
                                <button
                                    className={`py-4 px-6 font-medium text-sm flex items-center relative ${
                                        activeTab === "security"
                                            ? "text-blue-700"
                                            : "text-gray-500 hover:text-gray-700"
                                    } transition-colors`}
                                    onClick={() => setActiveTab("security")}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                                        activeTab === "security"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-gray-100 text-gray-500"
                                    }`}>
                                        <FaLock className="h-4 w-4" />
                                    </div>
                                    <span>Security</span>
                                    {activeTab === "security" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                    )}
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            {/* Personal Information Tab */}
                            {activeTab === "personal" && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    You can update your name and email address here. These details will be used for communication and identification within the Sahara Journal system.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaUser className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className={`block w-full pl-10 pr-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`block w-full pl-10 pr-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                            {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Account Information (Read-only) */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* User Role */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Account Role
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaIdCard className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User"}
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                                                        disabled
                                                    />
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Your account role determines what actions you can perform in the system.
                                                </p>
                                            </div>

                                            {/* Account Created */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Account Created
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaShieldAlt className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === "security" && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    <strong>Password Update Instructions:</strong> To change your password, enter your new password below. Leave the fields blank if you don't want to change your password.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Security Information */}
                                    <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                                        <h4 className="font-medium text-gray-800 mb-2">Password Security Tips</h4>
                                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                                            <li>Use at least 8 characters - the more characters, the better</li>
                                            <li>Use a mix of letters, numbers, and symbols</li>
                                            <li>Avoid using easily guessed information like birthdays</li>
                                            <li>Don't reuse passwords from other websites</li>
                                        </ul>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={`block w-full pl-10 pr-10 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="Enter new password"
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
                                        <p className="mt-1 text-sm text-gray-500">
                                            Password must be at least 6 characters long.
                                        </p>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                type={showPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={`block w-full pl-10 pr-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="Confirm new password"
                                                autoComplete="new-password"
                                            />
                                        </div>
                                        {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4">
                                    {/* Left side buttons */}
                                    <div className="mt-3 sm:mt-0">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/dashboard")}
                                            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                        >
                                            <FaArrowLeft className="mr-2 h-4 w-4" />
                                            Back to Dashboard
                                        </button>
                                    </div>

                                    {/* Right side buttons */}
                                    <div className="flex flex-col-reverse sm:flex-row sm:space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setName(user?.name || "");
                                                setEmail(user?.email || "");
                                                setPassword("");
                                                setConfirmPassword("");
                                                setFormErrors({});
                                                toast.info("Form has been reset to original values");
                                            }}
                                            className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Reset Form
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors duration-200"
                                        >
                                            {loading ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Saving Changes...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <FaSave className="mr-2 h-4 w-4" />
                                                    Save Changes
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;
