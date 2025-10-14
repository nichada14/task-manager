export interface IUser {
    _id: string;
    username: string;
    email: string;
  }
  
  export interface AuthResponse extends IUser {
    token: string;
  }
  
  export interface RegisterInput {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  