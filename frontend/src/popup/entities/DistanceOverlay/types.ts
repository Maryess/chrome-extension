type IPosition = {
    x:number;
    y:number;
} | null

export interface IDistancePopup {
    px:number ;
    rem:number;
    vh:number;
    vw:number;
    position:IPosition;
    firstClick:IPosition;
    secondClick:IPosition;
    isDragging?:boolean;
    isVisible?:boolean;
}
