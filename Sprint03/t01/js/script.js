function getFormattedDate(dateObject) {
  let date, h, hh, m, mm, DD;

  date = dateObject.toLocaleDateString();
  hh = (h = dateObject.getHours()) < 10 ? '0' + h : h;
  mm = (m = dateObject.getMinutes())  < 10 ? '0' + m : m;
  DD = ["Sunday","Monday","Tuesday","Wednesday",
        "Thursday","Friday","Saturday"][dateObject.getDay()];
  return `${date} ${hh}:${mm} ${DD}`;
}
