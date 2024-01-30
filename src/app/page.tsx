"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Files } from "lucide-react";
import { useState } from "react";
import Folder from "@/components/folder";
import { useDataContext } from "@/context/dataContext";

export default function Home() {
  const { state, dispatch } = useDataContext();
  const [showExplorer, setShowExplorer] = useState(true);

  return (
    <main className="flex gap-0 h-screen">
      {/* left side menubar */}
      <div
        className="p-5 self-start bg-gray-50 h-full"
        onClick={() => setShowExplorer(!showExplorer)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Files />
            </TooltipTrigger>
            <TooltipContent>
              <p>File Explorer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* folder structure */}
      <div
        className={`py-3 transition-all ease-in-out duration-300  ${
          showExplorer ? "block" : "hidden"
        }`}
      >
        <Folder explorerData={state} />
      </div>
    </main>
  );
}
