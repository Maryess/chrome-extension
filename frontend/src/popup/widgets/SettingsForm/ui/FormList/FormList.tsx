import { ThemeSwitcher } from 'features/ThemeSelector'
import styles from './FormList.module.scss'
import { Heading } from 'shared/ui/Heading'
import { Controller, useForm } from 'react-hook-form'
import { setToChromeStorage } from 'shared/lib/helpers/chromeStorage'
import { useContext } from 'react'
import { ThemeContext } from 'app/providers/Theme/context'
import { FieldItem } from './FieldItem'

type SettingsFormValue = {
    theme:string;
    opacity:string;
    imagesCount:string;
}

export const FormList = () => {
    const { setTheme } = useContext(ThemeContext);
  
    const { register, formState: { errors }, handleSubmit, control } = useForm<SettingsFormValue>({
      mode: 'onChange'
    });
  
    const handleOnSubmit = (data: SettingsFormValue) => {
      setToChromeStorage('settingsData', data);
    };
  
    return (
      <form className={styles.settings} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={styles.group}>
          <Heading title="choose theme" />
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <ThemeSwitcher
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setTheme(value);
                }}
              />
            )}
          />
        </div>

        <FieldItem
          type="number"
          placeholder="0.5"
          step="0.1"
          min="0"
          max="1"
          title="opacity"
          error={errors.opacity?.message}
          {...register("opacity", {
            required: "Opacity is required",
            pattern: {
              value: /^(0(\.\d+)?|1(\.0)?)$/,
              message: "Must be between 0 and 1",
            },
          })}
        />
        <FieldItem
          type="number"
          title="image count"
          placeholder="1"
          min="1"
          max="3"
          step="1"
          error={errors.imagesCount?.message}
          {...register("imagesCount", {
            required: "Images count is required",
              pattern: {
                value: /^[1-5]$/,
                message: "Must be between 1 and 5"
              }            
          })}
        />
  
        <div className={styles.footer}>
          <button type="submit">Save</button>
        </div>
      </form>
    );
  };
  