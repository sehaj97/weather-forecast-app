var cityInput = $("#city");
var cityFormEl = $("#city-form");
var searchHistory = $("#history-list");
var searchList = $("<ul>").addClass("list-group history-list-items");
varlistItem="";
inputNewValue = "";
inputOldValue = "";
counter = 0;
var formSubmitHandler = function(event) {
    
    event.preventDefault();
    if(cityInput.val() != ""){
        inputNewValue = cityInput.val();
        listItem = $("<button>").addClass("list-group-item text-white bg-secondary text-center mt-2 forecast-history-" + counter).text(cityInput.val()).val(inputNewValue);
        if($(".history-list-items button") === undefined){
            inputOldValue = "";
        }
        if(inputNewValue != inputOldValue){
            $(".history-list-items").prepend(listItem);
            inputOldValue = $(".history-list-items button")[0].value;
            if($(".history-list-items button").length > 8){
                $(".list-group-item").last().remove();
                counter = 0;
            }
        }
        
        getApiInfo(cityInput.val());
        $('body').on('click', ".forecast-history-" + counter, function() {
            getApiInfo(inputNewValue);
        });
        cityInput.val("");
        counter++;

    } else {
     alert("please provide city!");
    }
};

function getApiInfo(value) {
    console.log(value);
};

searchHistory.html("");
searchHistory.append(searchList);
cityFormEl.unbind('submit').bind('submit',  formSubmitHandler);
