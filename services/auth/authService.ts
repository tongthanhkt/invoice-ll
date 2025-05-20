import { User } from "@/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

class AuthService {
  private static instance: AuthService;
  private baseUrl: string;

  private constructor() {
    // console.log("process.env.NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL);
    this.baseUrl = "/api";
    // // this.baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async getProfile(): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return response.json();
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return response.json();
  }
}

export const authService = AuthService.getInstance();
