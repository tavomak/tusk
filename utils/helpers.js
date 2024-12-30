export const bannersToShow = (items) => {
  const now = new Date();
  return items.filter((item) => !item.endTime || now < new Date(item.endTime));
};

export function formatPhoneNumberString(value) {
  const trimmedValue = value.trim().replace(/\s/g, '');
  const valueToReturn = `${trimmedValue.slice(0, 1)} ${trimmedValue.slice(1, 5)} ${trimmedValue.slice(5)}`;

  return valueToReturn;
}
