export interface AbstractBehavior {

    login(): Promise<boolean>;
    updateUserInfo(data: unknown): void;
    getRankList(): Promise<unknown>;
    getUserProfile(): Promise<unknown>;
}