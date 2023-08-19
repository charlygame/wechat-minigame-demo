import { sys } from "cc";
import { AbstractBehavior } from "./AbstractBehavior";
import { WxPlatformAdapter } from "./WxPlatformAdapter";

export class PlatformAdapter {

    private currentPlatform: AbstractBehavior = null;
    constructor() {
        this.initPlatform();
    }

    static instance: PlatformAdapter;
    
    static getInstance(): PlatformAdapter {
        if (!PlatformAdapter.instance) {
            PlatformAdapter.instance = new PlatformAdapter();
        }
        return PlatformAdapter.instance;
    }
    getPlatform(): AbstractBehavior {
        return this.currentPlatform;
    }
    initPlatform(): AbstractBehavior {
        if (sys.platform === sys.Platform.WECHAT_GAME) {
            this.currentPlatform = new WxPlatformAdapter();
        }
        return null;
    }
}