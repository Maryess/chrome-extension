import { useDragOpacity } from "shared/hooks/useDragOpacity";
import { getFromChromeStorage } from "shared/lib/helpers/chromeStorage";

type Opacity = {
   opacity:number;
   positionBtn:number;
}

export const getImageData = () => {
   return getFromChromeStorage<{ imageName: string; imageUrlBase64: string }>('selected image')
}

export const getOpacityData = () => {
   return getFromChromeStorage<Opacity>('dragOpacity');
}