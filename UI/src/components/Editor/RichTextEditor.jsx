import React, { useEffect, useState, useCallback } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ToolbarPlugin } from './ToolbarPlugin';
import { $getRoot, $getTextContent } from 'lexical';

import styles from './RichTextEditor.module.css';
import Aurora from './Aurora';


// Default Lexical config
const editorConfig = {
  theme: {
    paragraph: styles.paragraph,
    text: {
      bold: styles.bold,
      italic: styles.italic,
      underline: styles.underline
    }
  },
  onError(error) {
    throw error;
  }
};

export default function RichTextEditor() {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [editorContent, setEditorContent] = useState('');
  const [saveTimeout, setSaveTimeout] = useState(null);

  // Auto-save to backend after delay
  const autoSave = useCallback((content) => {
    if (saveTimeout) clearTimeout(saveTimeout);

    const timeout = setTimeout(() => {
      // TODO: Replace with your actual API call
      console.log('Auto-saving blog draft to backend...');
      fetch('/api/blogs/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add token if needed
          // Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: "Auto-Saved Title",
          content, // You can also convert to markdown or raw HTML
          tags: ["autosave"]
        })
      });
    }, 5000); // ⏱ 5s delay (changeable)

    setSaveTimeout(timeout);
  }, [saveTimeout]);

  // Track editor changes
 const onChange = (editorState) => {
  editorState.read(() => {
    const root = $getRoot();
    const plainText = root.getTextContent();

    const wordList = plainText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(wordList.length);
    setCharCount(plainText.length);
  });
};


  return (
    <> 
    <Aurora
  colorStops={["#5A2C72", "#A06DB0", "#F5EBFA", "#A06DB0", "#5A2C72"]}

  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/> 
    <div className={styles.editorContainer}>
      <LexicalComposer initialConfig={editorConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editor} />}
          // placeholder={<div className={styles.placeholder}>Start writing your blog...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>

      <div className={styles.footer}>
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
    </div>
    </>
  );
}

function LexicalErrorBoundary({ error }) {
  console.error(error);
  return <div>An unexpected error occurred.</div>;
}
