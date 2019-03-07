cc.Class({
    extends: cc.Component,
    properties: {
        moveTime: 0,
        positionY: 0,
        gift: {
            default: null,
            type: cc.Prefab
        },
        actionFreqTime: 0,
        actionTime: 0
    },
    onLoad() {

        this.node.on("enemyDestory", () => {
            console.log("ufo destroy")
            this.addGift()
            this.node.parent.getComponent("enemyGroup").ufoDestory()
        })

        this.moveAction = this.setMoveAction()
        // moveDown 回调
        var startDone = cc.callFunc(function () {
            this.schedule(() => {
                this.node.runAction(this.moveAction);
            }, this.actionFreqTime);
        }, this);

        const moveDown = cc.moveTo(this.moveTime, cc.v2(this.node.x, this.positionY))
        this.node.runAction(cc.sequence(moveDown, startDone));
    },
    setMoveAction: function () {
        var moveLeft = cc.moveTo(this.actionTime / 4, cc.v2(-this.node.parent.width / 2, this.positionY));
        var moveMeddle = cc.moveTo(this.actionTime / 4, cc.v2(0, this.positionY));
        var moveRight = cc.moveTo(this.actionTime * 2 / 5, cc.v2(this.node.parent.width / 2, this.positionY));

        return cc.sequence(moveLeft, moveRight, moveMeddle);
    },
    addGift() {
        var gift = cc.instantiate(this.gift);
        gift.setPosition(this.node.position)
        this.node.parent.addChild(gift)

    }
});