var foo = { 
  n: 1
}

var arr = [foo];

function m1(arr) {
  var bar = arr[0];
  arr.push(bar);
  bar.n ++;
  arr = [bar];
  arr.push(bar);
  arr[1].n++;
}
m1(arr)
console.log(arr);