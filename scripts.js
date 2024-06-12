function toggleDropDown() {
    $("#storeDropDown").toggleClass("hide")
}

function getRandomDetails() {
    details = new Array(2)
    details[0] = "£" + Math.round(Math.random() * 300)/100
    details[1] = Math.round(Math.random()*300) + "g"
    return details
}
spacer = $("<div></div>").attr("class", "item-spacer")


snackCount = 10
mainCount = 45
drinkCount = 60

$(document).ready(function(){
    toggleDropDown()
    //Manage items
    function createItemCard(item, itemClass) {
        //Create item card from item 
        var card = $('<div class="itemCard ' + itemClass + '"></div>');

        var category = $('<p class="item-category"></p>').text(item.category);
        var image = $('<img>').attr('src', item.image).attr('class', "itemCardImage");
        var name = $('<p class="item-name"></p>').text(item.name);
        var price = $('<p class="item-price"></p>').text(item.price);
        var weight = $('<p class="item-weight"></p>').text(item.weight)

        card.append(category, image, name, price, weight);
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
            price: getRandomDetails()[0],
            weight: getRandomDetails()[1]
        }
        snackCard = createItemCard(snackItem, "snackCard")
        $("#snackCol").append(snackCard)
    }
    //Add each Main item
    $("#mainCol").css("grid-template-rows", "repeat(" + snackCount +", 1fr)");
    for (let i = 0; i < snackCount; i++){
        snackItem = {
            category: "Main",
            image: "sampleItem.png",
            name: "Main item",
            price: getRandomDetails()[0],
            weight: getRandomDetails()[1]
        }
        snackCard = createItemCard(snackItem, "mainCard")
        $("#mainCol").append(snackCard)
    }
    //Add each Drink item
    $("#drinkCol").css("grid-template-rows", "repeat(" + snackCount +", 1fr)");
    for (let i = 0; i < snackCount; i++){
        snackItem = {
            category: "Drink",
            image: "sampleItem.png",
            name: "Drink item",
            price: getRandomDetails()[0],
            weight: getRandomDetails()[1]
        }
        snackCard = createItemCard(snackItem, "drinkCard")
        $("#drinkCol").append(snackCard)
    }


    //Add visibleItem class to items that are visible
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is visible
            entry.target.classList.add('visibleItem');
          } else {
            // Element is not visible
            entry.target.classList.remove('visibleItem');
          }
        });
    }
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust as needed
    };

    document.querySelectorAll('.itemColumn').forEach(section => {
        const observer = new IntersectionObserver(handleIntersection, options);
        section.querySelectorAll('.itemCard').forEach(item => {
          observer.observe(item);
        });
    });


    function getDetailsAndUpdate(){
        // snacks = $("#snackCol")
        // console.log("Getting snacks visible...")

        snacksVisible = $(".snackCard.visibleItem")
        mainsVisible = $(".mainCard.visibleItem")
        drinksVisible = $(".drinkCard.visibleItem")
        // console.log(snacksVisible)
        snackSelected = snacksVisible.first()[0].outerText.split("\n")
        mainSelected = mainsVisible.first()[0].outerText.split("\n")
        drinkSelected = drinksVisible.first()[0].outerText.split("\n")
        
        //Get the details as floats
        snackPrice = parseFloat(snackSelected[4].replace("£", ""))
        snackWeight = parseFloat(snackSelected[6].replace("g", ""))

        mainPrice = parseFloat(mainSelected[4].replace("£", ""))
        mainWeight = parseFloat(mainSelected[6].replace("g", ""))

        drinkPrice = parseFloat(drinkSelected[4].replace("£", ""))
        drinkWeight = parseFloat(drinkSelected[6].replace("g", ""))

        totalPrice = (snackPrice + mainPrice + drinkPrice).toFixed(2)
        totalWeight = (snackWeight + mainWeight + drinkWeight)
        $("#total-price").text(totalPrice)
        $("#total-weight").text(totalWeight)

    }

    setInterval(getDetailsAndUpdate, 500)




    



})

    

   
    
    

    
    

