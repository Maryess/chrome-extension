import { ImagePanelSettings, UploadImage, useUploadImages } from 'features/ImageUpload';
// import styles from './ImageUploader.module.scss'
import { DragOpacity, useDragOpacity } from 'features/DragControl';
import { removeFromChromeStorage } from 'shared/lib/helpers/chromeStorage';
import { ImagePreview } from 'entities/ImagePreview';
import { DistanceInfo } from 'features/DistanceInfo';

export const ImageUploader = () => {
    const {imageValue, uploadImage,setImageValue,file} = useUploadImages()
    const {positionValue,opacityValue,handleMouseDown} = useDragOpacity()

     return (
          <div>
            {!imageValue ?
              <UploadImage uploadImage={
                uploadImage
              }/>
            :
              <div>
                <DragOpacity 
                positionBtn={positionValue} 
                opacity={opacityValue} 
                handleMouseDown={handleMouseDown}/>
                <ImagePanelSettings 
                addImg={()=>uploadImage} 
                removeImg={()=>{
                  removeFromChromeStorage('selected image')
                  setImageValue('')
                  }}/>
                <ImagePreview 
                opacity={opacityValue} 
                imageUrl={imageValue} 
                fileName={file?.name}/>
                <DistanceInfo/>
              </div>
            }
          </div>
        );
}