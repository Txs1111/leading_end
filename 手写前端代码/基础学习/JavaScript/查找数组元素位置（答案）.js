// 1
/* function indexOf(arr, item) {
    return (arr.indexOf(item));
} */
// 2
/* function indexOf(arr, item) {
    return arr.indexOf(item);
} */
// 3
/* function indexOf(arr, item) {
    while (arr.length > 0) {
        return arr.indexOf(item);
    }
    return -1;
} */
// 4
/* function indexOf(arr, item) {
    return arr.indexOf(item)
} */
//  5
/* function indexOf(arr, item) {
    return arr.indexOf(item)
} */
// 6
/* function indexOf(arr, item) {
    if (Array.prototype.indexOf) {
        return arr.indexOf(item);
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
    }
    return -1;
} */
// 7
/* function indexOf(arr, item) {
    return arr.indexOf(item);
} */
// 8
/* function indexOf(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return i
        }
    }
    return -1
} */
// 9
/* function indexOf(arr, item) {
    return (arr.indexOf(item));
} */
// 10
/* function indexOf(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return i;
        }
    }
    return -1;
}
indexOf([1, 2, 3, 4], 3); */