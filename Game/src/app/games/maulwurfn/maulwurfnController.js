!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function maulwurfnController($scope ,$interval) {

        var gameStates = {
            NOTSTARTED: 0, 
            STARTED: 1, 
            GAMEOVER: 2 
        }


        $scope.resources = null;
        $scope.playArea = []; 
        $scope.intervalTime = 1000; 
        $scope.playAreaSizeX = 3; 
        $scope.playAreaSizeY = 3; 
        $scope.score  = 0; 
        $scope.live = 3; 
        $scope.gameState = gameStates.NOTSTARTED; 
        
         // store the interval promise in this variable
        var promise;
        console.log("maulwurfnControllerScope");



        var itemStates = {
            EMPTY: 0,
            MAULWURF: 1,
            MALTE: 2
        };



        function Item(x, y) {
            this.x = x;
            this.y = y;
            this.text = ''; 
            this.state = itemStates.EMPTY ; 
        }


        var init = function(){
            console.log("maulwurfnControllerScope:init");

            $scope.resetPlayGround(); 
            console.log($scope.playArea);
        }

        // starts the interval
        // sets some more vars for the game 
        $scope.start = function() {
            // stops any running interval to avoid two intervals running at the same time
            $scope.gameState = gameStates.STARTED; 
            $scope.live = 3; 
            // store the interval promise
            promise =  $interval($scope.callAtInterval, $scope.intervalTime);
        };

        // stops the interval
        $scope.stop = function() {
            $interval.cancel(promise);
            $scope.gameState = gameStates.NOTSTARTED; 
        };

        $scope.resetPlayGround = function() {
            var i, j;
            for ( i = 0; i <  $scope.playAreaSizeX ; i++) {
                $scope.playArea[i] = []; 
                for (j = 0; j <  $scope.playAreaSizeY ; j++) {
                    $scope.playArea[i][j] = new Item(i,j); 
                }   
            }
        }
        
        // Interval magic 
        $scope.callAtInterval = function() {
            console.log("$scope.callAtInterval - Interval occurred");
            $scope.resetPlayGround(); 
            $scope.setMaulwurf(); 
            $scope.setMalte(); 
        }

        $scope.setMaulwurf = function(){
            var mwX = getRandomInt(1, $scope.playAreaSizeX) - 1
            var mwY = getRandomInt(1, $scope.playAreaSizeY) - 1 
            $scope.playArea[mwX][mwY].text = 'MW'; 
            $scope.playArea[mwX][mwY].state = itemStates.MAULWURF; 
        }

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

        $scope.checkGameOver = function() {
            if ($scope.live < 1){
                $scope.gameState = gameStates.GAMEOVER; 
                $scope.stop(); 
            }
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

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Destroy promise / interval on site change 
        $scope.$on('$destroy', function() {
            $interval.cancel(promise);
        });

        init();
    }
    app.module.controller('maulwurfnController', maulwurfnController);
}();
