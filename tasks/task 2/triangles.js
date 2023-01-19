const fs = require('node:fs');

const data = fs.readFileSync('./p102_triangles.txt', 'utf-8').split('\n');


function area(x1, y1, x2, y2, x3, y3)
{
return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
}

function isInside(x1, y1, x2, y2, x3, y3, x, y)
{

let A = area (x1, y1, x2, y2, x3, y3);
let A1 = area (x, y, x2, y2, x3, y3);
let A2 = area (x1, y1, x, y, x3, y3);
let A3 = area (x1, y1, x2, y2, x, y);

return (A == A1 + A2 + A3);
}



data.forEach((val, index, arr)=>{
  let triangleCord = val.split(',');

  if (!triangleCord) return;

  let [x1,y1,x2,y2,x3,y3] = triangleCord;

  if(isInside(x1, y1, x2, y2, x3, y3, 0, 0)){
    console.log('triangle ' + val + ' contains the origin');
  }

})
