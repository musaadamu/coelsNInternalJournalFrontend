import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/slices/authSlice"; // Import logout action

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(logout()); // Dispatch logout action to clear user data
            toast.success("You have been logged out."); // Notify the user
        } else {
            toast.info("You are already logged out.");
        }
        navigate("/login", { replace: true }); // Redirect to login page
    }, [dispatch, navigate, user]);

    return null; // No UI needed
};

export default LogoutPage;
