import {createPortal} from "react-dom";
import styles from "./Note.module.css";
import {usePortal} from "Utilities/usePortal";
import {NotesResponse, UpdateNote} from "@Interfaces/INoteContext";
import {ChangeEvent, useState} from "react";
import {useNotesStore} from "Utilities/NotesStore";
import {useDiariesStore} from "Utilities/DiaryStore";
import {ApiClient} from "ApiClient/ApiClient";

interface NoteProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  note: NotesResponse;
}

export const Note: React.FC<NoteProps> = ({
  isModalOpen,
  onCloseModal,
  note,
}) => {
  const apiClient = new ApiClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setTitle] = useState(note.title);
  const [editedContent, setContent] = useState(note.content);

  const formData = new FormData();

  const selectedDiary = useDiariesStore(state => state.selectedDiary);
  const fetchNotes = useNotesStore(state => state.fetchNotes);

  const target = usePortal("modals");
  const userId: string = localStorage.getItem("userId") as string;

  const handleEditedNote = async () => {
    setIsEditing(false);

    let request: UpdateNote = {
      title: editedTitle,
      content: editedContent,
    };

    await apiClient.putData<UpdateNote>(`/Note/update`, request, note.noteId);
    await apiClient.postFile(
      `/Files/uploadFile`,
      parseInt(userId),
      selectedDiary,
      note.noteId,
      formData
    );

    onCloseModal();

    fetchNotes(selectedDiary);
  };

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      formData.append("file", file);
    }
  };

  const modal = (
    <>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.note}>
            <div className={styles.header}>
              {!isEditing ? (
                <h2 className={styles.title}>{note.title}</h2>
              ) : (
                <input
                  className={styles.title_edit}
                  value={editedTitle}
                  onChange={e => setTitle(e.target.value)}
                ></input>
              )}

              <button className={styles.closeButton} onClick={onCloseModal}>
                Close
              </button>
            </div>
            {!isEditing ? (
              <p className={styles.content}>{note.content}</p>
            ) : (
              <textarea
                className={styles.content_edit}
                value={editedContent}
                onChange={e => setContent(e.target.value)}
              ></textarea>
            )}

            <div className={styles.buttons}>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className={styles.uploadFileButton}
                onChange={handleUploadFile}
              ></input>
              {!isEditing ? (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              ) : (
                <button
                  className={styles.editButton}
                  onClick={handleEditedNote}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(modal, target);
};
