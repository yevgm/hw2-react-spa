export function ShuffleArray(o:number[]) {
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

export function NameToUpper(name:string){
    return name.charAt(0).toUpperCase() + name.slice(1)
}