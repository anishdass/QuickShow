import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SignIn } from "@clerk/clerk-react";

export const RequireAdmin = ({ user, isAdmin, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAdmin) {
      toast.error("Cannot access admin paths");
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, navigate]);

  if (!user) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <SignIn fallbackRedirectUrl='/admin' />
      </div>
    );
  }

  if (!isAdmin) {
    // While redirecting, render nothing or a loader if you want
    return null;
  }

  return children;
};
