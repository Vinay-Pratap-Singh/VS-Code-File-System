import { IExplorerData } from "@/helper/interface";

export const explorerData: IExplorerData = {
  id: "1",
  name: "VS Code File System",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [],
    },
    {
      id: "3",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "4",
          name: "App",
          isFolder: true,
          items: [
            {
              id: "5",
              name: "index.tsx",
              isFolder: false,
              items: [],
            },
            {
              id: "6",
              name: "layout.tsx",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: "7",
          name: "Components",
          isFolder: true,
          items: [],
        },
      ],
    },
  ],
};
