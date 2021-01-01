import {useContext, useEffect, useRef, useState} from 'react';

import {holidays} from '../projections/holidays';
import {INITIAL_VALUES, MILLISEC_IN} from '../constants';
import CornerPin from './CornerPin';
import {AppContext} from '../context';

function getDate () {
  return new Date();
}

function Projection({override}) {
  const [currentDate, setCurrentDate] = useState(() => getDate());
  const {editing, reversed} = useContext(AppContext);

  const dateRef = useRef();

  useEffect(() => {
    dateRef.current = setInterval(setCurrentDate, MILLISEC_IN.MINUTE, getDate);
    return () => clearInterval(dateRef.current);
  }, []);

  const projection = holidays.find(holiday => {
    if (override != null) {
      return holiday.slug === override;
    }
    const year = currentDate.getFullYear();
    const startDate = new Date(`${holiday.start}, ${year}`);
    const endDate = new Date(`${holiday.end}, ${year}`);
    endDate.setDate(endDate.getDate() + 1);
    return currentDate >= startDate && currentDate < endDate;
  })

  if (projection != null) {
    return (
      <>
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
          <div className="mask">
            {editing && "(mask)"}
          </div>
        </CornerPin>
      </>
    )
  }
  return null;
}

export default Projection;
