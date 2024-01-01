import { API_URL, Forget_Reset_URL } from "@/lib/url";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(
  immer((set) => ({
    login: async (values) => {
      return await axios.post(`${API_URL}`, {
        ...values,
      });
    },
    register: async (values) => {
      return await axios.post(`${API_URL}/register`, {
        ...values,
      });
    },
    forget: async (values) => {
      return await axios.post(`${Forget_Reset_URL}/forgot-password`, {
        ...values
      });
    },
    reset: async ( code ,values) =>{
      return await axios.post(`${Forget_Reset_URL}/reset-password`, {
            code, ...values
        });
    }
  }))
);
