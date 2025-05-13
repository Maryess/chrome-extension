import { Field } from 'shared/ui/Field';
import styles from './UploadImage.module.scss'
import { ChangeEvent } from 'react';

type Props = {
    uploadImage: (e:ChangeEvent<HTMLInputElement>)=>void;
}

export const UploadImage = ({uploadImage}:Props) => {
    return (
        <div className={styles.upload}>
            <Field
                onChange={uploadImage}
                type="file"
                placeholder="Choose file"
            />
        </div>
    )
}