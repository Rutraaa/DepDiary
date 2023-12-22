import {create} from "zustand";
import {ApiClient} from "ApiClient/ApiClient";
import {NotesResponse} from "@Interfaces/INoteContext";

interface NoteStore {
  selectedNotes: number;
  setSelectedNotes: (selectedNotesId: number) => void;
  notes: NotesResponse[];
  setNotes: (diaries: NotesResponse[]) => void;
  fetchNotes: (diaryId: number) => void;
  fetchNotesS: (selectedUserId: number) => void;
}

const apiClient = new ApiClient();

export const useNotesStore = create<NoteStore>()(set => ({
  selectedNotes: 0,
  setSelectedNotes: selectedNotes => set({selectedNotes}),
  notes: [],
  setNotes: notes => set({notes}),
  fetchNotes: async diaryId => {
    const response = await apiClient.getData<NotesResponse[]>(
      `/Diary/notePerDiary`,
      diaryId
    );
    if (response) {
      set({notes: response.payload});
    }
  },
  fetchNotesS: async (selectedUserId: number) => {
    const response = await apiClient.getData<NotesResponse[]>(
      `/Diary/notePerDiary`,
      selectedUserId
    );
    if (response) {
      set({notes: response.payload});
    }
  },
}));
