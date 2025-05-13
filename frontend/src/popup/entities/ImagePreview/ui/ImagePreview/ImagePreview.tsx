import { Heading } from 'shared/ui/Heading';
import styles from './ImagePreview.module.scss'

type Props = {
    imageUrl:string;
    opacity:number;
    fileName:string | undefined;
}

export const ImagePreview = ({imageUrl, opacity, fileName}:Props) => {
    return (
        <div className={styles.images}>
            <Heading title="images"/>
            <div className={styles.preview}>
                <img src={imageUrl} style={{ opacity:opacity,transition:'opacity 0.3s ease' }} alt={fileName} />
            </div>
        </div>
    )
} 