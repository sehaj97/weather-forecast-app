var cityInput = $("#city");
var cityFormEl = $("#city-form");
var searchHistory = $("#history-list");
var searchList = $("<ul>").addClass("list-group history-list-items");
varlistItem="";
inputNewValue = "";
inputOldValue = "";
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    if(cityInput.val() != ""){
        inputNewValue = cityInput.val();
        listItem = $("<button>").addClass("list-group-item btn text-white bg-secondary text-center mt-2 forecast-city").text(cityInput.val()).val(inputNewValue);
        if($(".history-list-items button") === undefined){
            inputOldValue = "";
        }
        if(inputNewValue != inputOldValue){
            $(".history-list-items").prepend(listItem);
            inputOldValue = $(".history-list-items button")[0].value;
            if($(".history-list-items button").length > 8){
                $(".list-group-item").last().remove()
            }
            //click to handle new requestr
        } 
    } else {
     alert("please provide city!");
    }
};

searchHistory.html("");
searchHistory.append(searchList);
cityFormEl.unbind('submit').bind('submit',  formSubmitHandler);