export function NumberingFormat(value){
    console.log(value);
    const result = value.toLocaleString('en-US');

    return result.replace(",",".");
}