import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: {} // ContentState JSON
    };
  }

        onContentStateChange = (contentState) => {
          this.setState({
            contentState
          });
        };

        render() {
          const { contentState } = this.state;
          return (
                    <Editor
                        initialContentState={contentState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onContentStateChange={this.onContentStateChange}
                    />
          );
        }
}

export default Markdown;
