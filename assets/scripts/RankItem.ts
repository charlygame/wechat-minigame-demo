import { _decorator, Component, Node, Label, Sprite } from 'cc';
import { RankItemData } from './types';
const { ccclass, property } = _decorator;

@ccclass('RankItem')
export class RankItem extends Component {

    protected nameLabel: Label = null;
    protected scoreLabel: Label = null;
    protected avatorIcon: Sprite = null;

    protected onLoad(): void {
        this.nameLabel = this.node.getChildByName('Name').getComponent(Label);
        this.scoreLabel = this.node.getChildByName('Score').getComponent(Label);
        this.avatorIcon = this.node.getChildByName('Avator').getComponent(Sprite);
    }

    setItemData(data: RankItemData) {
        console.log(">>>>> nameLabel >>>>", this.nameLabel);
        console.log(">>>>> scoreLabel >>>>>", this.scoreLabel);

        console.log(">>>>> data >>>>>", data);
        this.nameLabel.string = data.nickName;
        this.scoreLabel.string = data.score;
        // this.avatorIcon.spriteFrame = data.avatorIcon;
    }

    update(deltaTime: number) {
        
    }
}

