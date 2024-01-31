import { IExplorerData } from "./interface";
import { ACTION_TYPES } from "./enum";

// to check that the file / folder already exists or not
export const doesFolderExist = ({
  state,
  currentNode,
  isFolder,
  text,
  actionType,
}: {
  state: IExplorerData;
  currentNode: IExplorerData;
  isFolder: boolean;
  text: string;
  actionType: ACTION_TYPES;
}) => {
  if (actionType === ACTION_TYPES.CREATE_FOLDER) {
    for (let i = 0; i < currentNode.items.length; i++) {
      if (
        currentNode.items[i].name === text &&
        currentNode.items[i].isFolder === isFolder
      ) {
        return true;
      }
    }
    return false;
  }

  if (actionType === ACTION_TYPES.RENAME_FOLDER) {
    const findParent = ({
      parentNode,
      id,
    }: {
      parentNode: IExplorerData;
      id: string;
    }): any => {
      for (let i = 0; i < parentNode.items.length; i++) {
        if (parentNode.items[i].id === id) {
          return parentNode;
        }
        const data = findParent({ parentNode: parentNode.items[i], id });
        if (data) {
          return data;
        }
      }
    };

    const data = findParent({
      parentNode: state,
      id: currentNode.id,
    });

    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].name === text && data.items[i].isFolder === isFolder) {
        return true;
      }
    }
    return false;
  }
};
