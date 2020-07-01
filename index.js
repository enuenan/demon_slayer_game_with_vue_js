new Vue({
    el : '#app',
    data : {
        playerHealth : 100,
        monsterHealth : 100,
        gameIsRunning : false,
        turns : [],
        result : []
    },
    methods : {
        startGame : function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
            this.result = [];
        },
        attack : function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : 'Player hits monster for ' + damage
            });

            if (this.checkWin()) {
                return ;
            }
            this.monsterAttack();
        },
        specialAttack : function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : 'Player hits monster for ' + damage
            });

            if (this.checkWin()) {
                return ;
            }
            this.monsterAttack();
        },
        heal : function () {
            if(this.playerHealth<=90)
            {
                this.playerHealth += 10;
            }
            else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer : true,
                text : 'Player heals for 10'
            });
            this.monsterAttack();
        },
        giveUp : function () {
            this.gameIsRunning = false;
            this.turns = [];
            this.result = [];
        },
        calculateDamage : function (min, max) {
            return  Math.max(Math.floor(Math.random() * max + 1),min);;
        },
        monsterAttack : function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer : false,
                text : 'Monster hits Player for ' + damage
            });
        },
        checkWin : function () {
            if (this.monsterHealth <= 0) {
                if (confirm("You won!!! New Game??")) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                // this.result.unshift({
                //     won : true,
                //     text : "You won!!!"
                // });
                // this.gameIsRunning = false;
                return true;
            }
            else if (this.playerHealth <= 0) {
                if (confirm("You lost!!! New Game??")) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                // this.result.unshift({
                //     won : false,
                //     text : "You lost!!!"
                // });
                // this.gameIsRunning = false;
                return true;
            }
            return false;
        }
    }
});
