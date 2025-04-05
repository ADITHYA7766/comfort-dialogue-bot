
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Medkit } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-6 w-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
                fill="currentColor" 
              />
              <path 
                d="M18 7C18 7.55228 17.5523 8 17 8C16.4477 8 16 7.55228 16 7C16 6.44772 16.4477 6 17 6C17.5523 6 18 6.44772 18 7Z" 
                fill="currentColor" 
              />
            </svg>
            <h1 className="text-xl font-semibold tracking-tight">HealthCompanion</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Welcome to HealthCompanion</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive health support platform with specialized AI assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">MindfulAI</CardTitle>
              <CardDescription>Mental health support companion</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                A supportive AI companion for mental health assistance and emotional wellbeing.
                Express your thoughts and receive compassionate guidance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild size="lg">
                <Link to="/mindfulai">
                  Access MindfulAI
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medkit className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">MedKitAI</CardTitle>
              <CardDescription>Medical information assistant</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Get reliable information about common health concerns, medications, 
                and general wellness advice from our medical information assistant.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild size="lg">
                <Link to="/medkitai">
                  Access MedKitAI
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-muted/50 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>HealthCompanion is not a replacement for professional healthcare services.</p>
          <p className="mt-1">If you're experiencing a crisis, please call your local emergency services or a crisis hotline immediately.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
