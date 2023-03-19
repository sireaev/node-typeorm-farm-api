
const numberToStrings = (arr = ['super', '20.5', 'test', '23']) => {
    return arr.map(e => !isNaN(e) ? +e : e);
}

console.log(numberToStrings());
