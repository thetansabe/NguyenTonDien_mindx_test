function resolveAfter2Seconds() {
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
}

function resolveAfter1Second() {
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
}
//a
async function sequentialStart() {
  console.log("==SEQUENTIAL START==");
  const slow = await resolveAfter2Seconds();
  console.log(slow);
  const fast = await resolveAfter1Second();
  console.log(fast);
}
//b
async function concurrentStart() {
  console.log("==CONCURRENT START with await==");
  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Second();
  console.log(await slow);
  console.log(await fast);
}

function concurrentPromise() {
  console.log("==CONCURRENT START with Promise.all==");
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
    (messages) => {
      console.log(messages[0]);
      console.log(messages[1]);
    }
  );
}

async function parallel() {
  console.log("==PARALLEL with await Promise.all==");
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))(),
  ]);
}

sequentialStart();
//setTimeout(concurrentStart, 4000)
//concurrentStart()
//concurrentPromise()
//setTimeout(concurrentPromise, 7000)
// setTimeout(parallel, 10000)
//parallel()