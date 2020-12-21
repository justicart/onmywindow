import './App.css';
import {useEffect, useRef, useState} from 'react';
import {SEC_IN, UNITS} from './constants';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const getTimeLeft = () => {
  const countdownToDate = new Date("Jan 01, 2021");
  // const countdownToDate = new Date("Dec 20, 2020 18:27:00");
  const currentTime = new Date();
  const timeLeft = (countdownToDate - currentTime) / 1000;
  const seconds = Math.floor( timeLeft % 60 );
  const minutes = Math.floor( (timeLeft/SEC_IN.MINUTE) % 60 );
  const hours = Math.floor( (timeLeft/SEC_IN.HOUR) % 24 );
  const days = Math.floor( timeLeft/SEC_IN.DAY );
  return {
    total: timeLeft,
    [UNITS.DAYS]: days,
    [UNITS.HOURS]: hours,
    [UNITS.MINUTES]: minutes,
    [UNITS.SECONDS]: seconds,
  };
}

function Panel({timeLeft, unit}) {
  const [animate, setAnimate] = useState(false);
  const number = timeLeft[unit];
  const previousNumber = usePrevious(number);
  useEffect(() => {
    if (previousNumber !== number) {
      setAnimate(true);
      setTimeout(setAnimate, 1000, false);
    }
  }, [number, previousNumber]);
  let progress = 0;
  let endText = '';
  let showEndText = false;
  let displayNumber = number;
  switch (unit) {
    case UNITS.DAYS:
      progress = timeLeft[UNITS.HOURS] / 24;
      endText = 'Happy';
      showEndText = timeLeft.total < SEC_IN.DAY;
      break;
    case UNITS.HOURS:
      progress = timeLeft[UNITS.MINUTES] / 60;
      endText = 'New';
      showEndText = timeLeft.total < SEC_IN.HOUR;
      break;
    case UNITS.MINUTES:
      progress = timeLeft[UNITS.SECONDS] / 60;
      endText = 'Year';
      showEndText = timeLeft.total < 1;
      if (timeLeft.total < SEC_IN.MINUTE) {
        displayNumber = timeLeft[UNITS.SECONDS];
      }
      break;
    default:
      progress = 0;
  }
  return (
    <div className="panel">
      {showEndText ? (
        <div className={`endText${animate ? ' animate' : ''}`}>{endText}</div>
      ) : (
        <div className={`unit${animate ? ' animate' : ''}`}>{displayNumber}</div>
      )}
      <div className="progress">
        <div className="bar" style={{width: `${progress * 100}%`}} />
      </div>
    </div>
  )
}

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const requestRef = useRef();
  const appRef = useRef();
  useEffect(() => {
    setTimeLeft(getTimeLeft());
    requestRef.current = setInterval(setTimeLeft, 1000, getTimeLeft);
    return () => clearInterval(requestRef.current);
  }, []);
  useEffect(() => {
    if (timeLeft < 0) {
      clearInterval(requestRef.current);
    }
  }, [timeLeft]);

  const requestFullscreen = () => {
    if (document.fullscreenElement) {
      return document.exitFullscreen();
    }
    appRef.current.requestFullscreen();
  }

  return (
    <div className="App" ref={appRef} onClick={requestFullscreen}>
      {false && <div className="template" />}
      <div className="window">
        <div className="mirror">
          <div className="content">
            <Panel timeLeft={timeLeft} unit={UNITS.DAYS} />
            <Panel timeLeft={timeLeft} unit={UNITS.HOURS} />
            <Panel timeLeft={timeLeft} unit={UNITS.MINUTES} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
