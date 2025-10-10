export interface MobileLink {
  groupTitleKey: string;
  list: {
    key: string;
    subtitlekey?: string;
    path: string;
    matches?: string[];
    subMenu?: { title: string; path: string }[];
    isContextMenu?: boolean;
  }[];
}
