
import './App.css';
import {useEffect, useRef, useState} from 'react';

import {holidays} from './holidays';
import Projection from './components/Projection';
import ClearButton from './ClearButton';

function getDate () {
  return new Date();
}

function App() {
  const [override, setOverride] = useState();
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentDate, setCurrentDate] = useState(getDate());
  const appRef = useRef();
  const mouseMoveTimerRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    dateRef.current = setInterval(setCurrentDate, 1000, getDate);
    return () => clearInterval(dateRef.current);
  }, []);

  useEffect(() => {
    if (buttonsHidden === false) {
      mouseMoveTimerRef.current = setTimeout(setButtonsHidden, 2000, true);
    }
    return () => {
      clearTimeout(mouseMoveTimerRef.current);
    }
  }, [buttonsHidden]);

  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  const requestFullscreen = () => {
    if (isFullscreen) {
      return document.exitFullscreen();
    }
    appRef.current.requestFullscreen();
  }

  const overrideButtons = holidays.map(holiday => {
    if (holiday.hide === true) return null;
    return <div
      className={`button ${override === holiday.slug ? 'selected' : ''}`}
      key={holiday.slug}
      onClick={() => setOverride(holiday.slug)}
    >{holiday.name}</div>
  })

  return (
    <div className="App" ref={appRef} onMouseMove={()=> setButtonsHidden(false)}>
      <Projection override={override} currentDate={currentDate} editing={editing} />
      <div className={`buttons ${isFullscreen && buttonsHidden ? 'hide' : ''}`}>
        <div className="buttonGroup">
          <div
            className={`button ${editing ? 'selected' : ''}`}
            onClick={() => setEditing(!editing)}
          >Edit</div>
        </div>
        <div className="buttonGroup">
          <div
            className={`button ${override == null ? 'selected' : ''}`}
            onClick={() => setOverride()}
          >Auto</div>
          {overrideButtons}
        </div>
        <div className="buttonGroup">
          <div
            className={`button ${isFullscreen ? 'selected' : ''}`}
            onClick={requestFullscreen}
          >Fullscreen</div>
        </div>
        {editing && <div className="buttonGroup">
          <ClearButton
            item="main"
            label="Clear Main"
          />
          <ClearButton
            item="mask"
            label="Clear Mask"
          />
        </div>}
      </div>
    </div>
  );
}

export default App;
