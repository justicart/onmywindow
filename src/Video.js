import React from 'react';

function Video({src, type}) {
  return (
    <video autoPlay loop muted playsInline>
      <source src={src} type={type} />
    </video>
  );
}

export default Video;
