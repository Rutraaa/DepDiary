import React, {useState, useEffect} from "react";
import styles from "./AdminDashboard.module.css";
import {DiarysResponse} from "@Interfaces/IDiaryContext";
import {useNotesStore} from "Utilities/NotesStore";
import {NoteCom} from "./NoteCom";
import {ApiClient} from "ApiClient/ApiClient";

interface DiaryProp {
  diary: DiarysResponse;
}

export const DiaryCom: React.FC<DiaryProp> = diary => {
  const apiClient = new ApiClient();

  const [openDiaries, setOpenDiaries] = useState(false);

  const fetchNotesS = useNotesStore(state => state.fetchNotesS);
  const notes = useNotesStore(state => state.notes);

  const handleSelectedUser = (diaryId: number) => {
    setOpenDiaries(!openDiaries);
    fetchNotesS(diaryId);
  };

  const handleDeleteNote = async () => {
    await apiClient.deleteData(`/Diary/delete`, diary.diary.diaryId);
  };

  return (
    <>
      <div className={styles.diaryBlock}>
        <div className={styles.title}>Diary: {diary.diary.diaryName}</div>
        <div className={styles.buttons}>
          <button className={styles.editButton}>Edit</button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteNote()}
          >
            Delete
          </button>
          <button
            className={styles.selectButton}
            onClick={() => handleSelectedUser(diary.diary.diaryId)}
          >
            Select
          </button>
        </div>
      </div>
      {openDiaries &&
        notes?.map(note => <NoteCom key={note.noteId} noteContent={note} />)}
    </>
  );
};
