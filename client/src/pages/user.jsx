import React, { useEffect } from "react";
import Login from "../components/login";
import { useNavigate } from "react-router";
import { useUserInfo } from "../components/context/user";
import "./User.css";

export const LoginPage = () => {
    const { userInfo } = useUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            if (userInfo.email === "johanmonsalve125@gmail.com") {
                navigate("/user/admin/posts");
            } else {
                navigate("/user/dashboard");
            }
        }else{
            navigate("/login");
        }
    }, [userInfo, navigate]);

    return (
        <div className="login-page">
            {!userInfo && <Login />}
        </div>
    );
};
