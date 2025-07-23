import axios from "axios";
import { type User } from "../../shared/types/userType";

const API_URL = "/api/v1";

export const authApi = {
  async register(userData: {
    name: string;
    surName: string;
    password: string;
    fullName: string;
    email: string;
    birthDate?: string;
    telephone?: string;
    employment?: string;
    userAgreement: boolean;
  }) {
    const response = await axios.post(`${API_URL}/users`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

export const userEdit = {
  async updateUser(id: string, data: Partial<User>) {
    const response = await axios.patch(`${API_URL}/users/${id}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  },
};

export const userApi = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  },
};

export const userLogout = {
  async logoutUser() {
    return await axios.post(`${API_URL}/auth/logout`, null, {
      withCredentials: true,
    });
  },
};

export const userDelete = {
  async deleteUser(id: string) {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },
};
