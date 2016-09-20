!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $interval
     */
    function maulwurfnController($scope ,$interval) {

        // different game states 
        var gameStates = {
            NOTSTARTED: 0,  // game not started yet 
            STARTED: 1,     // game is started 
            GAMEOVER: 2     // lost the game -> game over 
        }

        // The different states of one item 
        var itemStates = {
            EMPTY: 0,       // no special state 
            MAULWURF: 1,    // you should hit this 
            MALTE: 2        // the mighty dog ;) 
        };

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
        $scope.resources = null;
        $scope.playArea = []; 
        $scope.intervalTime = 2500; 
        $scope.playAreaSizeX = 3; 
        $scope.playAreaSizeY = 3; 
        $scope.score  = 0; 
        $scope.live = 3; 
        $scope.gameState = gameStates.NOTSTARTED; 

        var init = function(){
            $scope.resetPlayGround(); 
        }

        // ************************************************************************ 
        // interval mechanics  
        // ************************************************************************        

        // starts the interval
        // sets some more vars for the game 
        $scope.start = function() {
            // stops any running interval to avoid two intervals running at the same time
            $scope.gameState = gameStates.STARTED; 
            $scope.score = 0; 
            $scope.live = 3; 
            // store the interval promise
            promise =  $interval($scope.callAtInterval, $scope.intervalTime);
        };

        // stops the interval
        $scope.stop = function() {
            $interval.cancel(promise);
            $scope.gameState = gameStates.NOTSTARTED; 
        };
        
        // Interval magic 
        $scope.callAtInterval = function() {
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

        // reset the playground 
        $scope.resetPlayGround = function() {
            var i, j;
            for ( i = 0; i <  $scope.playAreaSizeX ; i++) {
                $scope.playArea[i] = []; 
                for (j = 0; j <  $scope.playAreaSizeY ; j++) {
                    $scope.playArea[i][j] = new Item(i,j); 
                }   
            }
        }

        // setting the maulwurf to the playground 
        $scope.setMaulwurf = function(){
            var mwX = getRandomInt(1, $scope.playAreaSizeX) - 1
            var mwY = getRandomInt(1, $scope.playAreaSizeY) - 1 
            $scope.playArea[mwX][mwY].state = itemStates.MAULWURF; 
            $scope.playArea[mwX][mwY].styling = $scope.setStyling($scope.playArea[mwX][mwY].state); 
        }

        // set the dog to the playground 
        $scope.setMalte = function(){
            var mwX = getRandomInt(1, $scope.playAreaSizeX) - 1
            var mwY = getRandomInt(1, $scope.playAreaSizeY) - 1 
            if ($scope.playArea[mwX][mwY].state === itemStates.MAULWURF){
                $scope.setMalte(); 
                return; 
            }
            $scope.playArea[mwX][mwY].state = itemStates.MALTE; 
            $scope.playArea[mwX][mwY].styling = $scope.setStyling($scope.playArea[mwX][mwY].state); 
        }

        // check gameover state 
        $scope.checkGameOver = function() {
            if ($scope.live < 1){
                $scope.stop(); 
                $scope.gameState = gameStates.GAMEOVER;                 
            }
        }

        // ************************************************************************ 
        // Gui Functions 
        // ************************************************************************

        // item is selected -> game mechanic 
        $scope.select = function(item) {
            if (item.state === itemStates.MAULWURF) {
                item.state = itemStates.EMPTY; 
                item.styling = $scope.setStyling(itemStates.EMPTY); 
                $scope.score += 1; 
            } else if (item.state === itemStates.MALTE) {                
                $scope.score -= 5;
                $scope.live -= 1; 
                $scope.checkGameOver();  
            } else {
                $scope.score -= 1; 
            }
        }

        // Styling and mode functions for gui 
        $scope.setStyling = function(state) {
            if (state === itemStates.MAULWURF){
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

        // checks if the game ist game over 
        $scope.isGameOver = function(){
            if ($scope.gameState === gameStates.GAMEOVER )
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
