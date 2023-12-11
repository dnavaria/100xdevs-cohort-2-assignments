// standard async way to write file with callback
// const fs = require("fs");

const data = "This is written using js file.";

// fs.writeFile("sample2.txt", data, (err) => {
//   if (err) throw err;
//   console.log("File written");
// });

// with promises
const fs = require("node:fs/promises");
fs.writeFile("sample2.txt", data)
  .then(() => {
    console.log("File written successfully.");
  })
  .catch((err) => {
    console.log("Failed to write file ::" + err);
  });
