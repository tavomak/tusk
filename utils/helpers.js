export const bannersToShow = (items) => {
  const now = new Date();
  return items.filter((item) => !item.endTime || now < new Date(item.endTime));
};

export function formatPhoneNumberString(value) {
  const trimmedValue = value.trim().replace(/\s/g, '');
  const valueToReturn = `${trimmedValue.slice(0, 1)} ${trimmedValue.slice(1, 5)} ${trimmedValue.slice(5)}`;

  return valueToReturn;
}

let lastRequestTime = 0;
const requestQueue = [];

export const rateLimit = async () => {
  const now = Date.now();
  if (lastRequestTime + 2000 < now) {
    lastRequestTime = now;
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    requestQueue.push(resolve);
    if (requestQueue.length === 1) {
      setTimeout(() => {
        const resolvers = [...requestQueue];
        requestQueue.length = 0;
        resolvers.forEach((r) => r());
      }, 2000);
    }
  });
};
