import { Auth, Contacts, Home, Settings } from "pages/index";
import path from "path";

export const routeData = [{
    path:'/*',
    element:<Home/>
},
{
    path:'/contacts',
    element:<Contacts/>
},
{
    path:'/settings',
    element:<Settings/>
}
]