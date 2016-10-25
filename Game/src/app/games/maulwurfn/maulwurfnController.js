!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $interval
     */
    function maulwurfnController($scope ,$interval, clickService, maulwurfnGameService, maulwurfnLevelService) {

        // different game states 
        var gameStates = {
            NOTSTARTED: 0,  // game not started yet 
            STARTED: 1,     // game is started 
            GAMEOVER: 2,    // lost the game -> game over 
            WIN: 3          // WIN the game 
        }

        // The different states of one item 
        var itemStates = {
            EMPTY: 0,       // no special state 
            MOLE: 1,    // you should hit this 
            MALTE: 2        // the mighty dog ;) 
        };

        var MALTEPOINTS = -10; 
        var LAWNPOINTS = -5; 
        var MOLEPOINTS = 10; 

        // playground item 
        function Item(x, y) {
            this.x = x;
            this.y = y;
            this.state = itemStates.EMPTY ; 
            this.fieldBackground = $scope.setFieldBackground(); 
            this.styling = $scope.setStyling( itemStates.EMPTY); 
            
        }

        // store the interval promise in this variable
        var promise;

        // setting some data 
        $scope.playArea = []; 
        $scope.score  = 0; 
        // Mole Stats! 
        $scope.escapedMoles = 0;  
        $scope.catchedMoles = 0; 
        $scope.gameState = gameStates.NOTSTARTED; 

        $scope.testChange = function(){
            $scope.resetPlayGround(true); 
        }

        var init = function(){
            $scope.levelData = maulwurfnLevelService.getAllLevelData(); 
            $scope.level = $scope.levelData[0];    

            $scope.resetPlayGround(true); 
            $scope.clickService = clickService; 
        }

        // ************************************************************************ 
        // interval mechanics  
        // ************************************************************************        

        // starts the interval
        // sets some more vars for the game 
        $scope.start = function() {
            // stops any running interval to avoid two intervals running at the same time
            $scope.gameState = gameStates.STARTED; 
            maulwurfnGameService.addGamesPlayed(); 
            $scope.resetGameStats(); 
            // store the interval promise
            promise =  $interval($scope.callAtInterval, $scope.level.speed);
        };

        // stops the interval
        $scope.stop = function() {
            $scope.resetGameStats(); 
            $interval.cancel(promise);
            if ($scope.gameState === gameStates.GAMEOVER){
                $scope.gameState = gameStates.GAMEOVER; 
            } else {
                $scope.gameState = gameStates.NOTSTARTED; 
            }
        };

        // Reset some gamestats 
        $scope.resetGameStats = function() {
            
            $scope.score = 0; 
            $scope.escapedMoles = 0; 
            $scope.catchedMoles = 0; 
        }
        
        // Interval magic 
        $scope.callAtInterval = function() {
            $scope.checkEscapedMoles(); 
            $scope.checkWin(); 
            $scope.checkGameOver(); 
            $scope.resetPlayGround(); 
            $scope.setMaulwurf(); 
            $scope.setMalte(); 
        }

        // Destroy promise / interval on site change 
        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });

        // ************************************************************************ 
        // logical game mechanics  
        // ************************************************************************

        $scope.checkEscapedMoles = function() {
            var i, j;
            if (typeof $scope.playArea === 'undefined'){
                return; 
            }
            for ( i = 0; i <  $scope.level.sizeX ; i++) {                
                for (j = 0; j <  $scope.level.sizeY ; j++) {
                    if ($scope.playArea[i][j].state === itemStates.MOLE) {
                        $scope.escapedMoles +=1;  
                        maulwurfnGameService.addEscapedMoles(1); 
                    } 
                }   
            }            
        }

        // reset the playground 
        $scope.resetPlayGround = function() {
            var i, j;
            $scope.playArea = []; 
            for ( i = 0; i <  $scope.level.sizeX ; i++) {
                $scope.playArea[i] = []; 
                for (j = 0; j <  $scope.level.sizeY ; j++) {
                    $scope.playArea[i][j] = new Item(i,j); 
                }   
            }
        }

        // setting the maulwurf to the playground 
        $scope.setMaulwurf = function(){
            var mwX = getRandomInt(1, $scope.level.sizeX) - 1
            var mwY = getRandomInt(1, $scope.level.sizeY) - 1 
            $scope.playArea[mwX][mwY].state = itemStates.MOLE; 
            $scope.playArea[mwX][mwY].styling = $scope.setStyling($scope.playArea[mwX][mwY].state); 
        }

        // set the dog to the playground 
        $scope.setMalte = function(){
            var mwX = getRandomInt(1, $scope.level.sizeX) - 1
            var mwY = getRandomInt(1, $scope.level.sizeY) - 1 
            if ($scope.playArea[mwX][mwY].state === itemStates.MOLE){
                $scope.setMalte(); 
                return; 
            }
            $scope.playArea[mwX][mwY].state = itemStates.MALTE; 
            $scope.playArea[mwX][mwY].styling = $scope.setStyling($scope.playArea[mwX][mwY].state); 
        }

        // check gameover state 
        $scope.checkGameOver = function() {
            if ($scope.level.lives < 1){
                $scope.gameState = gameStates.GAMEOVER;                 
            }
            if ($scope.escapedMoles >= $scope.level.escapedMoles){
                $scope.gameState = gameStates.GAMEOVER;    
            }
            if ($scope.gameState === gameStates.GAMEOVER){
                $scope.stop(); 
                maulwurfnGameService.addGamesLost(); 
                maulwurfnGameService.setHighScore($scope.score); 
            }
        }

        // check win state 
        $scope.checkWin = function() {
            if ($scope.catchedMoles >= $scope.level.molesToCatch){
                maulwurfnGameService.addGamesWon(); 
                maulwurfnGameService.setHighScore($scope.score); 
                maulwurfnGameService.setMaxLevel($scope.level.level+1);
                $scope.stop(); 
                $scope.gameState = gameStates.WIN;                 
            }
        }

        // ************************************************************************ 
        // Gui Functions 
        // ************************************************************************

        // sets the points 
        $scope.setPoints = function(points){
            $scope.score += points;     
            maulwurfnGameService.addAllPoints(points); 
        }

        // item is selected -> game mechanic 
        $scope.select = function(item) {
            if (item.state === itemStates.MOLE) {
                $scope.setPoints(MOLEPOINTS);  
                item.state = itemStates.EMPTY; 
                item.styling = $scope.setStyling(itemStates.EMPTY); 
                $scope.catchedMoles += 1;
                $scope.clickService.moleClicked(); 
            } else if (item.state === itemStates.MALTE) {                
                $scope.setPoints(MALTEPOINTS); 
                $scope.level.lives -= 1; 
                $scope.clickService.malteClicked(); 
                $scope.checkGameOver();  
            } else {
                $scope.setPoints(LAWNPOINTS); 
                $scope.clickService.lawnClicked(); 
               
            }
        }

        // Styling and mode functions for gui 
        $scope.setStyling = function(state) {
            if (state === itemStates.MOLE){
                var rnd = getRandomInt(1,2); 
                return "circle maulwurfField" + rnd;
            }  
            else if (state === itemStates.MALTE)
                return "circle malteField";
            else 
                return "circle emptyField";
        }

        // sets the field background 
        // function used to alternate the pics 
        $scope.setFieldBackground = function() {
            var rnd = getRandomInt(0,5); 
            return "square" + rnd; 
        }

        // checks if game is started 
        $scope.isStarted = function(){
            if ($scope.gameState === gameStates.STARTED )
                return true; 
            else 
                return false; 
        }

        $scope.isNotStarted = function(){
            if ($scope.gameState === gameStates.NOTSTARTED )
                return true; 
            else 
                return false; 
        }

        // checks if the game ist game over 
        $scope.isGameOver = function(){
            if ($scope.gameState === gameStates.GAMEOVER )
                return true; 
            else 
                return false; 
        }

        // checks if the game ist game over 
        $scope.isWon = function(){
            if ($scope.gameState === gameStates.WIN )
                return true; 
            else 
                return false; 
        }

        // ************************************************************************ 
        // helper functions 
        // ************************************************************************

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        init();
    }
    app.module.controller('maulwurfnController', maulwurfnController);
}();
