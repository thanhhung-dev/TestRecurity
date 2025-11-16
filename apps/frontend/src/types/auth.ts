export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// API response types
export interface MessageResponse {
  message: string;
  success: boolean;
}

// Error type
export interface ApiError {
  message: string;
  status?: number;
  timestamp?: string;
  path?: string;
  details?: string;
}
