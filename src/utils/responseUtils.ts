
// This file now acts as a bridge to our Python implementation
import { getPythonResponse } from '../api/responsePythonApi';

export const getResponse = async (userInput: string): Promise<string> => {
  try {
    // Call the Python implementation
    const response = await getPythonResponse(userInput);
    return response;
  } catch (error) {
    console.error('Error getting response:', error);
    
    // Fallback to a simple response if Python fails
    return "I'm sorry, I'm having trouble processing right now. Could you try again?";
  }
};
