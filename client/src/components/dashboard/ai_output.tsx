"use client"
import React, { useEffect, useState } from "react";

interface PostureData {
  criticalFrames: Array<{ frame: number, score: number, recommendation: string }>;
  limbScores: Array<{ limb: string, score: number, recommendation: string }>;
  generalRecommendations: string[];
  overallScore: number;
  summary: string;
}


const PostureAnalysis: React.FC<{ data: PostureData }> = ({ data }) => {

  return (
    <div className="container mx-auto p-6 space-y-6 overflow-y-scroll">
      {/* Overall Summary */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-2xl font-bold">Posture Analysis and Recommendations</h2>
        <p className="text-gray-600 mt-2">{data.summary}</p>
        <p className="text-gray-600 mt-2">
          <strong>Overall REBA Score: </strong>{data.overallScore}
        </p>
      </div>

      {/* Critical Frames */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="text-xl font-semibold">Critical Frames</h3>
        {data.criticalFrames.map((frame, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-lg font-semibold">Frame {frame.frame} (REBA Score: {frame.score})</h4>
            <p className="text-gray-600 mt-2">{frame.recommendation}</p>
          </div>
        ))}
      </div>

      {/* Limb Scores */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="text-xl font-semibold">Limb Scores</h3>
        {data.limbScores.map((limb, index) => (
          <div key={index} className="mt-4">
            <h4 className="text-lg font-semibold">{limb.limb} (Score: {limb.score})</h4>
            <p className="text-gray-600 mt-2">{limb.recommendation}</p>
          </div>
        ))}
      </div>

      {/* General Recommendations */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h3 className="text-xl font-semibold">General Recommendations</h3>
        <ul className="list-disc ml-6 mt-2 text-gray-600">
          {data.generalRecommendations.map((rec, index) => (
            <li key={index} className="mt-2">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [postureData, setPostureData] = useState<PostureData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data from an API or receiving a string response
        const response = await Promise.resolve(JSON.stringify(exampleData)); // Simulated API response as a string

        // Check if response is a string and parse it
        const parsedData: PostureData = JSON.parse(response);

        setPostureData(parsedData);
      } catch (error) {
        console.error("Error parsing posture data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {postureData ? (
        <PostureAnalysis data={postureData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;

// Example Data (You can replace this with actual data coming from API)
const exampleData: PostureData = {
  criticalFrames: [
    { frame: 1, score: 7, recommendation: "Reduce bending and lifting with proper techniques." },
    { frame: 2, score: 8, recommendation: "Adjust workstation to avoid twisting and reaching." }
  ],
  limbScores: [
    { limb: "Lower Arm", score: 6, recommendation: "Modify grip and reduce repetitive movements." },
    { limb: "Wrist", score: 3, recommendation: "Ensure a neutral wrist position with proper support." },
    { limb: "Trunk", score: 3, recommendation: "Use lumbar support to maintain a neutral spine." }
  ],
  generalRecommendations: [
    "Ensure regular breaks to avoid static postures.",
    "Conduct regular ergonomic assessments."
  ],
  overallScore: 2.56,
  summary: "The provided data indicates a potential risk of musculoskeletal disorders. The overall REBA score of 2.56 is relatively low, but critical frames show higher strain."
};
