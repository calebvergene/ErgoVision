const { GoogleGenerativeAI } = require("@google/generative-ai");
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Function to generate content based on the prompt and image input
async function generateContent(image: string) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });    

  // Set up the prompt
  const prompt = `
    Musculoskeletal Disorder (MSDs) injuries lead to significant insurance costs, 
    amounting to $180 billion globally and $90 billion in the US alone. 
    Traditional ergonomic assessments are often outdated, operator-dependent, and unreliable. 
    Conventional methods are reactive, identifying issues only after injuries occur, 
    rather than preventing them. Existing processes are resource-intensive and rely heavily 
    on human operators, causing inconsistencies. Additionally, there is a lack of awareness 
    about how AI can effectively improve ergonomic assessments.

    My program uses AI and computer vision to streamline ergonomic safety assessments, 
    identifying risky postures and preventing injuries, significantly reducing MSD incidents early on.
    
    So, what I am going to do is upload an image to you where:
    - Their body parts that are in bad positions are colored yellow for OK or red for BAD.
    - You respond with what they are doing in the picture, give them recommendations on what to fix about 
      their posture (e.g., fix this about your form or move the desk higher, etc.).
  `;

  try {
    // Generate content based on the prompt
    const response = await model.generate({
      prompt: prompt,
      image: image
    });

    // Print the response (the generated text)
    console.log(response.text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}
