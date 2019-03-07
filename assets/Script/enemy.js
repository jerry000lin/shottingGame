//子弹组
var bulletSetting = cc.Class({
    name:'bulletSetting',
    properties: {
        startAxis:{
            default:0
        },
        endAxis:{
            default:360
        },
        enemyBulletPrefab:{
            default:null,
            type:cc.Prefab
        },
        eachNumber:{
            default:30
        }
    }
}); 
cc.Class({
    extends: cc.Component,

    properties: {
        HP:0,
        boom_prefab:{
            default: null,
            type: cc.Prefab
        },
        enemyBulletSetting:{
            default:[],
            type:bulletSetting
        },
        freqTime:0,
    },
    onLoad(){
        this.enemyGroup = this.node.parent.getComponent('enemyGroup');
        this.enemyBulletGroup = this.enemyGroup.enemyBulletGroup

        this.schedule(this.addEnemyBullet, this.freqTime);
    },
    start(){
        this.scheduleOnce(()=>{
            this.addEnemyBullet()
        }, 0.5+Math.random());
    },
    onCollisionEnter: function(other,self){
        if(other.node.group=="heroBullet"){
            var bullet = other.node.getComponent('bullet');
            if (this.HP>0){
                this.HP -= bullet.hurt;
                var anim = this.getComponent(cc.Animation);
                anim.play();
            } else {
                this.node.group = 'default'; //不让动画在执行碰撞
                //播放爆炸动画
                var anim = this.getComponent(cc.Animation);
                anim.play("enemyOnDestory");

                anim.on('finished',  this.onFinished, this);

                this.boomFxNode = cc.instantiate(this.boom_prefab)
                this.node.addChild(this.boomFxNode);
                this.boomFxNode.setPosition(0,0);
            }
        }
    },
    //批量生成子弹
    addEnemyBullet(){
        const randKey = Math.floor(Math.random() * this.enemyBulletSetting.length);
        const enemyBulletSetting = this.enemyBulletSetting[randKey]

        let rang = enemyBulletSetting.endAxis-enemyBulletSetting.startAxis
        var delRotation = rang/enemyBulletSetting.eachNumber
        

        for (let i = 0; i < enemyBulletSetting.eachNumber; ++i) {
            let newNode = this.newEnemyBullet(this.enemyBulletSetting[randKey].enemyBulletPrefab);
            newNode.rotation = enemyBulletSetting.startAxis+delRotation*i;
        }
    },
    newEnemyBullet:function(bulletPrefab){
        var enemyBullet = cc.instantiate(bulletPrefab);
        this.enemyBulletGroup.addChild(enemyBullet)
        var enemyPosition = this.node.getPosition()
        enemyBullet.setPosition(enemyPosition)
        return enemyBullet
    },
    onFinished: function(event) {
        this.boomFxNode.destroy()
        this.unscheduleAllCallbacks();
        console.log("boomfinish")
        this.node.emit("enemyDestory")
    },
});
