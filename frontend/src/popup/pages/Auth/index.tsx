import { Field } from 'ui/index'
import styles from './styles.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInputs } from 'shared/types/user.types'
import { useUserStore } from 'store/store'
import { useAuthRedirect } from 'hooks/useAuthRedirect'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default ()=>{
    useAuthRedirect()
    const [typeAuth, setTypeAuth] = useState<'auth' | 'register'>('auth')
    const {handleSubmit, register} = useForm<IAuthInputs>()

    const {register:regUser,login} = useUserStore()
    const onSubmit :SubmitHandler<IAuthInputs> = async(data) => {
        try{
            if(typeAuth === 'auth'){
                await login(data.email, data.password) 
            }else{
                await regUser(data.email, data.password) 
            }
        }catch(error){
            toast.error(`${error}`)
        }        
    }


    return(
        <div className={styles.auth}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
                <div className={styles.auth__form_fields}>
                    <label>Email</label>
                    <input type='email' {...register('email')}/>
                    <label>Password</label>
                    <input type='text' {...register('password')}/>
                </div>
                <div className={styles.auth__form_buttons}>
                    <input type='submit' onClick={()=>setTypeAuth('auth')} value={'sign in'}/>
                    <input type='submit' onClick={()=>setTypeAuth('register')} value={'sign up'}/>
                </div>
            </form>
        </div>
    )
}