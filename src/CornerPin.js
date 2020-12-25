import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useLocalStorage} from './hooks/useLocalStorage';

function adj(m) { // Compute the adjugate of m
  return [
    m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
    m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
    m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
  ];
}
function multmm(a, b) { // multiply two matrices
  const c = Array(9);
  for (let i = 0; i !== 3; ++i) {
    for (let j = 0; j !== 3; ++j) {
      let cij = 0;
      for (let k = 0; k !== 3; ++k) {
        cij += a[3*i + k]*b[3*k + j];
      }
      c[3*i + j] = cij;
    }
  }
  return c;
}
function multmv(m, v) { // multiply matrix and vector
  return [
    m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
    m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
    m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
  ];
}
function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  const m = [
    x1, x2, x3,
    y1, y2, y3,
     1,  1,  1
  ];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [
    v[0], 0, 0,
    0, v[1], 0,
    0, 0, v[2]
  ]);
}
function general2DProjection(
  x1s, y1s, x1d, y1d,
  x2s, y2s, x2d, y2d,
  x3s, y3s, x3d, y3d,
  x4s, y4s, x4d, y4d
) {
  const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
  const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
  return multmm(d, adj(s));
}

function CornerPin({children}) {
  const box = useRef();
  const [corners, setCorners] = useLocalStorage('corners', [
    {x: 100, y: 100},
    {x: 300, y: 100},
    {x: 100, y: 300},
    {x: 300, y: 300},
  ]);
  const [currentCorner, setCurrentCorner] = useState(-1);
  const [transform, setTransform] = useState();

  useEffect(() => {
    update();
    window.addEventListener('mousedown', drag);
    window.addEventListener('mouseup', mouseup);
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousedown', drag);
      window.removeEventListener('mouseup', mouseup);
      window.removeEventListener('mousemove', move);
    }
  });

  function transform2d(elt, x1, y1, x2, y2, x3, y3, x4, y4) {
    const w = elt.current.offsetWidth, h = elt.current.offsetHeight;
    let t = general2DProjection
      (0, 0, x1, y1, w, 0, x2, y2, 0, h, x3, y3, w, h, x4, y4);
    for(let i = 0; i !== 9; ++i) t[i] = t[i]/t[8];
    t = [t[0], t[3], 0, t[6],
         t[1], t[4], 0, t[7],
         0   , 0   , 1, 0   ,
         t[2], t[5], 0, t[8]];
    t = "matrix3d(" + t.join(", ") + ")";
    setTransform(t);
  }

  function update() {
    transform2d(box, corners[0].x, corners[0].y, corners[1].x, corners[1].y,
                     corners[2].x, corners[2].y, corners[3].x, corners[3].y);
  }

  function move(event) {
    if (currentCorner < 0) return;
    const cornersArr = [...corners];
    cornersArr[currentCorner] = {
      x: event.pageX,
      y: event.pageY,
    }
    setCorners(cornersArr);
    update();
  }

  function drag(event) {
    event.preventDefault();
    const x = event.pageX, y = event.pageY;
    let dx, dy;
    let best = 400; // 20px grab radius
    setCurrentCorner(-1);
    for (let i = 0; i !== 4; i += 1) {
      dx = x - corners[i].x;
      dy = y - corners[i].y;
      if (best > dx*dx + dy*dy) {
        best = dx*dx + dy*dy;
        setCurrentCorner(i);
      }
    }
  }

  function mouseup() {
    setCurrentCorner(-1);
    console.log(corners);
  }

  const cornerElements = corners.map((corner, i) => {
    return (
      <div className="corner" key={`corner${i}`} style={{left: `${corner.x}px`, top: `${corner.y}px`}} />
    )
  })

  return (
    <>
      <div className="window" ref={box} style={{transform}}>
        {children}
      </div>
      {cornerElements}
    </>
  );
}

export default CornerPin;
