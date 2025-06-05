import { z } from "zod";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

// Schema de validación
export const userInfoSchema = z.object({
    firstName: z.string().min(1, 'El nombre es requerido').optional(),
    lastName: z.string().min(1, 'El apellido es requerido').optional(),
    birthDate: z.string().optional(),
    shippingAddress: z.string().optional(),

    city: z.string().min(2, "La ciudad es requerida"),
    state: z.string().min(2, "El estado/provincia es requerido"),
    zipCode: z.string().min(3, "El código postal es requerido"),
    country: z.string().min(2, "El país es requerido"),
    phoneNumber: z.string().min(8, "Número de teléfono válido requerido"),
    instructions: z.string().optional(),
});

export type UserFormFields = z.infer<typeof userInfoSchema>;

export type UserInfoFormData = z.infer<typeof userInfoSchema> & { id: number };

export interface UserInfoStore {
    userInfo: UserInfoFormData;
    isLoading: boolean;
    error: string | null;
    setUserInfo: (data: UserInfoFormData) => void;
    setIsLoading: (isLoading: boolean) => void;
    clearError: () => void;
    getUserInfo: () => UserInfoFormData;
    reset: () => void;
}
  
const initialUserInfo: UserInfoFormData = {
  id: 0,
  firstName: '',
  lastName: '',
  birthDate: '',
  shippingAddress: '',
  phoneNumber: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  instructions: '',
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set, get) => ({
        userInfo: initialUserInfo,
        isLoading: false,
        error: null,
        setUserInfo: (data: UserInfoFormData) => set({ userInfo: data }),
        setIsLoading: (isLoading: boolean) => set({ isLoading }),
        clearError: () => set({ error: null }),
        getUserInfo: () => get().userInfo,
        reset: () => {
          set({ userInfo: initialUserInfo, isLoading: false, error: null });
        },
    }),
    {
      name: 'user-storage',
    }
  )
);