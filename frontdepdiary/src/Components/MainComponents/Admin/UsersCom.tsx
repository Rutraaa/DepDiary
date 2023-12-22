import React, {useState, useEffect} from "react";
import styles from "./AdminDashboard.module.css";
import {useDiariesStore} from "Utilities/DiaryStore";
import {User} from "./AdminDashboard";
import {DiaryCom} from "./DiaryCom";
import {ApiClient} from "ApiClient/ApiClient";

interface UserProp {
  user: User;
}

export const UsersCom: React.FC<UserProp> = user => {
  const apiClient = new ApiClient();

  const [openDiaries, setOpenDiaries] = useState(false);

  const fetchDiariesS = useDiariesStore(state => state.fetchDiariesS);
  const diaries = useDiariesStore(state => state.diaries);

  const handleSelectedUser = (userId: number) => {
    setOpenDiaries(!openDiaries);
    fetchDiariesS(userId);
  };

  const handleDeleteNote = async () => {
    await apiClient.deleteData(`/User/delete`, user.user.userId);
  };

  return (
    <>
      <div className={styles.userBlock}>
        <div className={styles.title}>{user.user.username}</div>
        <div className={styles.buttons}>
          <button className={styles.editButton}>Edit</button>
          <button className={styles.deleteButton} onClick={handleDeleteNote}>
            Delete
          </button>
          <button
            className={styles.selectButton}
            onClick={() => handleSelectedUser(user.user.userId)}
          >
            Select
          </button>
        </div>
      </div>
      {openDiaries &&
        diaries?.map(diary => <DiaryCom key={diary.diaryId} diary={diary} />)}
    </>
  );
};
