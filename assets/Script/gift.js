cc.Class({
    extends: cc.Component,

    properties: {
        ySpeed: 0,//y轴速度
    },
    onCollisionEnter: function(other,self){
        if(other.node.group=="hero"){
            this.node.destroy();
        }
    },
    update (dt) {
        this.node.y -= dt*this.ySpeed;
        if ( this.node.y< -this.node.parent.height/2){
            this.node.destroy();
        }
    },
});
