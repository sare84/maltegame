// 
!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function maulwurfnLevelService() {
        var levelData = []; 


        function Level(level, speed, numMoles, sizeX, sizeY, lives, molesToCatch, escapedMoles, text) {
            this.level = level; 
            this.speed = speed; 
            this.numMoles = numMoles; 
            this.sizeX = sizeX; 
            this.sizeY = sizeY;
            this.lives = lives; 
            this.molesToCatch = molesToCatch; 
            this.escapedMoles = escapedMoles; 
            this.text = text;             
        }
        /* 

                "level" : 1, 
        "speed" : 3000, 
        "numMoles" : 1, 
        "sizeX" : 3, 
        "sizeY" : 3, 
        "lives" : 3, 
        "molesToCatch" : 5, 
        "escapedMoles" : 10, 
        "text" : "Level 1 - Start"

*/ 
        this.buildLevelData = function() {
            if (!this.levelData)
            {
                this.levelData = []; 
                this.levelData.push(new Level(1, 3000, 1, 3, 3, 3, 5, 10, "Level 1 - Start")); 
                this.levelData.push(new Level(2, 2000, 1, 3, 3, 2, 5, 10, "Level 2 - Schneller")); 
                this.levelData.push(new Level(3, 1500, 1, 3, 3, 2, 5, 10, "Level 3 - Noch Schneller")); 

                this.levelData.push(new Level(25, 1000, 1, 6, 6, 2, 25, 5, "Level x - Letzter Level ")); 
            }
        }

        var init = function(){

        }

        init();

        this.getAllLevelData = function(){
            this.buildLevelData(); 
            return this.levelData; 
        }

        this.getLevelData = function(levelNumber){
            this.buildLevelData(); 
                

            var i=0, len=this.levelData.length;

            for (; i< len; i++){
                if (this.levelData[i].level === levelNumber){
                    return this.levelData[i];
                }
            }
            return null;        
        }
    }

    app.module.service('maulwurfnLevelService', maulwurfnLevelService);
}();
