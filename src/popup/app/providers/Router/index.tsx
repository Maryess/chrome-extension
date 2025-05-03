import { Router } from "app/routes/Router"
import { ReactNode } from "react"
import { BrowserRouter, MemoryRouter } from "react-router-dom"

type Props = {
}

export default () =>{
    return(
        <MemoryRouter>
            <Router/>
        </MemoryRouter>
    )
}