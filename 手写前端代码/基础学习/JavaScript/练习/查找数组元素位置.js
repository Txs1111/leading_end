function indexOf(arr, item) {
    arr = [1, 2, 3, 4];
    item = 3;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            console.log(i);
            return i;
        }
    }
    return -1;
}
indexOf([1, 2, 3, 4], 3);