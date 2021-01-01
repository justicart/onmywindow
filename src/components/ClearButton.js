import React, {useContext} from 'react';
import {AppContext} from '../contexts/context';

function ClearButton({label, item}) {
  const {forceUpdate, setForceUpdate} = useContext(AppContext);
  function clearLocalStorage(item) {
    try {
      window.localStorage.removeItem(item);
      setForceUpdate({...forceUpdate, [item]: true});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="button"
      onClick={() => clearLocalStorage(item)}
    >{label}</div>
  );
}

export default ClearButton;
