export function setItemInLocalstorage(key:string,value:string):void{
    localStorage.setItem(key,JSON.stringify(value))
}

export function getItemFromLocalStorage(key:string){
    return localStorage.getItem(key)||null
}
export function removeItemFromLocalStorage(key:string){
    localStorage.removeItem(key)
}