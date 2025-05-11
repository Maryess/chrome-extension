export const setToChromeStorage = (key:string, value:any) => {
    chrome.storage.local.set({[key]:value})
}

export const getFromChromeStorage = <T = any>(key:string):Promise<T | null> => {
  return new Promise((resolve)=>{
    chrome.storage.local.get(key,(result)=>{
        resolve(result[key] ?? null)
    })
  })
}

export const removeFromChromeStorage = (key:string) => {
    chrome.storage.local.remove(key)
}