 app.module.filter('levelselect' , function(maulwurfnGameService){
  return function(array){
      var newArray = []; 
      var stats =  maulwurfnGameService.getStats();
      var maxLevel  = stats.maxLevel; 
        var i=0, len=array.length;

        for (; i< len; i++){
            if (array[i].level <= maxLevel){
                newArray.push(array[i]);
            }
        }

      return newArray; 
  }
})

