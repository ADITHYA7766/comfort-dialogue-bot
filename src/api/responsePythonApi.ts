
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

// Convert exec to Promise-based function
const execAsync = util.promisify(exec);

// Function to call Python script
export const getPythonResponse = async (userInput: string): Promise<string> => {
  try {
    // Create a temporary file with the user's input
    const tempInputPath = path.join(process.cwd(), 'temp_input.txt');
    const tempOutputPath = path.join(process.cwd(), 'temp_output.txt');
    
    // Write user input to the temporary file
    fs.writeFileSync(tempInputPath, userInput);
    
    // Command to run Python script with input file and output file
    const command = `python src/python/response_utils.py "${tempInputPath}" "${tempOutputPath}"`;
    
    // Execute the Python script
    await execAsync(command);
    
    // Read the output from the Python script
    const response = fs.readFileSync(tempOutputPath, 'utf8');
    
    // Clean up temporary files
    fs.unlinkSync(tempInputPath);
    fs.unlinkSync(tempOutputPath);
    
    return response;
  } catch (error) {
    console.error('Error calling Python script:', error);
    return "I apologize, I'm having trouble processing your request. Please try again.";
  }
};
