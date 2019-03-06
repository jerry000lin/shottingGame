
cc.Class({
    extends: cc.Component,
    properties: {
    },
    backToStart: function(){
        cc.director.loadScene('start');
    }
});
