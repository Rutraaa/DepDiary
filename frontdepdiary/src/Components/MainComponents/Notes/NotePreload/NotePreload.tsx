import {useState} from "react";
import styles from "./NotePreload.module.css";
import {Note} from "../Note/Note";
import {NotesResponse} from "@Interfaces/INoteContext";
import {useNotesStore} from "Utilities/NotesStore";
import {ApiClient} from "ApiClient/ApiClient";
import {useDiariesStore} from "Utilities/DiaryStore";

interface NoteProps {
  noteContent: NotesResponse;
}

export const NotePreload: React.FC<NoteProps> = ({noteContent}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiClient = new ApiClient();
  const selectedDiary = useDiariesStore(state => state.selectedDiary);
  const fetchNotes = useNotesStore(state => state.fetchNotes);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteNote = async () => {
    await apiClient.deleteData(`/Note/delete`, noteContent.noteId);
    fetchNotes(selectedDiary);
  };

  return (
    <>
      <div className={styles.notePreload}>
        <div className={styles.topbar}>
          <div className={styles.title}>{noteContent.title}</div>
          <button className={styles.deleteButton} onClick={handleDeleteNote}>
            X
          </button>
        </div>
        <div className={styles.dates}>
          <div className={styles.date}>{noteContent.createDate}</div>
          <div className={styles.date}>{noteContent.updateDate}</div>
        </div>
        <div className={styles.content}>
          {noteContent.content.substring(0, 5)}...
        </div>
        <button className={styles.viewButton} onClick={handleOpenModal}>
          View
        </button>
      </div>
      <Note
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        note={noteContent}
      />
    </>
  );
};
