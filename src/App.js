
import './App.css';
import {useRef, useState} from 'react';

import {holidays} from './holidays';
import Projection from './components/Projection';

function App() {
  const [override, setOverride] = useState();
  const appRef = useRef();

  const isFullscreen = document.fullscreenElement;
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
      onClick={() => setOverride(holiday.slug)}
    >{holiday.name}</div>
  })

  return (
    <div className="App" ref={appRef}>
      {false && <div className="template" />}
      <Projection override={override} />
      <div className="buttons">
        <div className="buttonGroup">
          <div
            className={`button ${override == null ? 'selected' : ''}`}
            onClick={() => setOverride()}
          >Auto</div>
          {overrideButtons}{' '}
        </div>
        <div className="buttonGroup">
          <div
            className={`button ${isFullscreen ? 'selected' : ''}`}
            onClick={requestFullscreen}
          >Fullscreen</div>
        </div>
      </div>
    </div>
  );
}

export default App;
