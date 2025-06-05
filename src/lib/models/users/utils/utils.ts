    import { UserResponseDto } from "../dtos/UserResponseDto";

    // Utility functions para trabajar con UserResponseDto
    export const getUserFullName = (user: Pick<UserResponseDto, 'firstName' | 'lastName'>): string => {
        return `${user.firstName} ${user.lastName}`;
    };

    export const calculateAge = (birthDate: string): number | null => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();

        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    // Regex patterns para validaciones (equivalentes a las de Java)
    export const USER_VALIDATION_PATTERNS = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phoneNumber: /^\+?[1-9]\d{1,14}$/,
        // Patrones de longitud para referencia
        firstName: { min: 2, max: 50 },
        lastName: { min: 2, max: 50 },
        shippingAddress: { min: 10, max: 200 },
        password: { min: 8 }
    } as const;