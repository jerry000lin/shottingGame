cc.Class({
    extends: cc.Component,

    properties: {
       scoreDisplay:{
           type:cc.Node,
           default:null
       }
    },
    onLoad(){
        this.score = 0
    },
    //增加分数
    gainScore: function (value) {
        this.score += value;
        //更新 scoreDisplay Label 的文字
        console.log(this.score)
        this.scoreDisplay.getComponent(cc.Label).string = "Score:"+this.score;
        console.log(this.scoreDisplay.string)
    },
});
