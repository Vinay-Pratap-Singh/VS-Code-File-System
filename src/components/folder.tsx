"use client";

import React, { useState } from "react";
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
import { Input } from "./ui/input";
import { useDataContext } from "@/context/dataContext";
import { ACTION_TYPES } from "@/helper/enum";

interface IProps {
  explorerData: IExplorerData;
}

interface ICreateFolder {
  isFolder: boolean;
  showInput: boolean;
}

const Folder = ({ explorerData }: IProps) => {
  const { dispatch } = useDataContext();
  const [createFolder, setCreateFolder] = useState<ICreateFolder>({
    isFolder: true,
    showInput: false,
  });
  const [text, setText] = useState("");

  // function to handle file / folder creation
  const handleFolderCreation = () => {
    if (text) {
      dispatch &&
        dispatch({
          type: ACTION_TYPES.CREATE_FOLDER,
          payload: {
            text,
            id: explorerData?.id,
            isFolder: createFolder.isFolder,
          },
        });
    }

    setCreateFolder({
      ...createFolder,
      showInput: false,
    });
    setText("");
  };

  return (
    <ContextMenu key={explorerData?.id}>
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

            {/* input box for new folder or file creation */}
            {createFolder?.showInput && (
              <div className="flex items-center gap-3 px-3 my-1">
                {createFolder?.isFolder ? (
                  <FolderClosed size={18} />
                ) : (
                  <File size={18} />
                )}
                <Input
                  type="text"
                  autoFocus
                  className="px-1 py-[1px]"
                  value={text}
                  onBlur={handleFolderCreation}
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
            )}

            {explorerData?.isFolder && (
              <AccordionContent>
                {explorerData?.isFolder && explorerData?.items.length === 0 ? (
                  <p
                    className={`${
                      createFolder?.showInput ? "hidden" : "block"
                    }`}
                  >
                    Create a new file / folder
                  </p>
                ) : (
                  explorerData?.items.map((item) => {
                    return <Folder key={item?.id} explorerData={item} />;
                  })
                )}
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {explorerData?.isFolder && (
          <>
            <ContextMenuItem
              onClick={() =>
                setCreateFolder({
                  isFolder: false,
                  showInput: true,
                })
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <FilesIcon size={16} />
              New File
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() =>
                setCreateFolder({
                  isFolder: true,
                  showInput: true,
                })
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <FolderClosed size={16} />
              New Folder
            </ContextMenuItem>
          </>
        )}
        <ContextMenuItem className="flex items-center gap-2 cursor-pointer">
          <Edit size={16} />
          Rename
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            dispatch &&
            dispatch({
              type: ACTION_TYPES.DELETE_FOLDER,
              payload: { id: explorerData?.id },
            })
          }
        >
          <Trash size={16} />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Folder;
