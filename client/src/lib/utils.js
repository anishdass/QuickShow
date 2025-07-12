export const timeFormat = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

export const dateFormat = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return `${year}-${month}-${day}`;
};

export const completeDateFormat = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-us", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const isoTimeFormat = (dateTime) => {
  const date = new Date(dateTime);
  const localTime = date.toLocaleDateString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return localTime;
};
