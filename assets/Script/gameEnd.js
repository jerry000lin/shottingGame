
cc.Class({
    extends: cc.Component,
    properties: {
        scoreDisplay:cc.Node
    },
    onLoad(){
        this.score = window.score
        this.scoreDisplay.getComponent(cc.Label).string = this.score||0;
    },
    backToStart: function(){
        cc.director.loadScene('start');
    }
});
