cc.Class({
    extends: cc.Component,
    properties:{
        moveTime:0,
        positionY:0,
        gift:{
            default:null,
            type:cc.Prefab
        }
    },
    onLoad(){
        this.moveAction = this.setMoveAction()
        this.node.runAction(this.moveAction);
    },
    setMoveAction: function () {
        var moveLeft = cc.moveTo(this.moveTime/2, cc.v2(-this.node.parent.width/2, this.positionY));
        var moveRight = cc.moveTo(this.moveTime/2, cc.v2(this.node.parent.width/2,this.positionY));
        // 不断重复
        return cc.repeatForever(cc.sequence(moveLeft, moveRight));
    },
    addGift(){
        var gift = cc.instantiate(this.gift);
        gift.setPosition(this.node.position)
        this.node.parent.addChild(gift)

    },
    onDestroy(){
        this.addGift()
        this.node.parent.getComponent("enemyGroup").ufoDestory()
        
    }
});