import Markdown from 'react-markdown';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose any syntax highlighting style
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={tomorrow}>
      {value}
    </SyntaxHighlighter>
  );
};

const MarkdownWithSyntaxHighlighting = ({ content }) => {
  return (
    <Markdown
      trim={false} remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownWithSyntaxHighlighting;