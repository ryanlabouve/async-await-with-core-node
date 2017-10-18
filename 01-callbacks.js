const fs = require('fs');

let getDataFromFile = (callback) => {
  fs.readFile('sample.txt', 'utf-8', function(error, data) {
    if (error) {
      throw error;
    }
    callback(data);
  });
}

getDataFromFile((data) => {
  console.log(data);
});
