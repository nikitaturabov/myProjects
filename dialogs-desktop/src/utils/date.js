import dateFns from 'date-fns';

export function getDate(date, format = null) {
  if (format) {
    return dateFns.format(date, format);
  }

  return dateFns.format(date, 'DD.MM.YYYY · HH:mm');
}
