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
        maxEnemyNumber:0
    },

    onLoad () {
        this.enemyCount = 0
        this.enemyNumber = 1

        this.makeNewEnemy()

    },
    enemyDestory(){
        this.enemyCount--
        if(this.enemyNumber<this.maxEnemyNumber){
            this.enemyNumber++
        }
        for(let i=this.enemyCount;i<this.enemyNumber;i++){
            this.makeNewEnemy()
        }
    },
    makeNewEnemy(){
        var newEnemy = cc.instantiate(this.enemyPrefab[0])
        this.node.addChild(newEnemy)
        var enemyPosition = this.getNewEnemyPositon(newEnemy)
        newEnemy.setPosition(enemyPosition)

        this.enemyCount++
    },

    //敌机随机生成的位置
    getNewEnemyPositon: function(newEnemyNode) {
        //位于上方，先不可见
        var randx = (Math.random() - 0.5) * (this.node.width-newEnemyNode.width);
        var randy = this.node.height/2+newEnemyNode.height/2;
        return cc.v2(randx,randy);
    },
});
