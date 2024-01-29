"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Files } from "lucide-react";
import { useState } from "react";
import { explorerData as data } from "@/data/explorerData";
import Folder from "@/components/folder";

export default function Home() {
  const [explorerData, setExplorerData] = useState(data);

  return (
    <main className="flex gap-0">
      {/* left side menubar */}
      <div className="p-5 self-start">
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
      <div className="mt-3">
        <Folder explorerData={explorerData} />
      </div>
    </main>
  );
}
