import { FaRegTrashCan } from 'react-icons/fa6'
import styles from '../Home.module.scss'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { ChangeEvent } from 'react'

type Props = {
    addImg: (e:ChangeEvent<HTMLInputElement>)=>void;
    removeImg: ()=>void;
}

export const Panel = ({addImg, removeImg}:Props) => {
    return (
        <div className={styles.panel}>
            {/* <div className={styles.inputPlus}>
                <input type="file" id="plus" onChange={addImg}/>
                <label htmlFor="plus"><IoMdAddCircleOutline /></label>
            </div> */}
            <FaRegTrashCan onClick={removeImg}/>
        </div>
    )
}