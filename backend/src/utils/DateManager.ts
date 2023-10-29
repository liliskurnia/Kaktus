class DateManager {
  public static getTimestamp = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const offset = now.getTimezoneOffset();

    let outMonth: string = '0';
    let outDate: string = '0';
    let outHours: string = '0';
    let outMinutes: string = '0';
    let outSeconds: string = '0';
    let outMilliseconds: string = '';

    if (month < 10) {
      outMonth += month.toString();
    } else {
      outMonth = month.toString();
    }

    if (date < 10) {
      outDate += date.toString();
    } else {
      outDate = date.toString();
    }

    if (hours < 10) {
      outHours += hours.toString();
    } else {
      outHours = hours.toString();
    }

    if (minutes < 10) {
      outMinutes += minutes.toString();
    } else {
      outMinutes = minutes.toString();
    }

    if (seconds < 10) {
      outSeconds += seconds.toString();
    } else {
      outSeconds = seconds.toString();
    }

    if (milliseconds >= 100) {
      outMilliseconds = milliseconds.toString();
    } else if (milliseconds >= 10) {
      outMilliseconds = '0' + milliseconds.toString();
    } else {
      outMilliseconds = '00' + milliseconds.toString();
    }

    let strOffset: string = getOffsetString(offset);

    const output: string = `${year}-${outMonth}-${outDate} ${outHours}:${outMinutes}:${outSeconds}.${outMilliseconds} ${strOffset}`;
    return output;
  };
}

function getOffsetString(value: number): string {
  let output: string = '';
  let offset = Math.abs(value);
  let hourOffset: number = 0;
  let minuteOffset: number = 0;
  if (value < 0) {
    output += '+';
  } else if (value > 0) {
    output += '-';
  } else {
    return '+0000';
  }
  while (offset > 0) {
    if (offset - 60 >= 0) {
      offset -= 60;
      hourOffset += 1;
    } else {
      offset--;
      minuteOffset++;
    }
  }
  if (hourOffset < 10) {
    output = output + '0' + hourOffset.toString();
  } else {
    output += hourOffset.toString();
  }
  if (minuteOffset < 10) {
    output = output + '0' + minuteOffset.toString();
  } else {
    output += minuteOffset.toString();
  }
  return output;
}
export default DateManager;
