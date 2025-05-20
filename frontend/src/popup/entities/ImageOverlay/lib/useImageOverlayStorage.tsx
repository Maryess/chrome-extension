import { getFromChromeStorage } from "shared/lib/helpers/chromeStorage";
import { IImage, IOpacity } from "shared/types/image";

export const useImageOverlayStorage = () => {
    const getImageData = () => {
       return getFromChromeStorage<IImage>('selected image');
    }
    
    const getOpacityData = () => {
       return getFromChromeStorage<IOpacity>('dragOpacity');
    }

    return{
        getImageData,
        getOpacityData
    }
}