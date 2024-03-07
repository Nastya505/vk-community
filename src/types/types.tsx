export interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

export interface User {
  first_name: string;
  last_name: string;
}

export interface Group {
  id: number;
  name: string;
  avatar_color?: string;
  members_count: number;
  closed: boolean;
  friends?: User[];
}
