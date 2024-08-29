/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(pathType, path) {
  if (pathType === 'file') {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        process.exit(1);
      } else {
        generateText(data);
      }
    });
  } else if (pathType === 'url') {
    axios.get(path)
      .then((resp) => {
        generateText(resp.data);
      })
      .catch((err) => {
        console.error(`Error fetching URL: ${err}`);
        process.exit(1);
      });
  } else {
    console.error(`Unknown path type: ${pathType}`);
    process.exit(1);
  }
}

let [pathType, path] = process.argv.slice(2);
makeText(pathType, path);
