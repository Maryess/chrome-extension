import { ContactsPage } from "pages/Contacts";
import { HomePage } from "pages/Home";
import { SettingsPage } from "pages/Settings";

export const routeData = [{
    path:'/*',
    element:<HomePage/>
},
{
    path:'/contacts',
    element:<ContactsPage/>
},
{
    path:'/settings',
    element:<SettingsPage/>
}
]