!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function maulwurfnController($scope,$interval) {
        $scope.resources = null;
        $scope.playArea = []; 
        $scope.intervalTime = 1000; 
        $scope.playAreaSizeX = 3; 
        $scope.playAreaSizeY = 3; 
        $scope.score  = 0; 
        console.log("maulwurfnControllerScope");

        $interval( function(){ $scope.callAtInterval(); }, $scope.intervalTime);


        function Item(x, y, text) {
            this.x = x;
            this.y = y;
            this.text = text; 
            this.isMaulWurf = false; 
        }


        var init = function(){
            console.log("maulwurfnControllerScope:init");

            $scope.resetPlayGround(); 
            console.log($scope.playArea);
        }

        $scope.resetPlayGround = function() {

            var i, j;
            for ( i = 0; i <  $scope.playAreaSizeX ; i++) {
                $scope.playArea[i] = []; 
                for (j = 0; j <  $scope.playAreaSizeY ; j++) {
                    $scope.playArea[i][j] = new Item(i,j,''); 
                }   
            }
        }
        
        $scope.callAtInterval = function() {
            console.log("$scope.callAtInterval - Interval occurred");
            $scope.resetPlayGround(); 
            var mwX = getRandomInt(1, $scope.playAreaSizeX) - 1
            var mwY = getRandomInt(1, $scope.playAreaSizeY) - 1 
            $scope.playArea[mwX][mwY].text = 'MW'; 
            $scope.playArea[mwX][mwY].isMaulWurf = true; 

        }


        $scope.select = function(item) {
            if (item.isMaulWurf) {
                $scope.score += 1; 
            } else  {
                $scope.score -= 2; 
            }
            console.log(item);
        }

        $scope.setStyling = function(item) {
            if (item.isMaulWurf === true)
                return {"backgroundColor": "#FF0000"};
            else (item.isMaulWurf === false)
                return {"backgroundColor":"#A3A3A3"};
        }

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
