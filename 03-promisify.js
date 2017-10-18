const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

let getDataFromFile = () => {
  return readFile('sample.txt', 'utf-8');
}

getDataFromFile().then((data) => {
  console.log("Data!", data);
}).catch((error) => {
  console.log("Error!", error);
});
