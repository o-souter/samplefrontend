function hideDropDowns() {
    $("#storeDropDown").addClass("hide")
    $("#sortDropDown").addClass("hide")
}

function toggleDropDown() {
    hideDropDowns()
    $("#storeDropDown").toggleClass("hide")
}

function toggleSortDropDown() {
    hideDropDowns()
    $("#sortDropDown").toggleClass("hide")
}

// Handle closing menus when clicked off
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        console.log("test")
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('hide')) {
                openDropdown.classList.add('hide');
            }
        }
    }
}

function getRandomDetails() {
    details = new Array(2)
    details[0] = "£" + Math.round(Math.random() * 300)/100
    details[1] = Math.round(Math.random()*300) + "g"
    return details
}

function createItemCard(item, itemClass) {
    //Create item card from item 
    var container = $('<div class="itemCardContainer">')
    var card = $('<div class="itemCard ' + itemClass + '"></div>');
    // console.log(item)
    var category = $('<p class="item-category"></p>').text(item.category);
    
    var image = $('<img>').attr('src', item.image).attr('class', "itemCardImage");
    var name = $('<p class="item-name"></p>').text(item.name);
    var price = $('<p class="item-price"></p>').text(item.price);
    var weight = $('<p class="item-weight"></p>').text(item.weight)

    card.append(category, image, name, price, weight);
    container.append(card)
    return container;
}

snackCount = 10
mainCount = 45
drinkCount = 60
var snackArray;
var mainArray;
var drinkArray;


function createItems() {//Populate the main arrays with items
    snackArray = new Array(snackCount)
    mainArray = new Array(mainCount)
    drinkArray = new Array(drinkCount)
    for (i = 0; i < snackCount; i++) {
        snackItem = {
            category: "Snack",
            image: "sampleItem.png",
            name: "Snack item",
            price: getRandomDetails()[0],
            weight: getRandomDetails()[1]
        }
        // console.log(snackItem)
        snackArray.push(snackItem)
        
    }
    // console.log(snackArray)
    for (i = 0; i < mainCount; i++) {
        mainItem = {
            category: "Main",
            image: "sampleItem.png",
            name: "Main item",
            price: getRandomDetails()[0],
            weight: getRandomDetails()[1]
        }
        mainArray.push(mainItem)
    }
    for (i = 0; i < drinkCount; i++) {
        drinkItem = {
            category: "Drink",
            image: "sampleItem.png",
            name: "Drink item",
            price: getRandomDetails()[0],
            weight: getRandomDetails()[1]
        }
        drinkArray.push(drinkItem)
    }
}

function sortItems(sortType, items) {

    
    itemStr = ""
    for (item in items) {
        itemStr.concat(item.price + ", ")
    }
    console.log("Sorting by " + sortType)
    console.log("Sorting: " + itemStr)
    if (sortType == "price") {
        items = items.sort((a, b) => b.price - a.price)
    }
    else if (sortType == "weight") {
        items = items.sort((a, b) => b.weight - a.weight)
    }
    else if (sortType == "protein") {
        items = items //Not implemented yet!
    }

    itemStr = ""
    for (item in items) {
        itemStr.concat(item.price + ", ")
    }
    console.log("Sorted to: " + itemStr)
    return items
}

var mealDealPrice = 3.5

$(document).ready(function(){
    hideDropDowns()
    //Manage items
    createItems()

    drinkArray = sortItems("price", drinkArray)
    mainArray = sortItems("price", mainArray)
    snackArray = sortItems("price", snackArray)
    
    function populateData(data) {
        //Add each snack item
        $("#snackCol").css("grid-template-rows", "repeat(" + snackCount +", 1fr)");
        for (let i = 0; i < snackCount; i++){
            console.log(snackArray)
            snackCard = createItemCard(snackArray[i], "snackCard")
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

        drinkPadder = $('<div class="padder" id="drinkPadder">No more items!</div>')
        $("#drinkCol").append(drinkPadder)

        snackPadder = $('<div class="padder" id="snackPadder">No more items!</div>')
        $("#snackCol").append(snackPadder)

        mainPadder = $('<div class="padder" id="mainPadder">No more items!</div>')
        $("#mainCol").append(mainPadder)
    }
    populateData()
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


    function getDetailsAndUpdate(){//Get the current selected items and update the details pane
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
        totalSaved = (totalPrice - mealDealPrice).toFixed(2)
        totalSavedSign = Math.sign(totalSaved).toString().replace("1", "")
        totalSaved = Math.abs(totalSaved)
        $("#total-price").text("Total Price: £" + totalPrice)
        $("#total-weight").text("Total Weight: " + totalWeight + "g")
        $("#total-paid").text("Total Paid £" + mealDealPrice.toFixed(2))
        if (totalSavedSign == "-"){
            $("#total-saved").text("Total Saved (Lost): " + totalSavedSign + "£" + totalSaved)
        }
        else {
            $("#total-saved").text("Total Saved: " + totalSavedSign + "£" + totalSaved)
        }

        
        $(".snackCard").removeClass("selectedItem")
        $(".snackCard.visibleItem").first().addClass("selectedItem")

        $(".mainCard").removeClass("selectedItem")
        $(".mainCard.visibleItem").first().addClass("selectedItem")

        $(".drinkCard").removeClass("selectedItem")
        $(".drinkCard.visibleItem").first().addClass("selectedItem")
        

    }

    setInterval(getDetailsAndUpdate, 1000) //Schedule to happen every second





    



})

    

   
    
    

    
    

