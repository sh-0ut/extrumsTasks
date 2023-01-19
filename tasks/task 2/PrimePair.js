const mutualMod= (x, m) => {
  if (!(0 <= x && x < m))
    throw new Error();
  let y = x;
  x = m;
  let a = 0;
  let b = 1;
  while (y != 0) {
    let z = x % y;
    let c = a - x / y * b;
    x = y;
    y = z;
    a = b;
    b = c;
  }
  if (x == 1)
    return a >= 0 ? a : a + m;
  else
    throw new Error("Not exist");
}

const getPrimes = (n)=> {
  var array = [], limit = Math.sqrt(n), result = [];

    for (var i = 2; i < n; i++) {
        array.push(true);
    }

    for (var i = 2; i <= limit; i++) {
        if (array[i]) {
            for (var j = i * i; j < n; j += i) {
                array[j] = false;
            }
        }
    }

    for (var i = 2; i < n; i++) {
        if(array[i]) {
            result.push(i);
        }
    }
    return result;
};


const main = () => {
  let sum = 0;
  let primes = getPrimes(5000000);

  for (let i = 2; primes[i] <= 1000000; i++) {
    let f = primes[i];
    let s = primes[i + 1];

    let k = 1;
    while (k < f)
      k *= 10;

    let m = (s - f) * mutualMod(k % s, s) % s;

    sum += m * k + f;
  }
  return sum;
}

console.log(main());
