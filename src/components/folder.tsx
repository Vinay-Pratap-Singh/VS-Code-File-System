import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { IExplorerData } from "@/helper/interface";
import { File, FolderClosed } from "lucide-react";

interface IProps {
  explorerData: IExplorerData;
}

const Folder = ({ explorerData }: IProps) => {
  return (
    <Accordion key={explorerData?.id} type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger isFolder={explorerData?.isFolder}>
          {explorerData?.isFolder ? (
            <FolderClosed size={20} />
          ) : (
            <File size={20} />
          )}
          {explorerData?.name}
        </AccordionTrigger>
        {explorerData?.isFolder && (
          <AccordionContent>
            {explorerData?.isFolder && explorerData?.items.length === 0
              ? "Create a new file / folder"
              : explorerData?.items.map((item) => {
                  return <Folder key={item?.id} explorerData={item} />;
                })}
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default Folder;
