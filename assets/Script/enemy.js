cc.Class({
    extends: cc.Component,

    properties: {
        HP:0,
        ySpeed:0,
        boom_prefab:{
            default: null,
            type: cc.Prefab
        },
        enemyPositionY:0,
        enemyBulletPrefab:{
            default:[],
            type:cc.Prefab
        },
        freqTime:0,
        eachNumber:0
    },
    onLoad(){
        this.fireTime = 0

        this.isDestory = false
        this.enemyGroup = this.node.parent.getComponent('enemyGroup');
        this.enemyBulletGroup = this.enemyGroup.enemyBulletGroup

        this.schedule(this.addEnemyBullet, this.freqTime);
    },
    start(){
        setTimeout(this.addEnemyBullet.bind(this), 500+Math.random()*1000);
    },
    update:function(dt){
        if(this.isDestory){
            return
        }
        if (this.node.y>this.enemyPositionY){
            this.node.y -= dt*this.ySpeed;
        }

        if ( this.node.y < -this.node.parent.height/2){
            this.node.destroy();
        }
    },
    onCollisionEnter: function(other,self){
        if(other.node.group=="heroBullet"){
            var bullet = other.node.getComponent('bullet');
            if (this.HP>0){
                this.HP -= bullet.hurt;
                var anim = this.getComponent(cc.Animation);
                anim.play();
            } else {
                this.isDestory = true
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
        let offset,rotationDirection;
        var delRotation = 360/this.eachNumber
        if(this.fireTime%2==0){
            offset = delRotation/2;
            rotationDirection = -1
        }else{
            offset = 0;
            rotationDirection = 1
        }

        let randKey = Math.floor(Math.random() * this.enemyBulletPrefab.length);
        for (let i = 0; i < this.eachNumber; ++i) {
            let newNode = this.newEnemyBullet(this.enemyBulletPrefab[randKey]);
            newNode.rotation = delRotation*i+offset;
            newNode.getComponent("enemyBullet").wSpeed *= rotationDirection
        }
        this.fireTime++
    },
    newEnemyBullet:function(bulletPrefab){
        var enemyBullet = cc.instantiate(bulletPrefab);
        this.enemyBulletGroup.addChild(enemyBullet)
        var enemyPosition = this.node.getPosition()
        enemyBullet.setPosition(enemyPosition.x,enemyPosition.y)
        return enemyBullet
    },
    //动画结束后 动画节点回收
    onFinished: function(event) { 
        this.boomFxNode.destroy()
        this.node.destroy()
        this.enemyGroup.enemyDestory()
    },
});
