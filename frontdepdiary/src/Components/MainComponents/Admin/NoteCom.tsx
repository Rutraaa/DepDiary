import React, {useState, useEffect} from "react";
import styles from "./AdminDashboard.module.css";
import {NotesResponse} from "@Interfaces/INoteContext";
import {ApiClient} from "ApiClient/ApiClient";
import {useNotesStore} from "Utilities/NotesStore";

interface NoteProp {
  noteContent: NotesResponse;
}

export const NoteCom: React.FC<NoteProp> = noteContent => {
  const apiClient = new ApiClient();

  const handleDeleteNote = async () => {
    await apiClient.deleteData(`/Note/delete`, noteContent.noteContent.noteId);
  };

  return (
    <>
      <div className={styles.noteBlock}>
        <div className={styles.title}>
          Note: {noteContent.noteContent.title}
        </div>
        <div className={styles.buttons}>
          <button className={styles.editButton}>Edit</button>
          <button className={styles.deleteButton} onClick={handleDeleteNote}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
