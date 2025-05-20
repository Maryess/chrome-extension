interface IPosition{
    x:number;
    y:number;
} 

export interface IDistancePopup {
    px:number ;
    rem:number;
    vh:number;
    vw:number;
    position:IPosition;
    firstClick:IPosition | undefined;
    secondClick:IPosition | undefined;
    isDragging?:boolean;
}
