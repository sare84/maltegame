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
                this.levelData.push(new Level(2, 2200, 1, 3, 3, 3, 7, 10, "Level 2 - Schneller")); 
                this.levelData.push(new Level(3, 1700, 1, 3, 3, 3, 10, 10, "Level 3 - Noch Schneller")); 
                this.levelData.push(new Level(4, 2500, 1, 4, 4, 3, 7, 10, "Level 4 - Die Maulwürfe übernehmen den Garten"));     
                this.levelData.push(new Level(5, 2000, 1, 4, 4, 3, 10, 10, "Level 5 - Sie werden immer schneller!"));
                this.levelData.push(new Level(6, 1700, 1, 4, 4, 3, 12, 10, "Level 6 - Und noch schneller!"));      

                this.levelData.push(new Level(7, 2500, 2, 4, 4, 2, 15, 10, "Level 7 - Und es werden immer mehr!"));   
                this.levelData.push(new Level(8, 2200, 2, 4, 4, 2, 15, 10, "Level 8 - Die blöden Viecher werden mehr und schneller!"));   
                this.levelData.push(new Level(9, 1900, 2, 4, 4, 2, 25, 10, "Level 9 - Pass auf das du alle bekommst!"));  

                this.levelData.push(new Level(10, 1900, 2, 4, 4, 1, 25, 10, "Level 10 - Ohje Malte geht die Puste aus! Pass auf das du Ihn nicht triffst!"));  

                this.levelData.push(new Level(11, 2500, 2, 5, 5, 3, 15, 10, "Level 11 -  Jetzt sind sie schon auf der anderen Seite!"));   
                this.levelData.push(new Level(12, 2200, 2, 5, 5, 3, 15, 10, "Level 12 - Sie buddeln unter dem Betonpfad durch!"));   
                this.levelData.push(new Level(13, 1900, 2, 5, 5, 3, 15, 3, "Level 13 - Sie buddeln fast den Baum aus! Lass keinen entwischen!"));   

                this.levelData.push(new Level(14, 2500, 3, 5, 5, 2, 25, 10, "Level 14 - Sie vermehren sich wie die Kaninchen!"));   
                this.levelData.push(new Level(15, 2200, 3, 5, 5, 2, 25, 10, "Level 15 - Jetzt spielen sie fangen und werden schneller!"));   
                this.levelData.push(new Level(16, 1900, 3, 5, 5, 2, 25, 10, "Level 16 - Du solltest dich jetzt langsam beeilen!"));   

                this.levelData.push(new Level(17, 2500, 3, 6, 6, 3, 25, 10, "Level 17 - Jetzt sind sie im Bauerngarten"));   
                this.levelData.push(new Level(18, 2200, 3, 6, 6, 3, 25, 5, "Level 18 - Halte die Maulwürfe davon ab die Kräuter zu fressen!"));   
                this.levelData.push(new Level(19, 1900, 3, 6, 6, 3, 25, 3, "Level 19 - Sie verwüsten den Bauerngarten"));  

                this.levelData.push(new Level(20, 1900, 3, 6, 6, 1, 30, 10, "Level 20 - Dem kleinen Malte geht schon wieder die Puste aus (oder dir?)!"));  
                this.levelData.push(new Level(21, 2500, 3, 6, 6, 3, 100, 10, "Level 21 - Fange 100 Maulwürfe! ")); 
                this.levelData.push(new Level(22, 2500, 3, 6, 6, 3, 250, 10, "Level 22 - Fange 250 Maulwürfe! ")); 
                this.levelData.push(new Level(23, 2500, 3, 6, 6, 3, 500, 10, "Level 23 - Fange 500 Maulwürfe! ")); 
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
