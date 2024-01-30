import { ACTION_TYPES } from "@/helper/enum";
import { IExplorerData, IReducerAction } from "@/helper/interface";
import { v4 as uuidv4 } from "uuid";

export const reducers = (state: IExplorerData, action: IReducerAction) => {
  const { payload, type } = action;
  switch (type) {
    case ACTION_TYPES.CREATE_FOLDER: {
      const findAndCreate = ({ data }: { data: IExplorerData }) => {
        if (data.id === payload?.id) {
          data.items.push({
            id: uuidv4(),
            name: payload?.text,
            isFolder: payload?.isFolder,
            items: [],
          });
          return { ...state };
        }
        for (const child of data.items) {
          findAndCreate({ data: child });
        }
        return null;
      };
      findAndCreate({ data: state });
    }

    case ACTION_TYPES.DELETE_FOLDER: {
    }
    case ACTION_TYPES.RENAME_FOLDER: {
    }
    default: {
      return state;
    }
  }
};
