
interface RequestOption {
    url: string;
    method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
    data?: any;
    header?: any;
}

export const WxRequest = (option: RequestOption): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...option,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    });
}