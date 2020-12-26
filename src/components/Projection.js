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
      <CornerPin editing={editing}>
        <div className="mirror">
          {projection.component}
        </div>
      </CornerPin>
    )
  }
}

export default Projection;
