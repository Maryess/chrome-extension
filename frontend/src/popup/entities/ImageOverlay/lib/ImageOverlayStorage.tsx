import { getFromChromeStorage } from "shared/lib/helpers/chromeStorage";
import { IOpacity } from "shared/types/image";

export const ImageOverlayStorage = () => {
    const getImageData = () => {
       return getFromChromeStorage<{ name: string; path: string }>('selected image')
    }
    
    const getOpacityData = () => {
       return getFromChromeStorage<IOpacity>('dragOpacity');
    }

    return{
        getImageData,
        getOpacityData
    }
}