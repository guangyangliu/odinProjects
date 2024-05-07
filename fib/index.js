function fibs(n) {
    let fibArray = [];
    for (let i = 1; i <= n; i++) {
        fibArray.push(fibIter(i));
    }
    return fibArray;
}

function fibIter(n) {
    if (n <= 2) {
        return n - 1;
    }
    let f1 = 0;
    let f2 = 1;
    let fn;
    for (let i = 3; i <= n; i++) {
        fn = f1 + f2;
        f1 = f2;
        f2 = fn;
    }
    return fn;
}


function fibsRec (n) {
    let fibArray = [];
    for (let i = 1; i <= n; i++) {
        fibArray.push(nthFib(i));
    }
    return fibArray;

}

function nthFib(n) {
    if (n === 1 || n === 2) {
        return n - 1;
    }
    return nthFib(n-2) + nthFib(n-1);
}