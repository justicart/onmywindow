import {holidays} from '../holidays';
import {SEC_IN, INITIAL_VALUES} from '../constants';
import CornerPin from '../CornerPin';

function Projection({override, currentDate, editing}) {
  const projection = holidays.find(holiday => {
    if (override != null) {
      return holiday.slug === override;
    }
    const year = currentDate.getFullYear();
    const startDate = new Date(`${holiday.start}, ${year}`);
    const endDate = new Date(`${holiday.end}, ${year}`);
    endDate.setDate(endDate.getDate() + 1);
    console.log(currentDate >= startDate && currentDate < endDate, startDate, currentDate, endDate);
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
