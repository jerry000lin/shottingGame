
cc.Class({
    extends: cc.Component,

    properties: {
        heroSpeed:0
    },

    onLoad () {
        cc.director.getCollisionManager().enabled=true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
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

    onCollisionEnter: function(other,self){
        if(other.node.group=="enemy"||other.node.group=="enemyBulletee"){
            cc.game.pause();
        }
    },
});
