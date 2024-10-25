import { SemVer } from "@/classes";

export const isSemVer = (variable: unknown): boolean => variable instanceof SemVer;

export default isSemVer;
