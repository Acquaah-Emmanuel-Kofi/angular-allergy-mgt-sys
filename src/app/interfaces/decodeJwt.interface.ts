export interface DecodedToken {
  header: Object;
  payload: any;
  signature: string;
}

export interface PayloadData {
    userId: string;
    username: string;
}
