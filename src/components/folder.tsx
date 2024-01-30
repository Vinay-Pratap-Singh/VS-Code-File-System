"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { ACTION_TYPES, FILE_EXTENSION_ICON_MAP } from "@/helper/enum";
import Image from "next/image";

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
  // for new file or folder name
  const [text, setText] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentEditableRef = useRef<HTMLParagraphElement | null>(null);

  // for file icon based on extension
  const fileExtension: string =
    explorerData.name.split(".").pop()?.toUpperCase() || "TXT";
  const selectedSvg = (FILE_EXTENSION_ICON_MAP as Record<string, string>)[
    fileExtension ? fileExtension : "TXT"
  ];

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

  // function to handle file rename
  const handleFileRenaming = ({ text }: { text: string }) => {
    dispatch &&
      dispatch({
        type: ACTION_TYPES.RENAME_FOLDER,
        payload: {
          id: explorerData?.id,
          text,
        },
      });
    setIsEditable(false);
  };

  // for focusing on input to create new file or folder
  useEffect(() => {
    if (createFolder.showInput) {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 200);
    }
  }, [createFolder.showInput]);

  // for focusing on editable para to rename
  useEffect(() => {
    if (isEditable) {
      setTimeout(() => {
        contentEditableRef.current && contentEditableRef.current.focus();
      }, 200);
    }
  }, [isEditable]);

  // for enabling rename on enter button
  useEffect(() => {
    function rename(event: KeyboardEvent) {
      if (event.key === "Enter") {
        handleFileRenaming({
          text: contentEditableRef.current?.innerText || "",
        });
      }
    }
    if (isEditable) {
      contentEditableRef.current?.addEventListener("keydown", rename);
    } else {
      contentEditableRef.current?.removeEventListener("keydown", rename);
    }
  }, [isEditable]);

  return (
    <ContextMenu key={explorerData?.id}>
      <ContextMenuTrigger>
        <Accordion key={explorerData?.id} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger isFolder={explorerData?.isFolder}>
              {explorerData?.isFolder ? (
                <FolderClosed size={20} />
              ) : (
                // <File size={20} />
                <Image
                  src={selectedSvg || FILE_EXTENSION_ICON_MAP.TXT}
                  alt="selectedSvg"
                  width={20}
                  height={20}
                />
              )}
              <p
                ref={contentEditableRef}
                className={`w-full text-left ${
                  isEditable ? "px-1 py-[1px]" : ""
                }`}
                contentEditable={isEditable}
                onBlur={(event) => {
                  handleFileRenaming({ text: event.currentTarget.innerText });
                }}
              >
                {explorerData?.name}
              </p>
            </AccordionTrigger>

            {/* input box for new folder or file creation */}
            {createFolder?.showInput && (
              <div className="flex items-center gap-3 px-3 my-1">
                {createFolder?.isFolder ? (
                  <FolderClosed size={18} />
                ) : (
                  <File size={18} />
                )}
                <form onSubmit={handleFolderCreation}>
                  <Input
                    ref={inputRef}
                    type="text"
                    autoFocus
                    className="px-1 py-[1px]"
                    value={text}
                    onBlur={handleFolderCreation}
                    onChange={(event) => setText(event.target.value)}
                  />
                </form>
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
        <ContextMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsEditable(true)}
        >
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
