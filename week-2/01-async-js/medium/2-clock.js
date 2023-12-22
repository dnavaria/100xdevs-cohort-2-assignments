const displayTime = () => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  console.clear();
  console.log(time);
};

setInterval(displayTime, 1000);
