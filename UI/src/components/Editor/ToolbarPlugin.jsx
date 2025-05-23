import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import React from 'react';
import styles from './RichTextEditor.module.css';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const format = (type) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  return (
    <div className={styles.toolbar}>
      <button onClick={() => format('bold')}><i className="fas fa-bold"></i></button>
      <button onClick={() => format('italic')}><i className="fas fa-italic"></i></button>
      <button onClick={() => format('underline')}><i className="fas fa-underline"></i></button>
      {/* Add more buttons as needed */}
    </div>
  );
}
