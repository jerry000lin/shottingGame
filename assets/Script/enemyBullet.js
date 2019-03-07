cc.Class({
    extends: cc.Component,

    properties: {
        wSpeed:0,
        rStart:0,
        rSpeed:0,
        wStart:0
    },

    onLoad () {
        this.node.rotation = this.wStart
    },
    update (dt) {
        if(this.wSpeed!=0){
            this.node.rotation += this.wSpeed*dt
        }
    }
});
