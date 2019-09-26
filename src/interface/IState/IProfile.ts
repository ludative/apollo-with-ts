import { IPageState } from "./ICommon";

export interface IProfileState extends IPageState {
  users: IProfileUser[];
  selectedUserId: number | undefined;
  value: string;
  addedValue: string | undefined;
  username: string;
  nickname: string;
  password: string;
}

export interface IProfileUser {
  deleted: boolean;
  id: number;
  isAdmin: boolean;
  nickname: string;
  username: string;
}
