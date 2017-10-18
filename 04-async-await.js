const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

let getDataFromFile = async function() {
  return await readFile('sample.txt', 'utf-8');
}

let init = async () => {
  try {
    let data = await getDataFromFile()
    console.log(data);
  } catch(error) {
    console.log(error);
  }
};

// Have to use `await` syntax in an async function
init();
