import {useContext, useEffect, useRef, useState} from 'react';

import {holidays} from '../projections/holidays';
import {INITIAL_VALUES, MILLISEC_IN} from '../constants';
import CornerPin from './CornerPin';
import {AppContext} from '../contexts/context';
import {NyeProvider} from '../contexts/NyeContext';

function getDate () {
  return new Date();
}

function Projection({override, hideUI}) {
  const [currentDate, setCurrentDate] = useState(() => getDate());
  const {editing, reversed} = useContext(AppContext);

  const dateRef = useRef();

  useEffect(() => {
    dateRef.current = setInterval(setCurrentDate, MILLISEC_IN.MINUTE, getDate);
    return () => clearInterval(dateRef.current);
  }, []);

  const projection = holidays.find(holiday => {
    if (override != null && override.slug != null) {
      return holiday.slug === override.slug;
    }
    const year = currentDate.getFullYear();
    const startDate = new Date(`${holiday.start}, ${year}`);
    const endDate = new Date(`${holiday.end}, ${year}`);
    endDate.setDate(endDate.getDate() + 1);
    return currentDate >= startDate && currentDate < endDate;
  })

  if (projection != null) {
    return (
      <NyeProvider>
        <>
          <div className={`subSettings ${hideUI ? 'hide' : ''}`}>
            {projection.settingsComponent || null}
          </div>
          <CornerPin
            boxName="main"
            initialValue={INITIAL_VALUES.MAIN}
            editing={editing}
          >
            <div className={reversed ? 'mirror' : ''}>
              {projection.component}
            </div>
          </CornerPin>
          <CornerPin
            boxName="mask"
            initialValue={INITIAL_VALUES.MASK}
            editing={editing}
          >
            <div className="mask" style={{background: editing ? 'rgba(0,0,0,0.75)' : 'black'}}>
              {editing && "(mask)"}
            </div>
          </CornerPin>
        </>
      </NyeProvider>
    )
  }
  return null;
}

export default Projection;
