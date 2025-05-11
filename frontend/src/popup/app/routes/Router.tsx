import { Route, Routes } from "react-router"
import { routeData } from "./route.data"

export const Router = () => {
    return(
        <Routes>
            {routeData.map((element)=>(
                <Route key={element.path} path={element.path} element={element.element}/>
            ))}
        </Routes>
    )
}