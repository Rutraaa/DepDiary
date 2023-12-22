import React from "react";
import styles from "./AddNotePreloader.module.css";

interface IAddNotePreloader {
  onOpenModal: () => void;
}

export const AddNotePreloader: React.FC<IAddNotePreloader> = ({
  onOpenModal,
}) => {
  return (
    <>
      <button className={styles.addButton} onClick={onOpenModal}>
        <div className={styles.addNotePreload}>
          <div className={styles.plusIcon}></div>
        </div>
      </button>
    </>
  );
};
