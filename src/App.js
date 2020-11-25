import "./App.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  const;
  render() {
    const { editorState } = this.state;
    function uploadImageCallBack(file) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image");
        xhr.setRequestHeader("Authorization", "Client-ID 160f6f8e208a6f8");
        const data = new FormData();
        data.append("image", file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          resolve(response);
        });
        xhr.addEventListener("error", () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error);
          reject(error);
        });
      });
    }
    return (
      <div>
        <div>
          <Editor
            placeholder="Write here.."
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              image: {
                uploadEnabled: true,
                uploadCallback: uploadImageCallBack,
                alt: { present: true, mandatory: true },
              },
            }}
          />
        </div>
        <h2>Preview as HTML</h2>
        <textarea
          style={{ width: "100%", height: "300px" }}
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <h2>React Rich text editor Draft JS</h2>
      <EditorContainer />
    </div>
  );
}

export default App;
