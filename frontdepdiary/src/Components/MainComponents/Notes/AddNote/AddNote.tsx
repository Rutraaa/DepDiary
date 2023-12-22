import {usePortal} from "Utilities/usePortal";
import styles from "./AddNote.module.css";
import {createPortal} from "react-dom";
import {useState} from "react";
import {CreateNote} from "@Interfaces/INoteContext";
import {ApiClient} from "ApiClient/ApiClient";
import {useNotesStore} from "Utilities/NotesStore";
import {useDiariesStore} from "Utilities/DiaryStore";

interface AddNoteProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const AddNote: React.FC<AddNoteProps> = ({
  isModalOpen,
  onCloseModal,
}) => {
  const [noteTitle, setTitle] = useState("");
  const [noteContent, setContent] = useState("");

  const apiClient = new ApiClient();
  const target = usePortal("modals");

  const fetchNotes = useNotesStore(state => state.fetchNotes);
  const selectedDiary = useDiariesStore(state => state.selectedDiary);

  const handleAddNote = async () => {
    let request: CreateNote = {
      diaryId: selectedDiary,
      title: noteTitle,
      content: noteContent,
    };
    await apiClient.postData(`/Note/create`, request);
    fetchNotes(selectedDiary);
    onCloseModal();
  };

  const modal = (
    <>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.note}>
            <div className={styles.header}>
              <input
                className={styles.title}
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
              />
              <button className={styles.closeButton} onClick={onCloseModal}>
                Close
              </button>
            </div>
            <textarea
              className={styles.content}
              placeholder="Content"
              onChange={e => setContent(e.target.value)}
            />
            <div className={styles.buttons}>
              <button className={styles.editButton} onClick={handleAddNote}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(modal, target);
};
