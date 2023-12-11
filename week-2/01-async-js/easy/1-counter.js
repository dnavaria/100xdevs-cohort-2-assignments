// clock counter in 24 hour time format

let second = 0;
let minute = 0;
let hour = 0;

setInterval(() => {
  console.clear();
  console.log(`${hour}:${minute}:${second} ${hour > 12 ? "PM" : "AM"}`);

  second = (second + 1) % 60;
  minute = second === 0 ? (minute + 1) % 60 : minute;
  hour = minute === 0 && second === 0 ? (hour + 1) % 24 : hour;
}, 1000);
