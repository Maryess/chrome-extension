import { Heading } from 'shared/ui/Heading';
import styles from './DragOpacity.module.scss'

type Props = {
    opacity:number;
    positionBtn:number;
    handleMouseDown: ()=>void;
}

export const DragOpacity = ({positionBtn,handleMouseDown}:Props) => {
    return (
        <div className={styles.settings}>
            <Heading title="change opacity"/>
                <div className={styles.opacity}>
                    <button 
                    onMouseDown={handleMouseDown} 
                    className={styles.btn} style={{
                        left:positionBtn
                    }}></button>
                </div>
        </div>
    )
}