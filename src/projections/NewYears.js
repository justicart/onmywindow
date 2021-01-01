import React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import usePrevious from '../hooks/usePrevious';
import {SEC_IN, UNITS} from '../constants';
import Fireworks from './Fireworks';
import {AppContext} from '../context';

const getTimeLeft = (add2) => {
  let countdownToDate = new Date("Jan 01, 2021");
  if (add2) {
    countdownToDate = new Date("Dec 31, 2020 22:00:00")
  }
  // const countdownToDate = new Date("Dec 31, 2020 19:30:00");
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

function NewYears() {
  const [timeLeft, setTimeLeft] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const requestRef = useRef();
  const {add2} = useContext(AppContext);

  useEffect(() => {
    const handleInterval = () => {
      setTimeLeft(getTimeLeft(add2));
    }
    setTimeLeft(getTimeLeft(add2));
    requestRef.current = setInterval(handleInterval, 1000);
    return () => clearInterval(requestRef.current);
  }, [add2]);

  useEffect(() => {
    if (timeLeft.total <= 0) {
      setShowFireworks(true);
      clearInterval(requestRef.current);
    }
  }, [timeLeft]);

  return (
    <>
      <div className="content">
        <Panel timeLeft={timeLeft} unit={UNITS.DAYS} />
        <Panel timeLeft={timeLeft} unit={UNITS.HOURS} />
        <Panel timeLeft={timeLeft} unit={UNITS.MINUTES} />
      </div>
      {showFireworks && <Fireworks />}
    </>
  );
}

export default NewYears;
