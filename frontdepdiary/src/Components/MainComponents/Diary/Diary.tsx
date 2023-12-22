import React, {useState} from "react";
import styles from "./Diary.module.css";
import {ApiClient} from "ApiClient/ApiClient";
import {DiarysResponse, UpdateDiary} from "@Interfaces/IDiaryContext";
import {useDiariesStore} from "Utilities/DiaryStore";

interface DiaryContent {
  diaryContent: DiarysResponse;
  onChangeDashBoard: () => void;
}

export const Diary: React.FC<DiaryContent> = ({
  diaryContent,
  onChangeDashBoard,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(diaryContent.diaryName);

  const apiClient = new ApiClient();
  const userId: string = localStorage.getItem("userId") as string;

  const fetchDiaries = useDiariesStore(state => state.fetchDiaries);

  const handleOnDelete = async () => {
    await apiClient.deleteData(`/Diary/delete`, diaryContent.diaryId);
    fetchDiaries();
  };

  const handleIsEditTitle = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    let request: UpdateDiary = {
      userId: parseInt(userId),
      diaryName: editedTitle,
    };

    await apiClient.putData<UpdateDiary>(
      `/Diary/update`,
      request,
      diaryContent.diaryId
    );

    fetchDiaries();
    setIsEditing(false);
  };

  return (
    <>
      <div className={styles.diary_button}>
        <button className={styles.trashButton} onClick={handleOnDelete}>
          Delete
        </button>
        <button className={styles.mainButton} onClick={onChangeDashBoard}>
          <div className={styles.diary}>
            {isEditing ? (
              <input
                type="text"
                className={styles.editTitle}
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
              />
            ) : (
              <>
                <div className={styles.name}>{diaryContent.diaryName}</div>
                <div className={styles.createDate}>
                  {diaryContent.createDate}
                </div>
              </>
            )}
          </div>
        </button>
        {isEditing ? (
          <button className={styles.editButton} onClick={handleSaveButtonClick}>
            Save
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleIsEditTitle}>
            Edit
          </button>
        )}
      </div>
    </>
  );
};
