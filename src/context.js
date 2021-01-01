import React, {useState} from 'react';

export const AppContext = React.createContext({
  editing: false, setEditing: () => {},
  reversed: true, setReversed: () => {},
  forceUpdate: {}, setForceUpdate: () => {},
})

export const AppProvider = (props) => {
  const [editing, setEditing] = useState(false);
  const [reversed, setReversed] = useState(true);
  const [forceUpdate, setForceUpdate] = useState({});
  return (
    <AppContext.Provider value={{
      editing, setEditing,
      reversed, setReversed,
      forceUpdate, setForceUpdate,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
