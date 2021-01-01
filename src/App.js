import logo from './static/window_color.png';
import './App.css';
import {useContext, useEffect, useRef, useState} from 'react';
import {AppContext, AppProvider} from './context';

import {holidays} from './projections/holidays';
import Projection from './components/Projection';
import ClearButton from './components/ClearButton';

function Content() {
  const [override, setOverride] = useState();
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isReversed, setIsReversed] = useState(true);
  const {add2, setAdd2} = useContext(AppContext);
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
      <Projection override={override} editing={editing} reversed={isReversed} />
      <div className={`header ${isFullscreen && buttonsHidden ? 'hide' : ''}`}>
        <img src={logo} className="logo" alt="window logo" />
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
          <div
            className={`button ${isReversed ? 'selected' : ''}`}
            onClick={() => setIsReversed(!isReversed)}
          >Reverse</div>
          <div
            className={`button ${add2 ? 'selected' : ''}`}
            onClick={() => setAdd2(!add2)}
          >+2 Hours</div>
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

function App() {
  return (
    <AppProvider>
      <Content />
    </AppProvider>
  )
}

export default App;
