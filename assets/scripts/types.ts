export interface UserInfo {
    score?: number;
    nickName?: string;
    avatarUrl?: string;
}

export interface WxUserInfo {
    nickName: string;
    avatarUrl: string;
}

export interface WxGetUserProfileResult {
    userInfo: WxUserInfo;
}

export interface RankItemData {
    nickName: string;
    score: string;
    avatarUrl: string;
}
