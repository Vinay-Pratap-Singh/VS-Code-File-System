import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { IExplorerData } from "@/helper/interface";
import { Edit, File, FilesIcon, FolderClosed, Trash } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

interface IProps {
  explorerData: IExplorerData;
}

const Folder = ({ explorerData }: IProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="flex items-center gap-2 cursor-pointer">
          <FilesIcon size={16} />
          New File
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 cursor-pointer">
          <FolderClosed size={16} />
          New Folder
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 cursor-pointer">
          <Edit size={16} />
          Rename
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-2 cursor-pointer">
          <Trash size={16} />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Folder;
