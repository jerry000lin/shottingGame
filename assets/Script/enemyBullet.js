cc.Class({
    extends: cc.Component,

    properties: {
        wStart:0,
        wSpeed:0,
        rStart:0,
        rSpeed:0
    },

    onLoad () {
        this.node.rotation = this.wStart
    },
    update (dt) {
        this.node.rotation += this.wSpeed*dt
    }
});
