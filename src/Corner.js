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
    element.addEventListener('touchstart', mousedown);
    element.addEventListener('touchend', mouseup);
    return () => {
      element.removeEventListener('mousedown', mousedown);
      element.removeEventListener('mouseup', mouseup);
      element.removeEventListener('touchstart', mousedown);
      element.removeEventListener('touchend', mouseup);
    }
  });

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
