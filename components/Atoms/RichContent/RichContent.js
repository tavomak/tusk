import { RichText } from '@graphcms/rich-text-react-renderer';

const RichContent = ({ content }) => (
  <RichText
    content={content}
    renderers={{
      h1: ({ children }) => (
        <h1 className="mb-5 text-4xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-5 text-3xl font-bold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-5 text-2xl font-bold">{children}</h3>
      ),
      bold: ({ children }) => <strong>{children}</strong>,
      p: ({ children }) => <p className="mb-5">{children}</p>,
      ul: ({ children }) => <ul className="mb-5 ml-5 list-disc">{children}</ul>,
      ol: ({ children }) => (
        <ol className="mb-5 ml-5 list-decimal">{children}</ol>
      ),
      li: ({ children }) => <li className="mb-5">{children}</li>,
    }}
  />
);
export default RichContent;
