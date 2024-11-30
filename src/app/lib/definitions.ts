export type SessionType = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
};

export interface NavItemsType {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    isActive?: boolean | undefined;
  }[];
}
