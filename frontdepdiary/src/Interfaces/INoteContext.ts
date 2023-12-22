export interface NotesResponse {
  noteId: number;
  content: string;
  title: string;
  createDate: string;
  updateDate: string;
}

export interface CreateNote {
  diaryId: number;
  title: string;
  content: string;
}

export interface UpdateNote {
  content: string;
  title: string;
}
