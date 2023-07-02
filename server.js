// server.js

const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs').promises;

const renameFiles = async (folderPath) => {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const fileInfo = path.parse(file);

      const oldPath = path.join(__dirname, folderPath, file);
      const newPath = path.join(__dirname, folderPath, `${fileInfo.name}_new${fileInfo.ext}`);

      await fs.rename(oldPath, newPath);
    }
  } catch (error) {
    // Handle error here
    console.log(error);
  }
};

app.get('/', (req, res) => {
  renameFiles('./images');
  res.send('DONE!')
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
