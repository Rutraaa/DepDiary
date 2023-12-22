import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {
  LoginRequest,
  RegistrationRequest,
  UserContext,
} from "@Interfaces/IAuthRegContext";
import {ResponsePayload} from "Interfaces/IResponseContext";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://localhost:7238";
  }

  private async handleResponse<T>(
    response: AxiosResponse<T>
  ): Promise<ResponsePayload<T>> {
    if (response.status >= 200 && response.status < 300) {
      let result = new ResponsePayload<T>();
      result.status = "Ok";
      result.payload = response.data;
      return result;
    } else {
      let result = new ResponsePayload<T>();
      result.status = response.statusText;
      return result;
    }
  }

  public async getData<T>(
    endpoint: string,
    id: number
  ): Promise<ResponsePayload<T>> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${endpoint}/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async getDataList<T>(endpoint: string): Promise<ResponsePayload<T>> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async postData<T>(
    endpoint: string,
    data: any
  ): Promise<ResponsePayload<T>> {
    try {
      const response = await axios.post<T>(`${this.baseUrl}${endpoint}`, data, {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async putData<T>(
    endpoint: string,
    data: any,
    id: number
  ): Promise<ResponsePayload<T>> {
    try {
      const response = await axios.put<T>(
        `${this.baseUrl}${endpoint}/${id}`,
        data,
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async deleteData(endpoint: string, id: number) {
    try {
      await axios.delete(`${this.baseUrl}${endpoint}/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("authToken")}`,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async getFile(
    endpoint: string,
    userId: number,
    diaryId: number,
    noteId: number
  ): Promise<File> {
    try {
      let response: File = await axios.get(
        `${this.baseUrl}${endpoint}/${userId}/${diaryId}/${noteId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async postFile(
    endpoint: string,
    userId: number,
    diaryId: number,
    noteId: number,
    formData: FormData
  ) {
    try {
      await axios.post(
        `${this.baseUrl}${endpoint}/${userId}/${diaryId}/${noteId}`,
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  public async Login(loginRequest: LoginRequest) {
    try {
      const result = await axios.post<UserContext>(
        `${this.baseUrl}` + "/Auth/login",
        loginRequest
      );
      localStorage.setItem("authToken", result.data.token);
      localStorage.setItem("userId", result.data.userId.toString());
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }

  public async Registration(registrationRequest: RegistrationRequest) {
    try {
      await axios.post<RegistrationRequest>(
        `${this.baseUrl}` + "/Auth/registration",
        registrationRequest
      );
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  }
}
