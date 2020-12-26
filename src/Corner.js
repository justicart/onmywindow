import React, {useEffect, useRef} from 'react';

function Corner({
  editing,
  update,
  setCorners,
  corners,
  corner,
  currentCorner,
  setCurrentCorner,
  i,
}) {
  const cornerRef = useRef();
  useEffect(() => {
    const element = cornerRef.current;
    element.addEventListener('mousedown', mousedown);
    element.addEventListener('mouseup', mouseup);
    element.addEventListener('mousemove', move);
    element.addEventListener('touchstart', mousedown);
    element.addEventListener('touchend', mouseup);
    element.addEventListener('touchmove', move);
    return () => {
      element.removeEventListener('mousedown', mousedown);
      element.removeEventListener('mouseup', mouseup);
      element.removeEventListener('mousemove', move);
      element.removeEventListener('touchstart', mousedown);
      element.removeEventListener('touchend', mouseup);
      element.removeEventListener('touchmove', move);
    }
  });

  function move(event) {
    event.preventDefault();
    if (editing !== true) {
      return;
    };
    if (currentCorner < 0) return;
    const cornersArr = [...corners];
    let x, y;
    if (event.touches != null) {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    } else {
      x = event.pageX;
      y = event.pageY;
    }
    cornersArr[currentCorner] = {x, y}
    setCorners(cornersArr);
    update();
  }

  function mousedown() {
    setCurrentCorner(i);
  }

  function mouseup() {
    setCurrentCorner(-1);
  }
  return (
    <div
      className="corner"
      style={{left: `${corner.x}px`, top: `${corner.y}px`}}
      ref={cornerRef}
    >{i}</div>
  );
}

export default Corner;
