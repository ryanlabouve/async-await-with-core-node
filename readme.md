# Using Aync/Await with Core Node modules

`async` / `await` has transformed our codebase at work. Previously nested and messy sections have been transformed to be structured and easy to read.

Moving back to do some work with Node, I wanted to apply the same pattern. Initially I was stumped because many of the core Node utils still use callbacks to handle asynchronous functions.

The goal of this article is to walk through how I worked through  using `async` / `await` with core Node modules.

### Async via callback

Traditional Node programs made heavy use of callbacks as a way to handle async. 

```
// This is really hard to read & think about because
// you have deep nesting and lots of jumping around.
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
```

It's not possible to `async` / `await` with callbacks! 

Instead we could wrap the whole method in a promise.

### Async via promises

```
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
```

Even though we have made our code more complicated, it is now compatible with `async` / `await`!

This method of wrapping callback function with promises could be fully automated though. In fact, there is a Node utility function that does just this: [promisify](https://nodejs.org/api/util.html#util_util_promisify_original)

Let's re-write our example using `promisify`.

### Async via promisify

```
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
```

Much better! Promisify has made our code much easier to read.

Now let's async/await!

### Async with `async` / `await`

```
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
```

Ta-da! We are now able to use `async` / `await` with any callback based module.

## Why this is important

 One of my main complaints with `node` is that it's historically  to deeply nested code that jumps around. Now that we can minimize that via `async` / `await` I feel like the available developer ergonomic gains are massive and Node seems like a lot more fun to write.
 
Hope this helps!
