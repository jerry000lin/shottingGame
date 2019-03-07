cc.Class({
    extends: cc.Component,

    properties: {
        heroSpeed:0,
        heroBulletPrefab:{
            type:cc.Prefab,
            default:null
        },
        heroLevelMax:0,
        heroBulletGroup:{
            type:cc.Node,
            default:null
        },
        bulletFreqTime:0,
        boom_prefab:{
            default: null,
            type: cc.Prefab
        },
    },

    addheroBullet:function(){
        let heroPosition = this.node.getPosition()
        let bullets = []
        for(let i =0;i<this.heroLevel;i++){
            let newHeroBullet = cc.instantiate(this.heroBulletPrefab)
            bullets.push(newHeroBullet)
            this.heroBulletGroup.addChild(newHeroBullet)
        }
        if(this.heroLevel==1){
            bullets[0].setPosition(heroPosition.x,heroPosition.y+this.heroHalfHeight)
        }else if(this.heroLevel==2){
            bullets[0].setPosition(heroPosition.x-5,heroPosition.y+this.heroHalfHeight)
            bullets[1].setPosition(heroPosition.x+5,heroPosition.y+this.heroHalfHeight)
        }else if (this.heroLevel==3){
            bullets[0].setPosition(heroPosition.x,heroPosition.y+this.heroHalfHeight)
            bullets[1].setPosition(heroPosition.x-15,heroPosition.y)
            bullets[2].setPosition(heroPosition.x+15,heroPosition.y)
        }else if(this.heroLevel==4){
            bullets[0].setPosition(heroPosition.x-5,heroPosition.y+this.heroHalfHeight)
            bullets[1].setPosition(heroPosition.x+5,heroPosition.y+this.heroHalfHeight)
            bullets[2].setPosition(heroPosition.x-15,heroPosition.y)
            bullets[3].setPosition(heroPosition.x+15,heroPosition.y)
        }
    },
    
    giftGetting(){
        if(this.heroLevel > this.heroLevelMax){
            this.node.parent.getComponent("main").gainScore(666)
            return
        }
        this.heroLevel ++
    },

    onLoad () {
        this.heroLevel = 1
        this.heroHalfHeight = this.node.height/2
        cc.director.getCollisionManager().enabled=true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.onDrag();

        this.schedule(this.addheroBullet, this.bulletFreqTime);
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.moveUp = true
                break;
            case cc.macro.KEY.s:
                this.moveDown = true
                break;
            case cc.macro.KEY.a:
                this.moveLeft = true
                break;
            case cc.macro.KEY.d:
                this.moveRight = true
                break;
        }
    },
    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.w:
                this.moveUp = false
                break;
            case cc.macro.KEY.s:
                this.moveDown = false
                break;
            case cc.macro.KEY.a:
                this.moveLeft = false
                break;
            case cc.macro.KEY.d:
                this.moveRight = false
                break;
        }
    },

    //添加拖动监听
    onDrag: function(){
        this.node.on('touchmove', this.dragMove, this);
    },
    //去掉拖动监听
    offDrag: function(){ 
         this.node.off('touchmove', this.dragMove, this);
    },
    //拖动
    dragMove: function(event){ 
        var locationv = event.getLocation();
        var location = this.node.parent.convertToNodeSpaceAR(locationv);
        //飞机不移出屏幕 
        var minX = -this.node.parent.width/2+this.node.width/2;
        var maxX = -minX;
        var minY = -this.node.parent.height/2+this.node.height/2;
        var maxY = -minY;
        if (location.x< minX){
            location.x = minX;
        }
        if (location.x>maxX){
            location.x = maxX;
        }
        if (location.y< minY){
            location.y = minY;
        }
        if (location.y> maxY){
            location.y = maxY;
        }
        this.node.setPosition(location);
    },

    update: function (dt) {
        if(this.moveUp){
            this.node.y += this.heroSpeed * dt;
        }else if(this.moveDown){
            this.node.y -= this.heroSpeed * dt;
        }
        if(this.moveLeft){
            this.node.x -= this.heroSpeed * dt;
        }else if(this.moveRight){
            this.node.x += this.heroSpeed * dt;
        }

        if ( this.node.x > this.node.parent.width/2) {
            this.node.x = this.node.x-this.node.parent.width;
        } else if (this.node.x < -this.node.parent.width/2) {
            this.node.x = this.node.parent.width+this.node.x;
        }

        if ( this.node.y > this.node.parent.height/2) {
            this.node.y = this.node.parent.height/2;
        } else if (this.node.y < -this.node.parent.height/2) {
            this.node.y = -this.node.parent.height/2;
        }
    },
    playExpore(){
        //播放爆炸动画
        var anim = this.getComponent(cc.Animation);
        anim.play("heroOnDestory");
        anim.on('finished',  this.onFinished, this);
        this.boomFxNode = cc.instantiate(this.boom_prefab)
        this.node.addChild(this.boomFxNode);
        this.boomFxNode.setPosition(0,0);
    },
    stopHeroAllAction(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.unscheduleAllCallbacks()
    },
    onCollisionEnter: function(other,self){
        if(other.node.group=="enemy"||other.node.group=="enemyBullet"){
            this.node.group = 'default'; //不让动画在执行碰撞
            this.stopHeroAllAction()
            this.playExpore()
        }

        if(other.node.group=="gift"){
            this.giftGetting()
        }
    },
    onFinished: function(event) {
        this.boomFxNode.destroy()
        this.node.destroy()
        setTimeout(()=>{
            cc.director.loadScene('end');
        },1000)
    },
    onDestroy(){
        this.offDrag()
    }
});
