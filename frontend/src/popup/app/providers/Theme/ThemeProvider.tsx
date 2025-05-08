import { ReactNode, useEffect } from "react"
import { useThemeStore } from "store/store"

export default ({children}:{children:ReactNode})=>{
    const theme = useThemeStore((s)=>s.theme)
    const getTheme = useThemeStore((s)=>s.getTheme)
    useEffect(()=>{
        getTheme()
    },[])
    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
    },[theme])
    return (
        <>
            {children}
        </>
    )
}