import {holidays} from '../holidays';

function Projection({override}) {
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
    if (projection.fullscreen === true) {
      return (
        <div className="full">
          {projection.component}
        </div>
      )
    }
    return (
      <div className="window">
        <div className="mirror">
          {projection.component}
        </div>
      </div>
    )
  }
}

export default Projection;
