import { ThemeSwitcher } from 'features/ThemeSelector'
import styles from './Settings.module.scss'
import { Field } from 'shared/ui/Field'
import { Heading } from 'shared/ui/Heading'
import { useForm } from 'react-hook-form'

export const Settings = ()=>{

    const {register, formState:{errors}, handleSubmit} = useForm({
        mode:'onChange'
    })

    return (
        <div className={styles.settings}>
            <div className={styles.wrapper}>
                <Heading title='choose theme'/>
                <ThemeSwitcher/>
            </div>
            <div className={styles.center}>
                <Heading title='default opacity'/>
                <Field  type="text" onChange={()=>{}} placeholder="fdfd"/>
                <Heading title='number of images'/>
                <Field type="text" onChange={()=>{}} placeholder="fdfd"/>
            </div>
            <div className={styles.footer}>
                <Field type='submit' />
            </div>
        </div>
    )
}