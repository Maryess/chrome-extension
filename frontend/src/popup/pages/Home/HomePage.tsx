import {useEffect, useState } from "react";
import styles from './Home.module.scss'
import { removeFromChromeStorage } from "shared/lib/helpers/chromeStorage";
import { removeFromLocalStorage } from "shared/lib/helpers/localStorage";
import { ImagePreview } from "entities/ImagePreview";
import { DragOpacity, Panel, UploadImage, useUploadImages,useDragOpacity } from "widgets/ImageUploadWrapper";
import { ImageUploader } from "widgets/ImageUploader";

export const Page = () => {
     return (
      <ImageUploader/>
    );
};
