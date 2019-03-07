cc.Class({
    extends: cc.Component,
    properties:{
        moveTime:0,
        positionY:0
    },
    onLoad(){
        this.moveAction = this.setMoveAction()
        this.node.runAction(this.moveAction);
        this.node.on("enemyDestory",()=>{
            this.node.parent.getComponent("enemyGroup").mosterDestory()
        })
    },
    setMoveAction: function () {
        return cc.moveTo(this.moveTime, cc.v2(this.node.x,this.positionY));
    }
});
