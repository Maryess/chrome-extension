import { Heading } from 'shared/ui';
import styles from '../Home.module.scss'

type Props = {
    imageUrl:string;
    opacity:number;
    fileName:string | undefined;
}

export const ImagePreview = ({imageUrl, opacity, fileName}:Props) => {
    return (
        <>
            <Heading title="images"/>
            <div className={styles.images}>
                <img src={imageUrl} style={{ opacity }} alt={fileName} />
            </div>
        </>
    )
} 