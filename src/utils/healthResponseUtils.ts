/**
 * Unified health response utility that handles both medical and mental health queries
 */

// Import the existing response functions
import { getMedicalResponse } from './medicalResponseUtils';
import { getResponse } from './responseUtils';

export const getHealthResponse = async (userInput: string): Promise<string> => {
  const queryLower = userInput.toLowerCase();
  
  // Check if it's a mental health related query first
  const mentalHealthKeywords = [
    "anxious", "anxiety", "worried", "nervous", "stress", "stressed",
    "sad", "depressed", "depression", "unhappy", "miserable", "hopeless",
    "lonely", "alone", "isolated", "no friends", "no one understands",
    "angry", "anger", "mad", "furious", "frustrated", "rage",
    "tired", "exhausted", "fatigue", "no energy", "burnout", "burnt out",
    "scared", "frightened", "terrified", "fear", "panic", "phobia",
    "insomnia", "can't sleep", "trouble sleeping", "sleep problems", "nightmares",
    "overwhelmed", "too much", "can't cope", "falling apart", "breaking down",
    "relationship", "partner", "spouse", "boyfriend", "girlfriend", "marriage",
    "self-esteem", "confidence", "hate myself", "worthless", "not good enough",
    "suicide", "kill myself", "end my life", "don't want to live", "want to die",
    "mental", "therapy", "counseling", "feeling", "emotion", "mood"
  ];
  
  const hasMentalHealthKeyword = mentalHealthKeywords.some(keyword => 
    queryLower.includes(keyword)
  );
  
  if (hasMentalHealthKeyword) {
    return await getResponse(userInput);
  }
  
  // Otherwise, treat it as a medical query
  return await getMedicalResponse(userInput);
};
