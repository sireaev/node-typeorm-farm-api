const containsDigit = (string = 'test-string') => {
    return /\d/.test(string);
}

console.log(containsDigit('qdqwdqwq23'));
