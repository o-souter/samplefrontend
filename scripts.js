

function toggleDropDown() {
    $("#storeDropDown").toggleClass("hide")
}

spacer = $("<div></div>").attr("class", "item-spacer")


snackCount = 10
mainCount = 45
drinkCount = 60
$(document).ready(function(){
    toggleDropDown()
    //Manage items
    function createItemCard(item) {
        //Create item card from item 
        var card = $('<div class="itemCard"></div>');

        var category = $('<p class="item-category"></p>').text(item.category);
        var image = $('<img>').attr('src', item.image).attr('class', "itemCardImage");
        var name = $('<p class="item-name"></p>').text(item.name);
        var priceWeight = $('<p class="item-price-weight"></p>').text(item.priceWeight);

        card.append(category, image, name, priceWeight);
        return card;
    }





    //Add each snack item
    $("#snackCol").css("grid-template-rows", "repeat(" + snackCount +", 1fr)");
    // $("#snackCol").append(spacer)
    for (let i = 0; i < snackCount; i++){
        snackItem = {
            category: "Snack",
            image: "sampleItem.png",
            name: "Snack item",
            priceWeight: "£1.00, 200g"
        }
        snackCard = createItemCard(snackItem)
        $("#snackCol").append(snackCard)
    }
    $("#mainCol").css("grid-template-rows", "repeat(" + snackCount +", 1fr)");
    for (let i = 0; i < snackCount; i++){
        snackItem = {
            category: "Main",
            image: "sampleItem.png",
            name: "Main item",
            priceWeight: "£1.00, 200g"
        }
        snackCard = createItemCard(snackItem)
        $("#mainCol").append(snackCard)
    }
    $("#drinkCol").css("grid-template-rows", "repeat(" + snackCount +", 1fr)");
    for (let i = 0; i < snackCount; i++){
        snackItem = {
            category: "Drink",
            image: "sampleItem.png",
            name: "Drink item",
            priceWeight: "£1.00, 200g"
        }
        snackCard = createItemCard(snackItem)
        $("#drinkCol").append(snackCard)
    }


    
    

});