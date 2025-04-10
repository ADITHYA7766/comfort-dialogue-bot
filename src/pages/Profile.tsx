
import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogOut, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container flex justify-between items-center py-4">
          <Link to="/" className="font-semibold text-xl text-foreground">
            Health Companion AI
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 container max-w-4xl py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium">{user?.name || "User"}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Account Settings</h3>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
