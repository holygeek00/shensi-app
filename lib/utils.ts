import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const container = cn(
  "mx-auto max-w-3xl",
  "px-4",
  "py-10",
  "sm:px-6",
  "lg:max-w-5xl",
  "xl:px-0"
)
