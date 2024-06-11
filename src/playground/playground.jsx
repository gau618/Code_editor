import React, { useContext, useState } from "react";
import "./index.scss";
import { useEffect } from "react";
import { useRef } from "react";
import { IoIosPlay } from "react-icons/io";
import { RiEditLine } from "react-icons/ri";
import logo from "../../public/logo144.png";
import { useParams } from "react-router-dom";
import { MdOutlineFullscreen } from "react-icons/md";
import { CiImport, CiExport } from "react-icons/ci";
import Editor from '@monaco-editor/react';
import { PlaygroundContext } from "../Componets/Provider/playgroundprovider/playgroundprovider";
import { makeSubmission } from '../API/API'
export default function Playground() {
  const { Getdefaultcode, updatetheLanguage, Savethecode } = useContext(PlaygroundContext);
  const { fileId, folderId } = useParams();
  
  const [language, setLanguage] = useState(() => {
    const result = Getdefaultcode(folderId, fileId);
    return result ? result.language : "cpp";
  });

  const [code, setCode] = useState(() => {
    const result = Getdefaultcode(folderId, fileId);
    return result ? result.Mycode : "";
  });
  const [showLoader, setShowLoader] = useState(false);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [runCode, setRunCode] = useState(false);
  const CodeRef=useRef(code);
  const fileEndPart = {
    cpp: "cpp",
    java: "java",
    python: "py",
    javascript: "js",
  };
  const editorOptions = {
    fontSize: 12,
    wordWrap: 'on'
  };
  const runTheCode = () => {
    setRunCode(true);
  };
  useEffect(() => {
    if (runCode) {
      makeSubmission({
        currentcode: CodeRef.current,
        language,
        callback,
        stdin: input,
      });
      setRunCode(false);
    }
  }, [runCode]);

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

  const onChangeCode = (newCode) => {
    CodeRef.current=newCode;
  };

  const onChangeLanguage = (e) => {
    updatetheLanguage(folderId, fileId, e.target.value);
    const result = Getdefaultcode(folderId, fileId);
    setCode(result.Mycode);
    setLanguage(e.target.value);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const exportOutput = () => {
    const outputValue = output.trim();
    if (!outputValue) {
      alert("Output is vacant");
    } else {
      const outputBlob = new Blob([outputValue], { type: "text" });
      const downloadURL = URL.createObjectURL(outputBlob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "Output.txt";
      link.click();
    }
  };

  const exportCode = () => {
    const codeValue = CodeRef.current?.trim();
    if (!codeValue) {
      alert("Nothing in the editor");
    } else {
      const codeBlob = new Blob([codeValue], { type: "text/plain" });
      const downloadURL = URL.createObjectURL(codeBlob);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = `Codepark.${fileEndPart[language]}`;
      link.click();
    }
  };

  const importInput = (event) => {
    const inputFile = event.target.files[0];
    if (inputFile && inputFile.type.includes("text")) {
      const fileReader = new FileReader();
      fileReader.readAsText(inputFile);
      fileReader.onload = (e) => {
        setInput(e.target.result);
      };
    } else {
      alert("Please choose a correct file");
    }
  };

  const onUploadCode = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      let fileType = file.type || "";
      if (!fileType) {
        const extension = fileName.split(".").pop().toLowerCase();
        const mimeTypes = {
          cpp: "text/x-c++src",
          js: "text/javascript",
          py: "text/x-python",
          java: "text/x-java-source",
        };
        fileType = mimeTypes[extension] || "Unknown/Unsupported type";
      }
      if (fileType.includes("text")) {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = (e) => {
          const importedCode = e.target.result;
          setCode(importedCode);
          setRunCode(true);
          CodeRef.current=importedCode;
          Savethecode(folderId, fileId, CodeRef.current);
        };
      } else {
        alert("Please choose a program file");
      }
    }
    
  };
  

  const saveEditorCode = () => {
    Savethecode(folderId, fileId, CodeRef.current);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <>
      <div className="playgroundheader">
        {showLoader ? (
          <div className="loaderContainer">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
        <div className="header">
          <img src={logo} alt="logo" />
          <h2>
            Code <span>Park</span>
          </h2>
        </div>
      </div>
      <div className="editor-container">
        <div className={`left-screen ${fullscreen ? "left-active" : "right-active"}`}>
          <div className="left-screen-header">
            <div className="title-save">
              <div className="title">
                <h3>Title</h3>
                <RiEditLine />
              </div>
              <div className="saving">
                <button onClick={saveEditorCode}>Save Code</button>
              </div>
            </div>
            <div className="language-themes">
              <select
                value={language}
                className="language background"
                onChange={onChangeLanguage}
              >
                <option value="cpp">Cpp</option>
                <option value="java">Java</option>
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
              </select>
              <select className="themes background" onChange={onChangeTheme}>
                <option value="vs-dark">Vs-dark</option>
                <option value="vs-light">Vs-light</option>
              </select>
            </div>
          </div>
          <div className="code-editor-container">
          <div className='code-area'>
      <Editor
        language={language}
        options={editorOptions}
        theme={theme}
        value={code}
        onChange={onChangeCode}
      />
    </div>
          </div>
          <div className="footer">
            <div className="full-screen footerbutton">
              <button onClick={toggleFullscreen}>
                <MdOutlineFullscreen />
                <span>Full Screen</span>
              </button>
            </div>
            <div className="import footerbutton">
              <label htmlFor="file-upload" className="custom-file-upload">
                <CiImport />
                <p> Import Code</p>
              </label>
              <input id="file-upload" type="file" onChange={onUploadCode} />
            </div>
            <div className="export footerbutton">
              <button onClick={exportCode}>
                <CiExport />
                <span>Export Code</span>
              </button>
            </div>
            <div className="run-code">
              <button onClick={runTheCode}>
                <IoIosPlay />
                Run Code
              </button>
            </div>
          </div>
        </div>
        <div className={`right-screen ${fullscreen ? "active" : ""}`}>
          <div className="input-container">
            <div className="inputheader">
              <h3>Input:</h3>
              <label htmlFor="file-import" className="custom-file-upload">
                <CiImport />
                <p> Import Input</p>
              </label>
              <input id="file-import" type="file" onChange={importInput} />
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          <div className="output-container">
            <div className="outputheader">
              <h3>Output:</h3>
              <button id="output" onClick={exportOutput}>
                <CiExport />
                <span>Export Output</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
