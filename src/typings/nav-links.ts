export interface MobileLink {
  groupTitle: string;
  list: {
    title: string;
    subtitle?: string;
    path: string;
    matches?: string[];
    subMenu?: { title: string; path: string }[];
    isContextMenu?: boolean;
  }[];
}
