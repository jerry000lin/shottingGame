cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab:{
            default:[],
            type:cc.Prefab
        },
        freqTime:0,
        enemyBulletGroup:{
            default:null,
            type:cc.Node
        },
        maxEnemyNumber:0,
        ufoMakingTime:0,
        main:cc.Node
    },

    onLoad () {
        this.enemyCount = 0
        this.enemyNumber = 1

        this.ufoCount = 0

        this.makeNewEnemy()
        this.schedule(this.makeUFO, this.ufoMakingTime);
    },    
    makeNewEnemy(){
        var newEnemy = cc.instantiate(this.enemyPrefab[0])
        var enemyPosition = this.getNewEnemyPositon(newEnemy)
        newEnemy.setPosition(enemyPosition)
        this.node.addChild(newEnemy)

        this.enemyCount++
    },

    makeUFO(){
        var newEnemy = cc.instantiate(this.enemyPrefab[1])
        var enemyPosition = cc.v2(0,(this.node.height+newEnemy.height)/2);
        newEnemy.setPosition(enemyPosition)
        this.node.addChild(newEnemy)

        this.ufoCount++
    },

    //敌机随机生成的位置
    getNewEnemyPositon: function(newEnemyNode) {
        //位于上方，先不可见
        var randx = (Math.random() - 0.5) * (this.node.width-newEnemyNode.width);
        var y = (this.node.height+newEnemyNode.height)/2;
        return cc.v2(randx,y);
    },
    enemyDestory(){
        this.main.getComponent("main").gainScore(100)
        this.enemyCount--
        if(this.enemyNumber<this.maxEnemyNumber){
            this.enemyNumber++
        }
        for(let i=this.enemyCount;i<this.enemyNumber;i++){
            this.makeNewEnemy()
        }
    },
    ufoDestory(){
        this.main.getComponent("main").gainScore(200)
        this.maxEnemyNumber++
    }
});
