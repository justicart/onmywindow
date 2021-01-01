export const UNITS = {
  DAYS: 'days',
  HOURS: 'hours',
  MINUTES: 'minutes',
  SECONDS: 'seconds'
}

export const SEC_IN = {
  DAY: 60 * 60 * 24,
  HOUR: 60 * 60,
  MINUTE: 60
}

export const MILLISEC_IN ={
  DAY: SEC_IN.DAY * 1000,
  HOUR: SEC_IN.HOUR * 1000,
  MINUTE: SEC_IN.MINUTE * 1000,
}

export const INITIAL_VALUES = {
  MAIN: [
    {x: 100, y: 100},
    {x: 1000, y: 100},
    {x: 100, y: 560},
    {x: 1000, y: 560},
  ],
  MASK: [
    {x: 25, y: 100},
    {x: 75, y: 100},
    {x: 25, y: 150},
    {x: 75, y: 150},
  ],
}
