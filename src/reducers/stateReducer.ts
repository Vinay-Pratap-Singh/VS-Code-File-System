import { ACTION_TYPES } from "@/helper/enum";
import { IExplorerData, IReducerAction } from "@/helper/interface";

export const reducers = (state: IExplorerData, action: IReducerAction) => {
  const { payload, type } = action;
  switch (type) {
    case ACTION_TYPES.CREATE_FOLDER: {
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
