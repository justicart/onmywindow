import React, {useState} from 'react';

function ClearButton({label, item}) {
  const [buttonLabel, setButtonLabel] = useState(label);
  function clearLocalStorage(item) {
    try {
      window.localStorage.removeItem(item);
      setButtonLabel('(refresh)')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="button"
      onClick={() => clearLocalStorage(item)}
    >{buttonLabel}</div>
  );
}

export default ClearButton;
