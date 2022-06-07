export default async function getAvailableLocations(form) {
  const period = form.period.value;
  const showClosed = form.showClosed.checked;

  let queryResponse = [];
  const response = await fetch("/location.json");
  const data = await response.json();
  const locations = data.locations;
  locations.map((item) => {
    if (!item?.schedules) return;
    const hasAvailableHours = item.schedules.some((sch) => {
      const locationTime = sch.hour;
      return isOpen(period, locationTime);
    });

    if (!hasAvailableHours) return;
    if (showClosed || item.opened) queryResponse.push(item);
  });

  //Essa função coloca os lugares fechados por último
  if (showClosed) {
    queryResponse.sort((a, b) => b.opened - a.opened);
  }
  return queryResponse;
}

function isOpen(userTime, locationTime) {
  if (locationTime === "Fechado") return false;
  locationTime = locationTime.replaceAll("h", "").split(" às ");
  const startingTime = parseInt(locationTime[0]);
  switch (userTime) {
    case "manha":
      return startingTime < 12;
    case "tarde":
      return startingTime >= 12 && startingTime < 18;
    case "noite":
      return startingTime >= 18;
    default:
      return false;
  }
}
