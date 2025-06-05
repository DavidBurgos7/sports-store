// UserDto

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string; // ISO 8601 date string (YYYY-MM-DD)
  shippingAddress: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
}
