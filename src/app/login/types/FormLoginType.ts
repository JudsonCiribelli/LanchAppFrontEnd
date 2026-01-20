import z from "zod";
import { LoginSchema } from "../schemas/schema";

export type FormLoginTypeState = {
  success: boolean;
  message: string | null;
  redirectTo?: string;
  errors?: {
    [K in keyof z.infer<typeof LoginSchema>]?: string[];
  };
};
