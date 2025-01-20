import { Typography } from "antd";
import Markdown from "react-markdown";

const { Title, Text, Link } = Typography;

export interface MyMarkdownProps {
  content?: string;
}

export default function MyMarkdown({ content }: MyMarkdownProps) {
  return (
    <Markdown
      components={{
        h1: (props) => <Title level={1} style={{ margin: 0 }} {...props} />,
        h2: (props) => <Title level={2} style={{ margin: 0 }} {...props} />,
        h3: (props) => <Title level={3} style={{ margin: 0 }} {...props} />,
        h4: (props) => <Title level={4} style={{ margin: 0 }} {...props} />,
        h5: (props) => <Title level={5} style={{ margin: 0 }} {...props} />,
        p: (props) => <Text {...props} />,
        span: (props) => <Text {...props} />,
        a: (props) => <Link href={props.href}>{props.children}</Link>,
        ul: (props) => <ul className="list-disc">{props.children}</ul>,
        ol: (props) => <ol className="list-decimal">{props.children}</ol>,
      }}
    >
      {content}
    </Markdown>
  );
}
