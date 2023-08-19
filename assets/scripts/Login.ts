import { _decorator, Component, Node, Button, find } from 'cc';
import { PlatformAdapter } from './platform-adapter/PlatformAdapter';
import { WxGetUserProfileResult } from './types';
const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {

    protected onLoad(): void {
        console.log('Login onLoad');
        find('Canvas/LoginUI/StartButton').getComponent(Button).node.on(Button.EventType.CLICK, this.onStartHandler, this);
    }

    start() {

    }
    async onStartHandler() {
        console.log('onStartHandler');
        const isSuccess =  await PlatformAdapter.getInstance().getPlatform().login();
        if (isSuccess) {
            console.log('login success');
            try {
                find('Canvas/LoginUI').active = false;
                find('Canvas/GameUI').active = true;
                const res = await PlatformAdapter.getInstance().getPlatform().getUserProfile() as unknown as WxGetUserProfileResult;
                
                console.log(res);
                PlatformAdapter.getInstance().getPlatform().updateUserInfo({
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                })

            } catch(err) {
                console.log(err);
            }
        }
    }

    update(deltaTime: number) {
        
    }
}

