rowCount = 50

itemTemplate = "<div><h2>Category</h2><h3>Price/Weight</h3></div>"


$(document).ready(function(){
    // jQuery methods go here...
    $("#mainGrid").css("grid-template-rows", "repeat(" + rowCount +", 1fr)");
    // $("mainGrid")
    for (let i = 0; i < rowCount; i++){
        snackItem = "<div>Snack</div>"
        mainItem = "<div>Main</div>"
        drinkItem = "<div>Drink</div>"
        priceWeightItem = "<div>Price/Weight</div>"
        $("#mainGrid").append(snackItem, mainItem, drinkItem, priceWeightItem);
    }
    
    

});