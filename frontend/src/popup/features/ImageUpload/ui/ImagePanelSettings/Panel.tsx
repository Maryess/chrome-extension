import { FaRegTrashCan,FaRegSquarePlus } from 'react-icons/fa6'
import styles from './Panel.module.scss'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ChangeEvent } from 'react'

type Props = {
    addImg: ()=>void;
    removeImg: ()=>void;
}

export const Panel = ({addImg, removeImg}:Props) => {
    return (
        <div className={styles.panel}>
            <FaRegTrashCan onClick={removeImg}/>
            <FaRegSquarePlus onClick={()=> addImg}/>      
        </div>
    )
}