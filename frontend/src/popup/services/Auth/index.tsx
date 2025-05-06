import toast from "react-hot-toast"
import { getAuthUrl, logout, SERVER_URL, setToCookies } from "api/api.helper"
import { axios } from "api/api"


export default{
    async auth(email:string, password:string){
        try{
            const response = await axios.post(`${SERVER_URL}${getAuthUrl('sign-in')}`,{
                email,
                password
            })
            if(response.data?.accessToken){
                setToCookies({
                    accessToken:response.data?.accessToken,
                    refreshToken:response.data?.refreshToken
                })
            }
            alert("Вы успешно авторизовались")
            return response
        }catch(error){
            alert('Не вышло, попробуйте зарегестрироваться, если не делали этого раньше')
            console.log(error)
        }
    },

    async register (email:string, password:string){
        try{
            const response = await axios.post(`${SERVER_URL}${getAuthUrl('sign-up')}`,{
                email,
                password
            })
            if(response.data?.accessToken){
                setToCookies({
                    accessToken:response.data?.accessToken,
                    refreshToken:response.data?.refreshToken
                })
            }
            alert("Вы успешно зарегестрировались")
            return response
        }catch(error){
            alert('Не вышло, попробуйте ввести поля заново')
            console.log(error)
        }
    },

    logout(){
        try{
            logout()
            alert("Вы вышли из аккаунта")
        }catch{
            alert("Ошибка при выходе из аккаунта")
        }
    }
}