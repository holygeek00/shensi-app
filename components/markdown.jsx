// 封装一个markdown组件

import React, {useContext, useState} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const MarkdownEditor = ({markdownContent}) => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

    setMarkdown(markdownContent)

  const handleMarkdownChange = async (event) => {
    setMarkdown(event.target.value);
    setHtml(await marked(event.target.value));
  };

  return (
    <div>
      <div>
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          id="markdown-editor"
        />
      </div>
      <div>
        <div
          id="markdown-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

const MarkdownPreview = ({ markdown }) => {

  return (
    <div>
        <Markdown remarkPlugins={[remarkGfm]}>
            {markdown}
        </Markdown>
    </div>
  );
}

export {
    MarkdownEditor,
    MarkdownPreview
}