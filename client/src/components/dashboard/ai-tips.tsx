"use client"

import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { ContentContext } from './content';
import { useContext, useState, useEffect } from 'react';
import type { FastAPIResponse } from '@/types/fastapi';
import GenerateContent from '@/app/api/auth/gemini'; // Assuming this is an async function
import PostureAnalysis from './ai_output';

function removeMarkdown(input: string) {
  // This regex will match the line containing ``` and remove it
  return input.replace(/^.*```.*$/gm, '');
}


const AiTips = () => {
  const { fastapiResponse } = useContext(ContentContext);
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (fastapiResponse) {
        const generatedText = await GenerateContent(fastapiResponse); // Await the async function
        if (generatedText) {
          console.log(JSON.parse(removeMarkdown(generatedText))); // Log the generated text
          setData(JSON.parse(removeMarkdown(generatedText)))
          
        }
      }
    };

    fetchData(); // Call the async function
  }, [count, fastapiResponse]); // Dependencies to trigger re-execution

  return (
    <div className="w-full flex-1 rounded-md bg-[#F5F5F5] p-4 overflow-y-scroll">
      <div className="flex h-fit w-full items-center justify-between flex-col overflow-y-scroll">
        <PostureAnalysis data={data} />;
      </div>
    </div>
  );
};

export default AiTips;
