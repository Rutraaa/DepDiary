export interface NotesResponse {
    Content: string;
    Title: string;
    CreateDate: string;
    UpdateDate: string;
};

export interface CreateNote {

    DiaryId: number;
    Title: string;
    Content: string;
}

export interface UpdateNote {

    Content: string;
    Title: string;
}

