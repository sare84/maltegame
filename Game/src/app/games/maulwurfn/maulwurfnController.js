!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
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
            this.text = ''; 
            this.state = itemStates.EMPTY ; 
        }

        // store the interval promise in this variable
        var promise;

        // setting some data 
        $scope.resources = null;
        $scope.playArea = []; 
        $scope.intervalTime = 1000; 
        $scope.playAreaSizeX = 3; 
        $scope.playAreaSizeY = 3; 
        $scope.score  = 0; 
        $scope.live = 3; 
        $scope.gameState = gameStates.NOTSTARTED; 

        var init = function(){
            console.log("maulwurfnControllerScope:init");

            $scope.resetPlayGround(); 
            console.log($scope.playArea);
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
            console.log("$scope.callAtInterval - Interval occurred");
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
            $scope.playArea[mwX][mwY].text = 'MW'; 
            $scope.playArea[mwX][mwY].state = itemStates.MAULWURF; 
        }

        // set the dog to the playground 
        $scope.setMalte = function(){
            var mwX = getRandomInt(1, $scope.playAreaSizeX) - 1
            var mwY = getRandomInt(1, $scope.playAreaSizeY) - 1 
            if ($scope.playArea[mwX][mwY].state === itemStates.MAULWURF){
                $scope.setMalte(); 
                return; 
            }
            $scope.playArea[mwX][mwY].text = 'WUFF'; 
            $scope.playArea[mwX][mwY].state = itemStates.MALTE; 
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


        $scope.select = function(item) {
            if (item.state === itemStates.MAULWURF) {
                $scope.score += 1; 
            } else if (item.state === itemStates.MALTE) {
                
                $scope.score -= 5;
                $scope.live -= 1; 
                $scope.checkGameOver();  
            } else {
                $scope.score -= 1; 
            }
            console.log(item);
        }



        // Styling and mode functions for gui 

        $scope.setStyling = function(item) {
            if (item.state === itemStates.MAULWURF)
                return {"backgroundColor": "#FF0000"};
            else if (item.state === itemStates.MALTE)
                return {"backgroundColor" : "#33cc33"}
            else 
                return {"backgroundColor":"#A3A3A3"};
        }

        $scope.isStarted = function(){
            if ($scope.gameState === gameStates.STARTED )
                return true; 
            else 
                return false; 
        }

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
