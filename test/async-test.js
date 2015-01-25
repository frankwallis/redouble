function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncValue(value: string): string {
  await timeout(50);
  return value;
}

(async function() {
  var value = await asyncValue(42).catch(console.error.bind(console));
  assert.equal(42, value);
  done();
})();