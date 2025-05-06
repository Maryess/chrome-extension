export interface IAuthInputs{
    email:string;
    password:string;
}

interface IAuthResponse{
    accessToken :string;
    refreshToken:string;
}


export interface IUser{
    id:string;
    email:string;
    password:string;
    isAdmin?:string;
    tokens:IAuthResponse
}