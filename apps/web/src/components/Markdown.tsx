import { FC } from "react";
import ReactMarkDown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  description: string;
}

const Markdown: FC<MarkdownProps> = ({ description }) => {
  const renderers: Components = {
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg">{children}</h3>,
    p: ({ children }) => <p className="text-sm font-light">{children}</p>,
    ol: ({ children }) => (
      <ol className="list-decimal space-y-1 pl-5">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc space-y-1 pl-5">{children}</ul>
    ),
    li: ({ children }) => <li className="text-sm">{children}</li>,
  };
  return (
    <ReactMarkDown rehypePlugins={[rehypeRaw]} components={renderers}>
      {description}
    </ReactMarkDown>
  );
};

export default Markdown;
