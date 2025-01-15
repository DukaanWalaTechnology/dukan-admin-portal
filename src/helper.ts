export function setItemInLocalstorage(key:string,value:string):void{
    localStorage.setItem(key,JSON.stringify(value))
}

export function getItemFromLocalStorage(key:string){
    return localStorage.getItem(key)||null
}