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
        maxMosterNumber:0,
        maxUfoNumber:{
            default:1
        },
        ufoMakingTime:0,
        main:cc.Node
    },

    onLoad () {
        this.enemyCount = 0
        this.enemyNumber = 1

        this.ufoCount = 0
        this.ufoDestoryCount = 0

        this.makeNewEnemy()
        this.schedule(this.makeUFO, this.ufoMakingTime);
    },    
    makeNewEnemy(){
        if(this.ufoCount>0){
            return
        }
        var newEnemy = cc.instantiate(this.enemyPrefab[0])
        var enemyPosition = this.getNewEnemyPositon(newEnemy)
        newEnemy.setPosition(enemyPosition)
        this.node.addChild(newEnemy)

        this.enemyCount++
    },

    makeUFO(){
        if(this.ufoCount>=this.maxUfoNumber){
            return
        }
        var newEnemy = cc.instantiate(this.enemyPrefab[1])

        newEnemy.getComponent("enemy").init(this.ufoDestoryCount)

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
    mosterDestory(){
        this.main.getComponent("main").gainScore(100)
        this.enemyCount--
        if(this.enemyNumber<this.maxMosterNumber+this.ufoDestoryCount){
            this.enemyNumber++
        }
        console.log("enemyNumber",this.enemyNumber)
        for(let i=this.enemyCount;i<this.enemyNumber;i++){
            this.makeNewEnemy()
        }
    },
    ufoDestory(){
        this.main.getComponent("main").gainScore(200)
        this.maxMosterNumber
        this.ufoCount--
        this.ufoDestoryCount++
        this.makeNewEnemy()
    }
});
