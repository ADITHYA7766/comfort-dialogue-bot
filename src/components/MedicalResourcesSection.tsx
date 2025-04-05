
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const MedicalResourcesSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Health Resources</h2>
        <p className="text-muted-foreground mt-2">
          Reliable sources for medical information and assistance
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>World Health Organization</CardTitle>
            <CardDescription>Global health guidance and information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-4">
              Access reliable global health information, disease outbreaks, and health guidelines from WHO.
            </p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full" onClick={() => window.open("https://www.who.int/", "_blank")}>
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Centers for Disease Control</CardTitle>
            <CardDescription>Health information and disease prevention</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-4">
              Find information on diseases, preventive measures, healthy living, and emergency preparedness.
            </p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full" onClick={() => window.open("https://www.cdc.gov/", "_blank")}>
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>MedlinePlus</CardTitle>
            <CardDescription>Trusted health information for you</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-4">
              A service of the National Library of Medicine providing reliable, up-to-date health information.
            </p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full" onClick={() => window.open("https://medlineplus.gov/", "_blank")}>
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mayo Clinic</CardTitle>
            <CardDescription>Comprehensive medical information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-4">
              Expert information on symptoms, causes, diagnosis and treatment for common diseases and conditions.
            </p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full" onClick={() => window.open("https://www.mayoclinic.org/", "_blank")}>
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>National Institutes of Health</CardTitle>
            <CardDescription>Medical research and health information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-4">
              Access health information, scientific resources, and research from America's medical research agency.
            </p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full" onClick={() => window.open("https://www.nih.gov/", "_blank")}>
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mental Health Resources</CardTitle>
            <CardDescription>Support for mental wellbeing</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="text-sm text-muted-foreground mb-4">
              Visit our MindfulAI section for resources specific to mental health support and emotional wellbeing.
            </p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full" asChild>
                <a href="/mindfulai?tab=resources">
                  Access Resources
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle>Emergency Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-destructive">
            For medical emergencies, call your local emergency number (such as 911 in the US) immediately.
          </p>
          <p className="mt-2 text-muted-foreground">
            This is not a crisis service. If you are experiencing a medical emergency, severe pain, or concerning symptoms, 
            seek professional medical help immediately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalResourcesSection;
