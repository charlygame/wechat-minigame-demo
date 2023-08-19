export const WxLogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                resolve(res);
            },
            fail(err) {
                reject(err);
            }
        })
    });
}