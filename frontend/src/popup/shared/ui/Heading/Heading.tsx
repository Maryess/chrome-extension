import styles from './Heading.module.scss';

type Props ={
    title:string;
}

export default ({title}:Props)=>{
    return(
        <div className={styles.heading}>
        <span>
            {title}
        </span>
        </div>
    )
}