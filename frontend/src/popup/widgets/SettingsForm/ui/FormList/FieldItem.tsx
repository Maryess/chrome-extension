import { Heading } from 'shared/ui/Heading';
import { Field } from 'shared/ui/Field';
import { InputHTMLAttributes } from 'react';
import styles from './FormList.module.scss'

type Props = {
  title: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FieldItem = ({ title, error, ...inputProps }: Props) => (
  <div className={styles.group}>
    <Heading title={title} />
    <Field {...inputProps} />
    {error && <div style={{ color: 'red', fontSize: 12 }}>{error}</div>}
  </div>
);
