import styles from "Components/MainComponents/Sidebar/Sidebar.module.css";
import {Diary} from "Components/MainComponents/Diary/Diary";
import {useDiariesStore} from "Utilities/DiaryStore";
import {useNotesStore} from "Utilities/NotesStore";
import {ApiClient} from "ApiClient/ApiClient";
import {CreateDiary} from "@Interfaces/IDiaryContext";

export const Sidebar: React.FC = () => {
  const apiClient = new ApiClient();
  const diariesList = useDiariesStore(state => state.diaries);

  const fetchDiaries = useDiariesStore(state => state.fetchDiaries);
  const setSelectedDiary = useDiariesStore(state => state.setSelectedDiary);
  const fetchNotes = useNotesStore(state => state.fetchNotes);

  const userId: string = localStorage.getItem("userId") as string;

  const handleDiaryClick = (diaryId: number) => {
    return () => {
      setSelectedDiary(diaryId);
      fetchNotes(diaryId);
    };
  };

  const handleAddNewDiary = async () => {
    let request: CreateDiary = {
      userId: parseInt(userId),
      diaryName: "NewDiary",
    };
    await apiClient.postData<CreateDiary>(`/Diary/create`, request);
    fetchDiaries();
  };

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.diaries}>
          {diariesList.map(diary => (
            <div className={styles.diary}>
              <Diary
                key={diary.diaryId}
                diaryContent={diary}
                onChangeDashBoard={handleDiaryClick(diary.diaryId)}
              />
            </div>
          ))}
        </div>
        <button className={styles.add_button} onClick={handleAddNewDiary}>
          Add
        </button>
      </div>
    </>
  );
};
