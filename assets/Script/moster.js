cc.Class({
    extends: cc.Component,
    properties:{
        moveTime:0,
        positionY:0
    },
    onLoad(){
        this.moveAction = this.setMoveAction()
        this.node.runAction(this.moveAction);
    },
    setMoveAction: function () {
        return cc.moveTo(this.moveTime, cc.v2(this.node.x,this.positionY));
    },
    onDestroy(){
        this.node.parent.getComponent("enemyGroup").enemyDestory()
    }
});
