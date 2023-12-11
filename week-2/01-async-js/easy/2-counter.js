// clock counter without using setInterval

let second = 0;
let minute = 0;
let hour = 0;

const counter = () => {
  setTimeout(() => {
    console.clear();
    console.log(`${hour}:${minute}:${second} ${hour > 12 ? "PM" : "AM"}`);
    second = (second + 1) % 60;
    minute = second === 0 ? (minute + 1) % 60 : minute;
    hour = second === 0 && minute === 0 ? (hour + 1) % 24 : hour;
    counter();
  }, 500);
};

counter();
