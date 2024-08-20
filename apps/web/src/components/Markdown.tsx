import { FC } from "react";
import ReactMarkDown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  description: string;
}

const Markdown: FC<MarkdownProps> = ({ description }) => {
  const renderers: Components = {
    h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    p: ({ children }) => <p className="text-sm font-light">{children}</p>,
  };
  return (
    <ReactMarkDown rehypePlugins={[rehypeRaw]} components={renderers}>
      {description}
    </ReactMarkDown>
  );
};

export default Markdown;
