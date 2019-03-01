cc.Class({
    extends: cc.Component,

    properties:{
        hero:{
            type:cc.Node,
            default:null
        },
        freqTime:0,
        heroBulletPrefab:{
            type:cc.Prefab,
            default:null
        }
    },

    onLoad:function(){
        this.addheroBullet()
        this.schedule(this.addheroBullet, this.freqTime);
        this.offsetY = this.hero.height/2
    },
    addheroBullet:function(){
        var newheroBullet = cc.instantiate(this.heroBulletPrefab);
        this.node.addChild(newheroBullet)
        var heroPosition = this.hero.getPosition()
        newheroBullet.setPosition(heroPosition.x,heroPosition.y+this.offsetY)
    }
});
