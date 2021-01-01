import React, {useState} from 'react';

export const NyeContext = React.createContext({
  showColors: false, setShowColors: () => {},
})

export const NyeProvider = (props) => {
  const [showColors, setShowColors] = useState(false);
  return (
    <NyeContext.Provider value={{showColors, setShowColors}}>
      {props.children}
    </NyeContext.Provider>
  );
}
