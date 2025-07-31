export interface IMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: string;
    release_date: string;
    original_language:string
}
export const defaultMovie : IMovie = {
    id: 0,
    title: "",
    overview: "",
    poster_path:"",
    vote_average:"",
    release_date: "",
    original_language: ""
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}