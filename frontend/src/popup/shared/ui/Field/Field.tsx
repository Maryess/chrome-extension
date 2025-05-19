import { forwardRef, InputHTMLAttributes } from "react";
import styles from './Field.module.scss';

type Props = {
    label?: string;
    error?: string;
  } & InputHTMLAttributes<HTMLInputElement>;

export const Field = forwardRef<HTMLInputElement, Props>(
  ({ type, label, className, ...rest }, ref) => {
    if (type === "file") {
      return (
        <div className={styles.fileInputWrapper}>
          <input
            id="fileInput"
            className={styles.fileInput}
            type="file"
            ref={ref}
            {...rest}
          />
          <label htmlFor="fileInput" className={styles.fileInputLabel}>
            {label || "Choose file"}
          </label>
        </div>
      );
    }

    if (type === "submit") {
      return (
        <div className={styles.submitInputWrapper}>
          <input
            type="submit"
            ref={ref}
            className={styles.submitInput}
            value={label || "Submit"}
            {...rest}
          />
        </div>
      );
    }

    return (
      <div className={styles.inputWrapper}>
        <input
          type={type}
          ref={ref}
          className={`${styles.input} ${className || ""}`}
          {...rest}
        />
      </div>
    );
  }
);

Field.displayName = "Field";
