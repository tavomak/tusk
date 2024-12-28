import { remark } from 'remark';
import html from 'remark-html';

export const bannersToShow = (items) => {
  const now = new Date();
  return items.filter((item) => !item.endTime || now < new Date(item.endTime));
};

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function formatPhoneNumberString(value) {
  const trimmedValue = value.trim().replace(/\s/g, '');
  const valueToReturn = `${trimmedValue.slice(0, 1)} ${trimmedValue.slice(1, 5)} ${trimmedValue.slice(5)}`;

  return valueToReturn;
}
