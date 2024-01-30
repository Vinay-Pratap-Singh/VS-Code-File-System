import { ACTION_TYPES } from "./enum";

export interface IExplorerData {
  id: string;
  name: string;
  isFolder: boolean;
  items: IExplorerData[];
}

export interface IAddNewFolderData {
  text: string;
  isFolder: boolean;
  id: string;
}

export interface IDataContext {
  state: IExplorerData;
  dispatch?: React.Dispatch<IReducerAction>;
}

export interface IReducerAction {
  type: ACTION_TYPES;
  payload: any;
}
