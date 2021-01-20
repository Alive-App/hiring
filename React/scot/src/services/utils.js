export default class Utils {
  parseDate(date) {
    const year = parseInt(date.split("-")[0]);
    const month = parseInt(date.split("-")[1]);
    const day = parseInt(date.split("-")[2]);

    return new Date(year, month - 1, day);
  }

  isBetweenDates(date, min, max) {
    date = this.parseDate(date);
    min = this.parseDate(min);
    max = this.parseDate(max);

    return date <= max && date >= min;
  }

  formatDateString(date) {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];

    return `${year}-${month}-${day}`;
  }
}
