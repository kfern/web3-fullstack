import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ApiError } from "../../app/api";

export enum LocalStatus {
  IDLE = "idle",
  SEARCH_INIT = "search.init",
  SEARCH_SUBMIT = "search.submit",
  SEARCH_ERROR = "search.error",
}
export interface LocalShow {
  input: boolean;
  search: boolean;
  error: boolean;
}
export interface LocalState {
  status: LocalStatus;
  input: string;
  show: LocalShow;
  error: string;
}

export interface SearchFormData {
  query: string;
}
interface IDLE_ACTION {
  status: LocalStatus.IDLE;
}
interface SEARCH_INIT_ACTION {
  status: LocalStatus.SEARCH_INIT;
}
interface SEARCH_SUBMIT_ACTION {
  status: LocalStatus.SEARCH_SUBMIT;
  params: { query: string };
}
interface SEARCH_ERROR_ACTION {
  status: LocalStatus.SEARCH_ERROR;
  params: { error: ApiError };
}

export const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => "status" in error;

export type SetStatusPayload = IDLE_ACTION | SEARCH_INIT_ACTION | SEARCH_SUBMIT_ACTION | SEARCH_ERROR_ACTION;
