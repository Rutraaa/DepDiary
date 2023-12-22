import styles from "Components/MainComponents/Dashboard/Dashboard.module.css";
import {Sidebar} from "../Sidebar/Sidebar";
import {NotePanel} from "../Notes/NotePanel/NotePanel";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDiariesStore} from "Utilities/DiaryStore";

export const Dashboard = () => {
  const navigate = useNavigate();

  const fetchDiaries = useDiariesStore(state => state.fetchDiaries);

  useEffect(() => {
    fetchDiaries();
  });

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/", {replace: true});
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.topbar}>
            <button className={styles.logout_button} onClick={handleLogOut}>
              Log out
            </button>
          </div>
          <div className={styles.noteContent}>
            <NotePanel />
          </div>
        </div>
      </div>
    </>
  );
};
