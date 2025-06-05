import { USER_VALIDATION_PATTERNS } from "../../users/utils/utils";

export const AUTH_VALIDATION_PATTERNS = {
    ...USER_VALIDATION_PATTERNS
  } as const;
  
  // Utility functions for auth
  export const createAuthHeader = (token: string, type: string = 'Bearer'): string => {
    return `${type} ${token}`;
  };
  
  export const extractTokenFromHeader = (authHeader: string): string | null => {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    return null;
  };