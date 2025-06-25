
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HealthResourcesSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Health Resources</h2>
        <p className="text-muted-foreground mt-2">
          Comprehensive resources for both physical and mental health
        </p>
      </div>

      <Tabs defaultValue="crisis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crisis">Emergency</TabsTrigger>
          <TabsTrigger value="medical">Medical Info</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
          <TabsTrigger value="tools">Helpful Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crisis" className="space-y-4 mt-4">
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Emergency Resources</CardTitle>
              <CardDescription>
                If you're experiencing a health or mental health emergency, please reach out for immediate help
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
        
        <TabsContent value="medical" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trusted Medical Sources</CardTitle>
              <CardDescription>Reliable sources for medical information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Mayo Clinic</h3>
                <p>Comprehensive medical information and health resources.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.mayoclinic.org</p>
              </div>
              
              <div>
                <h3 className="font-medium">WebMD</h3>
                <p>Medical information, symptom checker, and health tools.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.webmd.com</p>
              </div>
              
              <div>
                <h3 className="font-medium">National Cancer Institute</h3>
                <p>Comprehensive cancer information and resources.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.cancer.gov</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mental" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Resources</CardTitle>
              <CardDescription>Support for mental health and emotional wellbeing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Mental Health America</h3>
                <p>Offers online support communities and mental health resources.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.mhanational.org</p>
              </div>
              
              <div>
                <h3 className="font-medium">NAMI (National Alliance on Mental Illness)</h3>
                <p>Support groups and resources for mental health conditions.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.nami.org</p>
              </div>
              
              <div>
                <h3 className="font-medium">7 Cups</h3>
                <p>Online platform for emotional support and counseling.</p>
                <p className="text-sm text-primary mt-1 hover:underline">www.7cups.com</p>
              </div>
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
                <p>Guided meditation sessions for stress, anxiety, sleep, and overall wellbeing.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>MyFitnessPal</CardTitle>
                <CardDescription>Nutrition and fitness tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Track your diet, exercise, and health metrics for better physical wellness.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calm</CardTitle>
                <CardDescription>Sleep and relaxation app</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sleep stories, breathing programs, and relaxing music for mental health.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Symptom Checker Tools</CardTitle>
                <CardDescription>Health assessment tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Use reliable symptom checkers like those from Mayo Clinic or WebMD for initial health assessments.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthResourcesSection;
