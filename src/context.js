import React, {useState} from 'react';

export const AppContext = React.createContext({
  editing: false, setEditing: () => {},
  reversed: true, setReversed: () => {},
})

export const AppProvider = (props) => {
  const [editing, setEditing] = useState(false);
  const [reversed, setReversed] = useState(true);
  return (
    <AppContext.Provider value={{
      editing, setEditing,
      reversed, setReversed,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
