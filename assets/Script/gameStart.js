
cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad:function(){
        cc.director.preloadScene('main');
    },
    startGame: function(){
        cc.director.loadScene('main')
    }
});
