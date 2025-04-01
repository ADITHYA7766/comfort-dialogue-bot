
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ResourcesSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Mental Health Resources</h2>
        <p className="text-muted-foreground mt-2">
          Curated resources to support your mental well-being
        </p>
      </div>

      <Tabs defaultValue="crisis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="tools">Helpful Tools</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crisis" className="space-y-4 mt-4">
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Emergency Resources</CardTitle>
              <CardDescription>
                If you're experiencing a mental health emergency, please reach out for immediate help
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">For immediate emergencies:</h3>
                <p className="text-lg font-semibold">Call 911 or go to your nearest emergency room</p>
              </div>
              
              <div>
                <h3 className="font-medium">National Suicide Prevention Lifeline:</h3>
                <p className="text-lg font-semibold">988 or 1-800-273-8255</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
              
              <div>
                <h3 className="font-medium">Crisis Text Line:</h3>
                <p className="text-lg font-semibold">Text HOME to 741741</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Anxiety</CardTitle>
              <CardDescription>Learn about anxiety symptoms and coping strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. Recognizing the symptoms and understanding healthy coping mechanisms can help manage anxiety effectively.</p>
              <ul className="list-disc ml-6 mt-4 space-y-1">
                <li>Practice deep breathing and meditation</li>
                <li>Limit caffeine and alcohol intake</li>
                <li>Get regular physical exercise</li>
                <li>Establish a regular sleep schedule</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Managing Depression</CardTitle>
              <CardDescription>Strategies for coping with depression symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Depression is a common and serious mental health condition that affects how you feel, think, and handle daily activities. There are several ways to manage symptoms and improve your quality of life.</p>
              <ul className="list-disc ml-6 mt-4 space-y-1">
                <li>Establish a daily routine</li>
                <li>Set achievable goals</li>
                <li>Try to be active and exercise</li>
                <li>Spend time with supportive people</li>
                <li>Consider professional therapy or counseling</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Headspace</CardTitle>
                <CardDescription>Meditation and mindfulness app</CardDescription>
              </CardHeader>
              <CardContent>
                <p>A popular meditation app that offers guided sessions for stress, anxiety, sleep, and more.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calm</CardTitle>
                <CardDescription>Sleep and meditation app</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Features sleep stories, breathing programs, and relaxing music to help reduce stress and anxiety.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Moodfit</CardTitle>
                <CardDescription>Mental health fitness app</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Tools to help you track and improve your mental health, similar to how a fitness app might track physical health.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jour</CardTitle>
                <CardDescription>Journaling app</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Guided journaling prompts to help process emotions and develop self-awareness.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="communities" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Groups</CardTitle>
              <CardDescription>Connect with others who understand what you're going through</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Mental Health America</h3>
                <p>Offers online support communities where you can connect with others.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.mhanational.org</p>
              </div>
              
              <div>
                <h3 className="font-medium">NAMI Connection</h3>
                <p>Recovery support groups for people experiencing mental health conditions.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.nami.org</p>
              </div>
              
              <div>
                <h3 className="font-medium">7 Cups</h3>
                <p>Online platform connecting individuals to caring listeners for emotional support.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.7cups.com</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesSection;
