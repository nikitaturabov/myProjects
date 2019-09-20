import moment from 'moment';

const now = moment();

export function roundTime() {
  const hours = now.format('HH');
  const minutes = now.format('mm');

  let rest = Math.ceil(Number(minutes) / 30);
  
  if (rest === 0) {
    rest = 1;
  }
    
  const hoursRes = Number(hours) + (rest - 1);
  const minutesRes = 30 * rest;
  
  // return {
  //   hours: hoursRes < 10 ? '0' + hoursRes : hoursRes === 24 ? '00': hoursRes + '',
  //   minutes: minutesRes === 60 ? '00' : '30'
  // }

  return `${ hoursRes < 10 ? '0' + hoursRes : hoursRes === 24 ? '00': hoursRes }:${ minutesRes === 60 ? '00' : '30' }`
};

export function roundTimeMinusHour() {
  const hours = now.subtract(1, 'hours').format('HH');
  const minutes = now.format('mm');

  let rest = Math.ceil(Number(minutes) / 30);
  
  if (rest === 0) {
    rest = 1;
  }
    
  const hoursRes = Number(hours) + (rest - 1);
  const minutesRes = 30 * rest;

  return `${ hoursRes < 10 ? '0' + hoursRes : hoursRes === 24 ? '00': hoursRes }:${ minutesRes === 60 ? '00' : '30' }`
}
