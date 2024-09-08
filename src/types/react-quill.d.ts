declare module 'react-quill' {
  import { Component } from 'react';

  interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
  }

  export default class QuillEditor extends Component<QuillEditorProps> {}
}
