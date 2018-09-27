export interface ErrorResponse {
  status: number;
  message: string;
  [x: string]: any;
}

export interface MessageResponse {
  status: number;
  message: string;
  acknowledged?: boolean;
  [x: string]: any;
}
