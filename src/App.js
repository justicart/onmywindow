import logo from './static/window_color.png';
import './App.css';
import {useContext, useEffect, useRef, useState} from 'react';
import {AppContext, AppProvider} from './contexts/context';

import {holidays} from './projections/holidays';
import Projection from './components/Projection';
import ClearButton from './components/ClearButton';
import Dropdown from './components/Dropdown';

function Content() {
  const [override, setOverride] = useState();
  const [buttonsHidden, setButtonsHidden] = useState(false);
  const {editing, setEditing, reversed, setReversed} = useContext(AppContext);
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

  return (
    <div className="App" ref={appRef} onMouseMove={()=> setButtonsHidden(false)}>
      <Projection override={override} hideUI={isFullscreen && buttonsHidden} />
      <div className={`header ${isFullscreen && buttonsHidden ? 'hide' : ''}`}>
        <img src={logo} className="logo" alt="window logo" />
        <div className="buttonGroup">
          <div
            className={`button ${editing ? 'selected' : ''}`}
            onClick={() => setEditing(!editing)}
          >Edit</div>
        </div>
        <div className="buttonGroup">
          <Dropdown
            defaultOption={{slug: null, name: "Auto"}}
            options={holidays}
            onSelect={setOverride}
            value={override}
          />
          <div
            className={`button ${isFullscreen ? 'selected' : ''}`}
            onClick={requestFullscreen}
          >Fullscreen</div>
          <div
            className={`button ${reversed ? 'selected' : ''}`}
            onClick={() => setReversed(!reversed)}
          >Reverse</div>
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
