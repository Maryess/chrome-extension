import { ReactNode, useState } from "react"
import { OpacityContext } from "./context"

export const Provider = ({children}:{children:ReactNode}) => {

    const [opacityValue,setOpacity] = useState<number>(1)

    return(
        <OpacityContext.Provider value={{opacityValue,setOpacity}}>
            {children}
        </OpacityContext.Provider>
    )
}