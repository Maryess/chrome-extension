import { ThemeSwitcher } from 'features/ThemeSwitcher'
import styles from './Settings.module.scss'
import { Field } from 'shared/ui/Field'
import { Heading } from 'shared/ui/Heading'

export const Settings = ()=>{
    return (
        <div className={styles.settings}>
            <div className={styles.wrapper}>
                <Heading title='choose theme'/>
                <ThemeSwitcher/>
            </div>
            <div className={styles.center}>
                <Heading title='default opacity'/>
                <Field type="text" onChange={()=>{}} placeholder="fdfd"/>
                <Heading title='number of images'/>
                <Field type="text" onChange={()=>{}} placeholder="fdfd"/>
            </div>
            <div className={styles.footer}>
                <Field type='submit' />
            </div>
        </div>
    )
}