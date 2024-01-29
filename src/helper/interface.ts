export interface IExplorerData {
  id: string;
  name: string;
  isFolder: boolean;
  items: IExplorerData[];
}
