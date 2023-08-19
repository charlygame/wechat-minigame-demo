import { StateManager } from "../StateManager";
import { SERVER_HOST } from "../constants";
import { UserInfo, WxGetUserProfileResult, WxUserInfo } from "../types";
import { WxLogin } from "../utils/WxLogin";
import { WxRequest } from "../utils/WxRequest";
import { AbstractBehavior } from "./AbstractBehavior";

export class WxPlatformAdapter implements AbstractBehavior {
    constructor() {
    }

    async login(): Promise<boolean> {
       const res = await WxLogin() as unknown as {code: string};
       try {
            const { data } = await WxRequest({
                url: `${SERVER_HOST}/v1/user/wx_login/${res.code}/`,
            }) as { data: {token: string} };
            
            StateManager.getInstance().setToken(data.token);
            return true;
       } catch(err) {
           console.log(err);
       }
        return false;
    }

    async updateUserInfo(data: UserInfo) {
        
        try {
            await WxRequest({
                url: `${SERVER_HOST}/v1/user/`,
                method: "PUT",
                header: {
                    Authorization: `${StateManager.getInstance().getToken()}`
                },
                data: {
                    score: data.score,
                    username: data.nickName,
                    avatar: data.avatarUrl
                }
            });
        } catch(err) {
            console.log(err);
        }

    }
    async getRankList(): Promise<unknown> {
        try {
            return WxRequest({
                url: `${SERVER_HOST}/v1/user/rank-list/`,
                method: "GET",
                header: {
                    Authorization: `${StateManager.getInstance().getToken()}`
                }
            });
        } catch(err) {
            console.log(err);
        }
    }

    getUserProfile(): Promise<WxGetUserProfileResult> {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res){
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                      success: function(res) {
                        resolve(res);
                      },
                      fail: function(err) {
                        reject(err);
                      }
                    })
                  } else {
                    let button = wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: 640,
                            height: 960,
                            lineHeight: 40,
                            backgroundColor: 'rgba(0,0,0,0)',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 16,
                            borderRadius: 4,
                            borderColor: "",
                            borderWidth: 0,
                        }
                      })
                      button.onTap((res) => {
                        // 用户同意授权后回调，通过回调可获取用户头像昵称信息
                        button.destroy();
                        resolve(res);
                      })
                  }
                },
                fail(err) {
                    reject(err);
                }
              })
        });
    }
}