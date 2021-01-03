import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import heart from './heart';

function Valentines() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <P5Wrapper sketch={heart} width={1280} height={720} />
    </div>
  );
}

export default Valentines;
