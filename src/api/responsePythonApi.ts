
import axios from 'axios';

// Function to call Python script through a server endpoint
export const getPythonResponse = async (userInput: string): Promise<string> => {
  try {
    console.log("Sending request to Python API with input:", userInput);
    
    // Create a direct API call to our Python endpoint
    const response = await axios.post('/api/python-response', {
      userInput: userInput
    });
    
    console.log("Received response from Python API:", response.data);
    return response.data.response;
  } catch (error) {
    console.error('Error calling Python API:', error);
    
    // If the API call fails, fall back to our local implementation
    // This is a temporary measure until the API is working
    const fallbackResponse = getFallbackResponse(userInput);
    return fallbackResponse;
  }
};

// Fallback response logic that mimics the Python implementation
const getFallbackResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Check for crisis keywords
  const crisisKeywords = ["suicide", "kill myself", "end my life", "don't want to live", "want to die"];
  if (crisisKeywords.some(keyword => input.includes(keyword))) {
    return "I'm concerned about what you're sharing. If you're having thoughts of harming yourself, please reach out for immediate help. You can call the Suicide and Crisis Lifeline at 988 or 1-800-273-8255.";
  }
  
  // Check for mental health condition keywords
  if (input.includes("ocd") || input.includes("obsessive") || input.includes("compulsive") || input.includes("intrusive thoughts")) {
    return "Obsessive-compulsive patterns often involve intrusive thoughts that cause distress, followed by behaviors aimed at reducing that distress. These patterns can be exhausting. Would you like to share more about what you're experiencing?";
  }
  
  if (input.includes("addict") || input.includes("addiction") || input.includes("substance abuse") || input.includes("alcoholic")) {
    return "Recognizing patterns of addiction takes courage. Many people find that addiction often begins as a way to cope with difficult emotions or experiences. Would you feel comfortable sharing more about what might be underlying your concerns?";
  }
  
  if (input.includes("bipolar") || input.includes("mania") || input.includes("manic") || input.includes("mood swings")) {
    return "Bipolar disorder involves significant changes in mood, energy, thinking, and behavior - from periods of elevation (mania or hypomania) to periods of depression. These shifts can be very disruptive. Would you like to share more about the patterns you've noticed?";
  }
  
  // Generic response if no match
  return "Thank you for sharing that with me. Could you tell me more about what you're experiencing so I can better understand how to support you?";
};
