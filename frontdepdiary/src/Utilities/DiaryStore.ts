import {create} from "zustand";
import {ApiClient} from "ApiClient/ApiClient";
import {DiarysResponse} from "@Interfaces/IDiaryContext";

interface DiaryStore {
  selectedDiary: number;
  setSelectedDiary: (selectedDiaryId: number) => void;
  diaries: DiarysResponse[];
  setDiaries: (diaries: DiarysResponse[]) => void;
  fetchDiaries: () => void;
  fetchDiariesS: (selectedUserId: number) => void;
}

const apiClient = new ApiClient();
const userId: string = localStorage.getItem("userId") as string;

export const useDiariesStore = create<DiaryStore>()(set => ({
  selectedDiary: 0,
  setSelectedDiary: selectedDiary => set({selectedDiary}),
  diaries: [],
  setDiaries: diaries => set({diaries}),
  fetchDiaries: async () => {
    const response = await apiClient.getData<DiarysResponse[]>(
      "/Diary/userDiariesList",
      parseInt(userId)
    );

    if (response) {
      set({diaries: response.payload});
    }
  },
  fetchDiariesS: async (selectedUserId: number) => {
    const response = await apiClient.getData<DiarysResponse[]>(
      "/Diary/userDiariesList",
      selectedUserId
    );

    if (response) {
      set({diaries: response.payload});
    }
  },
}));
