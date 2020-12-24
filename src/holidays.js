import NewYears from './components/NewYears';
import Christmas from './components/Christmas';
import Halloween from './components/Halloween';

export const holidays = [
  {
    slug: "newyears",
    name: "New Years",
    component: <NewYears />,
    fullscreen: false,
    start: "Jan 1",
    end: "Jan 2",
    hide: true,
  },
  {
    slug: "halloween",
    name: "Halloween",
    component: <Halloween />,
    fullscreen: false,
    start: "Oct 1",
    end: "Oct 31"
  },
  {
    slug: "christmas",
    name: "Christmas",
    component: <Christmas />,
    fullscreen: true,
    start: "Dec 1",
    end: "Dec 25"
  },
  {
    slug: "newyears",
    name: "New Years",
    component: <NewYears />,
    fullscreen: false,
    start: "Dec 26",
    end: "Dec 31"
  },
  {
    slug: "test",
    name: "Test",
    component: <div className="template" />,
    fullscreen: true,
  }
]
