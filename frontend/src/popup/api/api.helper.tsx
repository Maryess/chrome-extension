export const SERVER_URL = "http://localhost:4100/api"

export const getAuthUrl = (path:string) => `/auth/${path}`
export const getUserUrl = (path:string) => `/user/${path}`

interface IAuthResponse{
    accessToken:string;
    refreshToken:string;
}

export const setToCookies= ({accessToken,refreshToken}:IAuthResponse) =>{
    if(!chrome.storage){
        localStorage.setItem('accessToken',accessToken)
        localStorage.setItem('refreshToken',refreshToken)
    }else{
        chrome.storage.local.set({accessToken:{token:accessToken}})
        chrome.storage.local.set({refreshToken:{token:refreshToken}})
    }
}

export const logout = ()=> {
    localStorage.removeItem('user-storage')
}