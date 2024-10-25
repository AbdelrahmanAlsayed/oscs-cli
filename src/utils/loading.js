function startLoading(message) {
  let dots = '';
  const intervalId = setInterval(() => {
    dots = dots.length < 3 ? dots + '.' : '';
    process.stdout.write(`\r${message}${dots}`);
  }, 300);

  return intervalId;
}

function stopLoading(intervalId) {
  clearInterval(intervalId);
  process.stdout.write('\r');
}

export { startLoading, stopLoading };
