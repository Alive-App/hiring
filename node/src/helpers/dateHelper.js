exports.dateIso = (dateReceiver) => {
  let date = new Date(dateReceiver);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let dateIso = year + "-" + month + "-" + dt;

  return dateIso;
};
