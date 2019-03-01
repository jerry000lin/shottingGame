cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.enemyBullet = this.node.parent.getComponent("enemyBullet")
        this.node.y = this.enemyBullet.rStart
    },
    update (dt) {
        this.node.y -= this.enemyBullet.rSpeed*dt
        if(this.node.y>this.node.parent.parent.height||this.node.y<-this.node.parent.parent.height){
            this.node.destroy()
        }
    }
});
