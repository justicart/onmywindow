import React, {useState} from 'react';

export const AppContext = React.createContext({add2: false, setAdd2: () => {}})

export const AppProvider = (props) => {
  const [add2, setAdd2] = useState(false);
  return (
    <AppContext.Provider value={{add2, setAdd2}}>
      {props.children}
    </AppContext.Provider>
  );
}
