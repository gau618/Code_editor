import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import "./index.scss";
import { makeSubmission } from '../../API/API';

export default function EditorContainer({ code, language, onChangeCode, theme, runCode, setRunCode, input, setShowLoader, setOutput }) {
  const codeRef = useRef(code);
  const editorOptions = {
    fontSize: 12,
    wordWrap: 'on'
  };

  useEffect(() => {
    codeRef.current = code; // Update the codeRef when code prop changes
  }, [code]);

  const callback = ({ apiStatus, data }) => {
    if (apiStatus === "loading") {
      setShowLoader(true);
    } else if (apiStatus === 'error') {
      setShowLoader(false);
      setOutput('Something went wrong');
    } else {
      setShowLoader(false);
      if (data.status.id === 3) {
        setOutput(atob(data.stdout));
      } else {
        setOutput(atob(data.stderr));
      }
    }
  };

  useEffect(() => {
    if (runCode) {
      makeSubmission({
        currentcode: codeRef.current,
        language,
        callback,
        stdin: input,
      });
      setRunCode(false);
    }
  }, [runCode]);

  return (
    <div className='code-area'>
      <Editor
        language={language}
        options={editorOptions}
        theme={theme}
        value={code}
        onChange={onChangeCode} // Use the callback function passed from parent
      />
    </div>
  );
}
