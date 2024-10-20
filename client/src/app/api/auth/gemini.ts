import type { FastAPIResponse } from "@/types/fastapi";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function generateContent(data: FastAPIResponse) {
  const apiKey: string = process.env.API_KEY || 'AIzaSyAhOSi4tB_VJtpg2U61HYNcsUcEnL4ZT_U';
  const genAI: any = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt: string = `
    Musculoskeletal Disorder (MSDs) injuries lead to significant insurance costs, 
    amounting to $180 billion globally and $90 billion in the US alone. 
    Traditional ergonomic assessments are often outdated, operator-dependent, and unreliable. 
    Conventional methods are reactive, identifying issues only after injuries occur, 
    rather than preventing them. Existing processes are resource-intensive and rely heavily 
    on human operators, causing inconsistencies. Additionally, there is a lack of awareness 
    about how AI can effectively improve ergonomic assessments.

    My program uses AI and computer vision to streamline ergonomic safety assessments, 
    identifying risky postures and preventing injuries, significantly reducing MSD incidents early on.

    Here is the data from the latest ergonomic video analysis:
    - Video REBA Score: ${data.video_reba_score}
    - Total Frames Analyzed: ${data.total_frames}
    - Limb Scores: ${JSON.stringify(data.limb_scores, null, 2)}
    - Critical Frames: ${data.critical_frames.map((frame, index) => `Frame ${index + 1}: REBA Score ${frame.reba_score}`).join(', ')}

    Based on this data, please provide recommendations on improving posture, focusing on the critical frames and limb scores.
    Start with an overall summary of their posture and suggest specific adjustments (e.g., move the desk higher, adjust arm position, etc.).

    \n \n The output should be no more than 300 words, and follow this format for your response\n make this a json or i will die.
    
    {
      "criticalFrames": [
        { frame: 1, score: 7, recommendation: "Reduce bending and lifting with proper techniques." },
        { frame: 2, score: 8, recommendation: "Adjust workstation to avoid twisting and reaching." }
      ],
      "limbScores": [
        { limb: "Lower Arm", score: 6, recommendation: "Modify grip and reduce repetitive movements." },
        { limb: "Wrist", score: 3, recommendation: "Ensure a neutral wrist position with proper support." },
        { limb: "Trunk", score: 3, recommendation: "Use lumbar support to maintain a neutral spine." }
      ],
      "generalRecommendations": [
        "Ensure regular breaks to avoid static postures.",
        "Conduct regular ergonomic assessments."
      ],
      "overallScore": 2.56,
      summary: "The provided data indicates a potential risk of musculoskeletal disorders. The overall REBA score of 2.56 is relatively low, but critical frames show higher strain."
    };
    
  `;

  try {
    const result = await model.generateContent([prompt]);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
  }
}
