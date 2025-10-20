import { format } from 'date-fns';

export function formatted(date) {
  return format(date, 'MMMM dd, yyyy');
}
