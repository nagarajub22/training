function PromiseNew() {
  this.chained$ = [];
  this.error$ = [];

  const executor = arguments && arguments[0];

  if (executor === undefined) {
    throw 'Unknown argument';
  }

  this.resolve = this.resolve.bind(this);
  this.reject = this.reject.bind(this);

  executor(this.resolve, this.reject);
}

PromiseNew.prototype.resolve = function (val) {
  this.chained$.forEach((cb) => {
    cb(val);
  });
};
PromiseNew.prototype.reject = function (val) {
  this.error$.forEach((e) => e(val));
};
PromiseNew.prototype.then = function (successCB, failureCB) {
  this.chained$.push(successCB);
  if (failureCB) {
    this.error$.push(failureCB);
  }
  return this;
};
PromiseNew.prototype.catch = function (e) {
  this.error$.push(e);
};

(async function () {
  const myPromise = await new PromiseNew((resolve, reject) => {
    setTimeout(() => {
      resolve('Hi! I am good.');
    }, 5000);

    setTimeout(() => {
      reject('Hi! I am Wrong.');
    }, 8000);
  });

  console.log(myPromise);

})();



// myPromise
//   .then((val) => {
//     console.log(val);
//   })
//   .then((val) => {
//     console.log('New ', val);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
