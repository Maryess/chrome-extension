import { ChangeEvent } from "react"
import styles from './styles.module.scss'

type Props = {
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    placeholder:string;
    type:string;
    label?:string;
    value?:string;
}

export default({onChange,placeholder, type, label,value}:Props)=>{
    return(
         type === "file" &&
           <div className={styles.fileInputWrapper}>
                <input 
                id="fileInput"
                className={styles.input} 
                type={type} 
                onChange={onChange}
                value={value}
                />
                <label htmlFor="fileInput" className={styles.fileInputLabel}>
                    {label || 'Choose file'}
                </label>
        </div>
          
    )
}