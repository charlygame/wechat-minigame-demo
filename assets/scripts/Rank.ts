import { _decorator, Asset, Button, Component, find, Node, resources, instantiate, Prefab, ScrollView, UITransform } from 'cc';
import { RankItemData } from './types';
import { RankItem } from './RankItem';
const { ccclass, property } = _decorator;

@ccclass('Rank')
export class Rank extends Component {

    protected itemAsset: Prefab = null;
    protected scrollView: Node = null;

    protected onLoad(): void {
        console.log(find('Canvas/RankUI/CloseButton').getComponent(Button));
        find('Canvas/RankUI/CloseButton').getComponent(Button).node.on(Button.EventType.CLICK, this.onCloseHandler, this);
        this.scrollView = find('Canvas/RankUI/ScrollView');
    }

    setRankData(data: RankItemData[]): void {
        var self = this;
        resources.load('prefabs/RankItem',Prefab, (err, item) => {
            for (let i = 0; i < data.length; i++) {
                const prefabNode = instantiate(item);
                self.scrollView.getComponent(ScrollView).content.addChild(prefabNode);
                const rankItem = prefabNode.getComponent(RankItem);
                rankItem.setItemData(data[i]);
                self.scrollView.getComponent(ScrollView).content.getComponent(UITransform).height = (i + 1) * 100;
            }
        });
    }

    onCloseHandler(): void {
        find('Canvas/RankUI').active = false;
        this.scrollView.getComponent(ScrollView).content.removeAllChildren();
    }

    update(deltaTime: number) {
        
    }
}

