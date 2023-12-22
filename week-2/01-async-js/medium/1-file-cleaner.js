const fs = require("node:fs/promises");

const cleanFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const lines = data.split(" ");
    const cleanLines = lines.reduce((acc, item) => {
      if (item !== "") {
        acc.push(item.trim());
      }
      return acc;
    }, []);
    const fileData = cleanLines.join(" ");
    fs.writeFile(filePath, fileData)
      .then(() => {
        console.log("File Cleaned.");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(`Failed to clean file: ${err}`);
  }
};

cleanFile(
  "/home/ubuntu/personal/cohort_harkirat/100xdevs-cohort-2-assignments/week-2/01-async-js/medium/file.txt",
);
