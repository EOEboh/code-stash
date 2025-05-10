import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-yaml";

import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

import { config } from "ace-builds";
import { SingleSnippetType } from "@/app/lib/definitions";
config.set("basePath", "path");

const AceEditorComponent: React.FC<{
  languageForAceEditor: string;
  singleSnippet: SingleSnippetType;
  onUpdate: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}> = ({ languageForAceEditor, singleSnippet, onUpdate }) => {
  return (
    <div className="p-px md:p-4 w-full">
      <AceEditor
        placeholder="Placeholder Text"
        mode={languageForAceEditor}
        theme="solarized_dark"
        name="code"
        style={{
          width: "100%",
          maxWidth: "960px",
          margin: "0 auto",
          height: "300px",
        }}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={false}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          enableMobileMenu: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        wrapEnabled
        value={singleSnippet?.code}
        onChange={(value) =>
          onUpdate({
            target: { name: "code", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />
    </div>
  );
};

export default AceEditorComponent;
