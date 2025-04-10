
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, UserPlus, User } from "lucide-react";

export const AuthNav: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <Link to="/profile">
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{user?.name || "Profile"}</span>
          </Button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Log In</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Up</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
