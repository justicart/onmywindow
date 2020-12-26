import {useEffect, useRef, useState} from 'react';

import {holidays} from '../holidays';
import {INITIAL_VALUES, SEC_IN} from '../constants';
import CornerPin from '../CornerPin';

function getDate () {
  return new Date();
}

function Projection({override, editing}) {
  const [currentDate, setCurrentDate] = useState(getDate());

  const dateRef = useRef();

  useEffect(() => {
    dateRef.current = setInterval(setCurrentDate, SEC_IN.minute, getDate);
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
          <div className="mirror">
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
