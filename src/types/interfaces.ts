export interface Stand {
  id: number;
  branch?: string;
  users: User[];
}

export interface User {
  id: number;
  username?: string;
  fullName?: string;
}
