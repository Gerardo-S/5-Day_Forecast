// Building URL
// ================================================================================================
// queryURL is the url we'll use to query the API
function buildQueryURL() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?&cnt=5&units=imperial&";
    // q={city name}&appid={API key}"


    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "appid": "8944df8780ba70b0913552b31d4a5c44" };

    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $("#search4City")
        .val()
        .toLowerCase()
        .trim();
    console.log()

    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log($.param(queryParams));
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
}



// Make Page Dynamic Day 1
// ======================================================================================================
function updatePage(cityData) {

    var iconUrl =
        "https://openweathermap.org/img/wn/" + cityData.list[0].weather[0].icon + "@2x.png";
    console.log(cityData);
    console.log("------------------------------------");
    console.log(iconUrl);


    var cityName = cityData.city.name;
    console.log(cityName);
    var dateEpochts = cityData.list[0].dt * 1000;
    var date = new Date(dateEpochts);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var theDate = "(" + month + "/" + day + "/" + year + ")";
    
    
    var iconImg = $("#icon1").attr({
        src: iconUrl,
        alt: cityData.list[0].weather[0].description,
    });
    // Text to be updated 
    $("h3").text(cityName + " " + theDate);
    $(".temp").text("Temperature " + cityData.list[0].main.temp + "°");
    $(".humidity").text("Humidity: " + cityData.list[0].main.humidity + "%");
    $(".wind").text("Wind Speed: " + cityData.list[0].wind.speed + " mph");
    $("h3").append(iconImg);

    var lat = cityData.city.coord.lat;
    var lon = cityData.city.coord.lon;
    console.log(lat);
    // // create url for uv index query
    var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?";
    var uvQueryParams = { "appid": "8944df8780ba70b0913552b31d4a5c44" };
    uvQueryParams.lat = lat;
    uvQueryParams.lon = lon;
    var uvQueryUrl = uvQueryUrl  + $.param(uvQueryParams);
    console.log(uvQueryUrl);

    $.ajax({
        url: uvQueryUrl,
        method: "GET"
    }).then(function (uvData) {
        console.log(uvData);
        console.log(uvData.value);
        // A uv index of 3-5 means moderate risk color yellow
        // A uv index of 0-2 is low risk color green 
        // A uv index of 6-7 is high color orange 
        // A uv index of 8-10 is very high color red 
        var indexDiv = $("<div>");
        if (uvData.value <= 2){

            $("#UVindex").text(uvData.value).css("background-color", "green");
        }

        else if (uvData.value >=3 && uvData.value <=5){

            $("#UVindex").text(uvData.value ).css("background-color", "yellow");
        }
        else if (uvData.value >=6 && uvData.value <=7){

            $("#UVindex").text( uvData.value ).css("background-color", "orange");
        }
        else if (uvData.value >=8 && uvData.value <=10){

            $("#UVindex").text(uvData.value ).css("background-color", "red");
        }
       
    });

    
};




// click Handlers
// ======================================================================================================
// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
    
    event.preventDefault();
    // Update list based on user input
    var userInput= $("#search4City").val();
    var newList=$("<li>").addClass("list-group-item");
    $("#searchHistory").prepend(newList);
    newList.text(userInput);
    
    // Update page when user hits the search button;
   $("#weather").css("visibility", "visible");

   
    // Build the query URL for the ajax request to the NYT API

    var queryURL = buildQueryURL();
    

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);

});

