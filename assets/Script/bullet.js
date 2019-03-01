cc.Class({
    extends: cc.Component,

    properties: {
        hurt:0,
        ySpeed: 0,//y轴速度
        
    },

    onLoad () {
        cc.director.getCollisionManager().enabled=true;
    },
    onCollisionEnter: function(other,self){
        if(other.node.group=="enemy"){
            this.node.destroy();
        }
    },
    update (dt) {
        this.node.y += dt*this.ySpeed;
        if ( this.node.y> this.node.parent.height/2){
            this.node.destroy();
        }
    },
});
