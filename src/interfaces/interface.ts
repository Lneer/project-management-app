export interface IFormData {
  name?: string;
  login: string;
  password: string;
}
export interface IAuthState {
  login: string;
  name: string;
  id: string;
  token: string;
  loading: boolean;
  isLoggedIn: boolean | null;
}
export interface ISignResp {
  name: string;
  login: string;
  _id: string;
  token: string;
  password: string;
}
export interface IErrorResp {
  statusCode: number;
  message: string;
}
export interface IDecodedToken {
  exp: number;
  iat: number;
  id: string;
  login: string;
}
export interface ILocalStorageData {
  id: string;
  token: string;
}
export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface IOrder {
  order: number;
}
export interface ITask extends IOrder {
  _id: string;
  title: string;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}
export interface IColumn extends IOrder {
  _id: string;
  title: string;
  boardId: string;
}
export interface IBoard {
  _id?: string;
  title: string;
  owner?: string;
  users?: string[];
}

export interface IColumnData extends IColumn {
  tasks: ITask[];
}
