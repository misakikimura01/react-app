// メモアプリ、なんかCSSおかしい
import React, { useState } from 'react';
import styled from '@emotion/styled';
import ReactQuill from 'react-quill';
// CSS？
import 'react-quill/dist/quill.snow.css';

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const NoteList = styled.div`
  width: 30%;
  border-right: 1px solid #ddd;
`;

const NoteItem = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#f5f5f5' : 'white')};
  border-bottom: 1px solid #ddd;
`;

const EditorContainer = styled.div`
  width: 65%;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ff7675;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e74c3c;
  }
`;

interface Note {
  id: number;
  content: string;
}

const NoteApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  const createNote = () => {
    const newNote: Note = { id: Date.now(), content: '' };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setEditorContent('');
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
      setEditorContent('');
    }
  };

  const selectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setEditorContent(note.content);
  };

  const updateNoteContent = (content: string) => {
    setEditorContent(content);
    setNotes(notes.map(note => note.id === selectedNoteId ? { ...note, content } : note));
  };

  return (
    <AppContainer>
      <NoteList>
        <Button onClick={createNote}>新しいメモを作成</Button>
        {notes.map(note => (
          <NoteItem
            key={note.id}
            isSelected={note.id === selectedNoteId}
            onClick={() => selectNote(note)}
          >
            {note.content ? note.content.slice(0, 20) : '新しいメモ'}
            <Button onClick={() => deleteNote(note.id)} style={{ float: 'right', marginLeft: '10px' }}>
              削除
            </Button>
          </NoteItem>
        ))}
      </NoteList>
      <EditorContainer>
        {selectedNoteId && (
          <ReactQuill value={editorContent} onChange={updateNoteContent} />
        )}
      </EditorContainer>
    </AppContainer>
  );
};

export default NoteApp;
