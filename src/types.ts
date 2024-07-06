// src/types.ts
export interface User {
    name: {
      first: string;
      last: string;
    };
    email: string;
    location: {
      country: string;
    };
    phone: string;
    dob: {
      date: string;
      age: number;
    };
    gender: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }
  