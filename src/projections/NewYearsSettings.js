import React, {useContext} from 'react';
import {NyeContext} from '../contexts/NyeContext';

function NewYearsSettings() {
  const {showColors, setShowColors} = useContext(NyeContext);
  return (
    <div className="buttonGroup">
      <div
        className={`button ${showColors === true ? 'selected' : ''}`}
        onClick={() => setShowColors(!showColors)}
      >Color</div>
    </div>
  );
}

export default NewYearsSettings;
