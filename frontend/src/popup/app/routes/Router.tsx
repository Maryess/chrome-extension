import { Contacts, Home } from "pages/index"
import { Route, Routes } from "react-router-dom"

const routeData = [{
    path:'/',
    element:<Home/>
},
{
    path:'/contacts',
    element:<Contacts/>
}]

export const Router = () => {
    return(
        <Routes>
            {routeData.map((element)=>(
                <Route key={element.path} path={element.path} element={element.element}/>
            ))}
        </Routes>
    )
}