export interface DiarysResponse {

    DiaryName: string;
    CreateDate: string;
    UpdateDate: string;
};

export interface CreateDiary {

    UserId: number;
    DiaryName: string;
}

export interface UpdateDiary {

    DiaryName: string;
}