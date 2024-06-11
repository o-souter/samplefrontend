snackCount = 30
mainCount = 45
drinkCount = 60
// priceCount = Math.max([snackCount, mainCount, drinkCount]) //


itemTemplate = "<div><h5>Category</h5>Image<h5>Name</h5><h6>Price/Weight</h6></div>"
imgTemplate = $("<img>")
imgTemplate.attr("src", "sampleItem.png")

$(document).ready(function(){
    // jQuery methods go here...

    function createItemCard(item) {
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
    
    

});