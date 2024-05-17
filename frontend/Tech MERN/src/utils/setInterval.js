const setIntervals = (displayCount, arrayLength) => {
  let count = 1;
  const timer = setInterval(() => {
    displayCount(count);
    count++;
    if (count > arrayLength) {
      clearInterval(timer);
      displayCount(arrayLength);
    }
  }, 50);
};

export default setIntervals;
