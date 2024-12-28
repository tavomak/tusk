import { RichText } from '@graphcms/rich-text-react-renderer';

const RichContent = ({ content }) => (
  <RichText
    content={content}
    renderers={{
      h1: ({ children }) => <h1 className="text-white">{children}</h1>,
      bold: ({ children }) => <strong>{children}</strong>,
      p: ({ children }) => <p className="mb-5">{children}</p>,
    }}
  />
);
export default RichContent;
