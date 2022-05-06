export interface User {
  tokenInfo?: TokenInfo;
  userInfoData?: any;
}
export interface CurrentUserData {
  username?: string 
}
export interface TokenInfo {
  accessToken: string 
  expiresIn: number
}