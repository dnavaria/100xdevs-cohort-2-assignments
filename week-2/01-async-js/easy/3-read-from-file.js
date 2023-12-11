// standard async way to read file with callback
// const fs = require("fs");

// fs.readFile("sample.txt", "utf-8", (err, data) => {
//     console.log(data);
// });

// with promises
// const fs = require("node:fs/promises");

// fs.readFile("sample.txt", "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const fs = require("node:fs/promises");

const readFileAsync = async (filename, encoding = "utf-8") => {
  try {
    const data = await fs.readFile(filename, encoding);
    console.log(data);
  } catch {
    console.log("error occured");
    return null;
  }
};

readFileAsync("sample.txt");
