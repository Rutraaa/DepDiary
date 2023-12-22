export interface DiarysResponse {
  diaryId: number;
  diaryName: string;
  createDate: string;
  cpdateDate: string;
}

export interface CreateDiary {
  userId: number;
  diaryName: string;
}

export interface UpdateDiary {
  userId: number;
  diaryName: string;
}
