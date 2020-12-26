import {holidays} from '../holidays';
import CornerPin from '../CornerPin';

function Projection({override, editing}) {
  const projection = holidays.find(holiday => {
    if (override != null) {
      return holiday.slug === override;
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const startDate = new Date(`${holiday.start}, ${year}`);
    const endDate = new Date(`${holiday.end}, ${year} 23:59:59`);
    return currentDate >= startDate && currentDate <= endDate;
  })

  if (projection != null) {
    return (
      <>
        <CornerPin
          boxName="main"
          initialValue={[
            {x: 100, y: 100},
            {x: 600, y: 100},
            {x: 100, y: 400},
            {x: 600, y: 400},
          ]}
          editing={editing}
        >
          <div className="mirror">
            {projection.component}
          </div>
        </CornerPin>
        <CornerPin
          boxName="mask"
          initialValue={[
            {x: 25, y: 100},
            {x: 75, y: 100},
            {x: 25, y: 150},
            {x: 75, y: 150},
          ]}
          editing={editing}
        >
          <div className="mask">
            {editing && "(mask)"}
          </div>
        </CornerPin>
      </>
    )
  }
}

export default Projection;
