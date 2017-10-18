const fs = require('fs');

let getDataFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('sample.txt', 'utf-8', function(error, data) {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

getDataFromFile().then((data) => {
  console.log("Data!", data);
}).catch((error) => {
  console.log("Error!", error);
});
