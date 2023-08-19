import { _decorator, Component, find, Node, Label, Button } from 'cc';
import { PlatformAdapter } from './platform-adapter/PlatformAdapter';
import { Rank } from './Rank';
import { RankItemData } from './types';

const { ccclass, property } = _decorator;

@ccclass('Demo')
export class Demo extends Component {

    protected scoreLabel: Label = null;
    protected score: number = 0;
    protected rankUI: Node = null;
    start() {

    }

    protected onLoad(): void {
        console.log('Demo onLoad');
        this.scoreLabel = find('Canvas/GameUI/Label').getComponent(Label);
        this.scoreLabel.string = this.score.toString();

        find('Canvas/GameUI/AddButton').getComponent(Button).node.on(Button.EventType.CLICK, this.onAddHandler, this);
        find('Canvas/GameUI/SubButton').getComponent(Button).node.on(Button.EventType.CLICK, this.onSubHandler, this);
        find('Canvas/GameUI/SubmitButton').getComponent(Button).node.on(Button.EventType.CLICK, this.onSubmitHandler, this);
        find('Canvas/GameUI/RankButton').getComponent(Button).node.on(Button.EventType.CLICK, this.onRankHandler, this);

        this.rankUI = find('Canvas/RankUI');
    }

    onAddHandler(): void {
        this.score++;
        this.scoreLabel.string = this.score.toString();
    }

    onSubHandler(): void {
        if (this.score <= 0) {
            return;
        }
        this.score--;
        this.scoreLabel.string = this.score.toString();
    }

    onSubmitHandler(): void {
        PlatformAdapter.getInstance().getPlatform().updateUserInfo({
            score: this.score
        })
    }

    async onRankHandler() {
        const result = await PlatformAdapter.getInstance().getPlatform().getRankList() as {data: {
            username: string;
            score: number;
            avatar: string;
        }[]};
        this.rankUI.active = true;
        if (result && !result.data || result.data.length <= 0) {
            return;
        }

        const rankItemList = result.data.map((item) => {
            return {
                nickName: item.username,
                score: item.score.toString(),
                avatarUrl: item.avatar
            }
        }) as RankItemData[]

        (this.rankUI.getComponent('Rank') as Rank).setRankData(rankItemList);
    }

    update(deltaTime: number) {
        
    }
}

