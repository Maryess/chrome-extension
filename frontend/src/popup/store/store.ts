import { create } from "zustand";
// import { persist } from 'zustand/middleware';
// import { IUser } from "shared/types/user.types";
// import { AuthService } from "services/index";

// export interface IUserStore{
//     user:IUser | null;
//     isLoading:boolean;
//     error?: string | null;
//     login:(email:string, password:string)=>Promise<void>;
//     register:(email:string, password:string)=>Promise<void>;
//     logout:()=>void;
// }

export interface IThemeStore{
    theme:string;
    setTheme:(theme:IThemeStore['theme'])=>void;
    getTheme:()=>void; 
}

// export const useUserStore = create(
//     persist<IUserStore>((set)=> ({
//         user:null,
//         isLoading:false,
//         error:null,

//         login: async(email:string,password:string)=>{
//             set({
//                 isLoading:true,
//                 error:null
//             });
//             try{
//                 const response = await AuthService.auth(email,password)
//                 set({user:response?.data, isLoading:false})
//             }catch(error){
//                 set({ error: 'Ошибка при входе', isLoading: false });
//                 throw error;
//             }  
//         },

//         register: async(email:string,password:string)=>{
//             set({
//                 isLoading:true,
//                 error:null
//             });
//             try{
//                 const response = await AuthService.register(email,password)
//                 set({user:response?.data, isLoading:false})
//             }catch(error){
//                 set({ error: 'Ошибка при регистрации', isLoading: false });
//                 throw error;
//             }  
//         },
//         logout:()=>{
//             set({
//                 user:null
//             });
//             AuthService.logout()
//         }
//     }),
//         {
//             name: 'user-storage', 
//             skipHydration: false
//         }
// ))

export const useThemeStore = create<IThemeStore>((set)=>({
    theme:'blue',
    setTheme:(theme) => {
        if(!chrome.storage){
            localStorage.setItem('data-theme',theme)
            set({theme})
        }else{
            chrome.storage.local.set({theme});
            set({theme})
        }
    },
    getTheme:()=>{
        if(!chrome.storage){
            const newTheme = localStorage.getItem('data-theme')
            set({theme:newTheme || 'blue' })
        }else{
        chrome.storage.local.get('theme', (result) => {
            if (result.theme) {
              set({ theme: result.theme });
            }
          });
        }
    }
})
)