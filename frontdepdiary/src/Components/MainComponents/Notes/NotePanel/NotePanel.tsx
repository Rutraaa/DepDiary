import {AddNote} from "../AddNote/AddNote";
import {AddNotePreloader} from "../AddNotePreloader/AddNotePreloader";
import {NotePreload} from "../NotePreload/NotePreload";
import styles from "./NotePanel.module.css";
import {useState} from "react";
import {useNotesStore} from "Utilities/NotesStore";

export const NotePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userNotes = useNotesStore(state => state.notes);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        {userNotes.map(note => (
          <NotePreload key={note.noteId} noteContent={note} />
        ))}
        <AddNotePreloader onOpenModal={handleOpenModal} />
        <AddNote isModalOpen={isModalOpen} onCloseModal={handleCloseModal} />
      </div>
    </>
  );
};
