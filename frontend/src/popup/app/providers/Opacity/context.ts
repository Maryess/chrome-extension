import { createContext, useContext } from "react";

interface IOpacity {
    opacityValue:number;
    setOpacity:(value:number)=>void;
}

export const OpacityContext = createContext<IOpacity | undefined>(undefined)

export const useOpacity = () => useContext(OpacityContext)