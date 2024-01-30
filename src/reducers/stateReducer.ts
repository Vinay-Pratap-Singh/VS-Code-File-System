import { ACTION_TYPES } from "@/helper/enum";
import { IExplorerData, IReducerAction } from "@/helper/interface";
import { v4 as uuidv4 } from "uuid";

export const reducers = (state: IExplorerData, action: IReducerAction) => {
  const { payload, type } = action;

  switch (type) {
    case ACTION_TYPES.CREATE_FOLDER: {
      const findAndCreate = ({ node }: { node: IExplorerData }): any => {
        if (node.id === payload?.id) {
          const newItem: IExplorerData = {
            id: uuidv4(),
            isFolder: payload?.isFolder,
            name: payload?.text,
            items: [],
          };
          return {
            ...node,
            items: [...(node.items || []), newItem],
          };
        }

        //   recursively checking for the parent to insert the node
        if (node.items && node.items.length > 0) {
          return {
            ...node,
            items: node.items
              .map((item) => findAndCreate({ node: item }))
              .filter(Boolean),
          };
        }

        //   if parent node not found
        return node;
      };

      //   creating the new folder / file
      const newData = { ...state };
      return findAndCreate({ node: newData });
    }

    case ACTION_TYPES.DELETE_FOLDER: {
      const findAndDelete = ({ node }: { node: IExplorerData }): any => {
        //   if node found
        if (node.id === payload.id) {
          return null;
        }

        // If the current node has children, recursively delete the node from each child
        if (node.items && node.items.length > 0) {
          return {
            ...node,
            items: node.items
              .map((child) => findAndDelete({ node: child }))
              .filter(Boolean),
          };
        }

        //   if no node found then return the original node
        return node;
      };

      //   to remove the data having the same id
      const newData = { ...state };
      newData.items = newData.items
        .map((item) => findAndDelete({ node: item }))
        .filter(Boolean);
      return newData;
    }

    case ACTION_TYPES.RENAME_FOLDER: {
      const findAndRename = ({ node }: { node: IExplorerData }): any => {
        // if node found
        if (node.id === payload.id) {
          return {
            ...node,
            name: payload?.text,
          };
        }

        //   recursively finding the node to rename
        if (node.items && node.items.length > 0) {
          return {
            ...node,
            items: node.items
              .map((item) => findAndRename({ node: item }))
              .filter(Boolean),
          };
        }

        //   if node not found
        return node;
      };

      //   finding the node and renaming it
      const newData = { ...state };
      return findAndRename({ node: newData });
    }

    default: {
      return state;
    }
  }
};
