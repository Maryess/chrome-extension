import { ChangeEvent } from "react"
import styles from './Field.module.scss'

type Props = {
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    onSubmit?:()=>void;
    placeholder?:string;
    type:string;
    label?:string;
    value?:string;
}

export const Field = ({onChange,onSubmit,placeholder, type, label,value}:Props)=>{
    return(
        <>
         {type === "file" &&
           <div className={styles.fileInputWrapper}>
                <input 
                id="fileInput"
                className={styles.fileInput} 
                type={type} 
                onChange={onChange}
                value={value}
                />
                <label htmlFor="fileInput" className={styles.fileInputLabel}>
                    {label || 'Choose file'}
            </label>
        </div>}
        {type === 'text' &&
        <div className={styles.textInputWrapper}>
            <input 
            type="text" 
            className={styles.textInput}
            onChange={onChange}
            />
        </div>}
        {type === 'submit' &&
            <div className={styles.submitInputWrapper}>
                <input
                    type="submit"
                    onSubmit={onSubmit}
                    className={styles.submitInput}
                    value={"submit"}
                />
            </div>
        }
        </>
    )
}