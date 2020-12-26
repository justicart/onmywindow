
import './App.css';
import {useEffect, useRef, useState} from 'react';

import {holidays} from './holidays';
import Projection from './components/Projection';

function App() {
  const [override, setOverride] = useState();
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [editing, setEditing] = useState(false);
  const appRef = useRef();
  const mouseMoveTimerRef = useRef();

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
      {showTest && <div className="template" />}
      <Projection override={override} editing={editing} />
      <div className={`buttons ${isFullscreen && buttonsHidden ? 'hide' : ''}`}>
        <div className="buttonGroup">
          <div
            className={`button ${override == null ? 'selected' : ''}`}
            onClick={() => setOverride()}
          >Auto</div>
          {overrideButtons}
        </div>
        <div className="buttonGroup">
          <div
            className={`button ${showTest ? 'selected' : ''}`}
            onClick={() => setShowTest(!showTest)}
          >Test</div>
          <div
            className={`button ${isFullscreen ? 'selected' : ''}`}
            onClick={requestFullscreen}
          >Fullscreen</div>
        </div>
        <div className="buttonGroup">
          <div
            className={`button ${editing ? 'selected' : ''}`}
            onClick={() => setEditing(!editing)}
          >Edit</div>
        </div>
      </div>
    </div>
  );
}

export default App;
