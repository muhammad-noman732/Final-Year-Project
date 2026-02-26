export type UserRole = 'student' | 'admin' | 'vc' | 'hod';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordStrength {
  level: 'weak' | 'fair' | 'good' | 'strong';
  score: number;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}
