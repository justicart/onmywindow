import React, {useContext, useEffect, useRef, useState} from 'react';
import {NyeContext} from '../contexts/NyeContext';
import './firework.css';

function Firework({left, top, color}) {
  const stroke = color || '#fff';
  return (
    <div className="firework" style={{left: `${left}px`, top: `${top}px`}}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      	 viewBox="0 0 792 612" style={{enableBackground: "new 0 0 792 612"}} xmlSpace="preserve">
      <g id="Layer_1">
      	<line className="line" x1="396" y1="166.8" x2="396" y2="612"/>
      </g>
      <g id="Layer_2">
      	<g>
      		<path className="st0" style={{stroke}} d="M388.24,167.01c-33.65-17.12-23.85-36.37-57.49-53.49s-43.44,2.13-77.09-14.99"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M388.53,169.29c-37.17-6.45-33.48-27.73-70.65-34.19c-37.17-6.45-40.86,14.83-78.03,8.38"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M389.47,171.39c-37.39,4.78-40.13-16.65-77.53-11.86s-34.65,26.21-72.05,30.99"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M391,173.12c-34.3,15.58-43.23-4.09-77.53,11.49s-25.36,35.25-59.66,50.83"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M392.97,174.32c-28.15,24.99-42.49,8.83-70.65,33.82s-13.82,41.14-41.97,66.13"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M395.2,174.89c-19.51,32.17-37.98,20.96-57.49,53.13c-19.51,32.17-1.04,43.37-20.56,75.54"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M397.5,174.76c-9.14,36.48-30.09,31.23-39.23,67.71s11.82,41.73,2.68,78.21"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M399.67,173.97c2.05,37.54-19.52,38.72-17.47,76.26c2.05,37.54,23.62,36.37,25.66,73.91"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M401.49,172.57c13.05,35.26-7.21,42.76,5.84,78.02s33.31,27.76,46.35,63.02"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M402.83,170.7c22.89,29.84,5.75,42.98,28.64,72.82s40.03,16.69,62.92,46.53"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M403.55,168.52c30.69,21.76,18.2,39.38,48.9,61.13s43.18,4.13,73.88,25.89"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M403.6,166.22c35.77,11.73,29.04,32.26,64.81,43.99c35.77,11.73,42.5-8.79,78.27,2.94"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M402.97,164.02c37.66,0.66,37.29,22.26,74.95,22.91c37.66,0.66,38.04-20.94,75.71-20.28"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M401.72,162.1c36.21-10.48,42.22,10.27,78.43-0.22s30.21-31.23,66.42-41.71"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M399.96,160.63c31.54-20.7,43.39-2.64,74.93-23.34s19.69-38.76,51.23-59.46"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M397.85,159.74c24.06-29.09,40.71-15.32,64.77-44.4c24.06-29.09,7.42-42.86,31.48-71.94"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M395.57,159.52c14.45-34.9,34.4-26.63,48.85-61.53s-5.51-43.16,8.94-78.06"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M393.32,159.97c3.55-37.62,25.05-35.59,28.6-73.2s-17.96-39.64-14.41-77.26"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M391.31,161.06c-7.67-37,13.48-41.38,5.81-78.38c-7.67-37-28.82-32.61-36.49-69.61"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M389.7,162.7c-18.21-33.1,0.72-43.51-17.5-76.62c-18.21-33.1-37.14-22.69-55.35-55.8"/>
      	</g>
      	<g>
      		<path className="st0" style={{stroke}} d="M388.65,164.74c-27.13-26.28-12.11-41.79-39.24-68.07c-27.13-26.28-42.16-10.76-69.29-37.03"/>
      	</g>
      </g>
      </svg>
    </div>
  );
}

function Emitter({delay}) {
  const [showFirework, setShowFirework] = useState(false);
  const {showColors} = useContext(NyeContext);
  const timerRef = useRef();
  useEffect(() => {
    timerRef.current = setTimeout(setShowFirework, delay, true);
    return () => {
      clearTimeout(timerRef.current);
    }
  }, [delay])

  const left = useRef(Math.floor(Math.random() * (500 - -500 + 1) + -500));
  const top = useRef(Math.floor(Math.random() * (120 - -30 + 1) + -30));
  const r = Math.floor(Math.random() * 155) + 100;
  const g = Math.floor(Math.random() * 155) + 100;
  const b = Math.floor(Math.random() * 155) + 100;
  const color = `rgb(${r}, ${g}, ${b})`;

  return showFirework &&
    <Firework
      color={showColors ? color : null}
      left={left.current}
      top={top.current}
    />
}

function Fireworks() {
  return (
    <div className="fireworks">
      <Emitter delay={0} /> {/* make sure one starts immediately */}
      {Array(9).fill(null).map(() => {
        const delay = Math.floor(Math.random() * 4000);
        return <Emitter delay={delay} key={delay} />
      })}
    </div>
  )
}

export default Fireworks;
