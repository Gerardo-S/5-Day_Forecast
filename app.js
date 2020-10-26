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
   
    return queryURL + $.param(queryParams);
}



// Make Page Dynamic Day 1
// ======================================================================================================
function updatePage(cityData) {

    var iconUrl =
        "https://openweathermap.org/img/wn/" + cityData.list[0].weather[0].icon + "@2x.png";
   

    var cityName = cityData.city.name;
    var dateEpochts = cityData.list[0].dt * 1000;
    var date = new Date(dateEpochts);
    var month = date.getMonth() + 1;
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
    
    // // create url for uv index query
    var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?";
    var uvQueryParams = { "appid": "8944df8780ba70b0913552b31d4a5c44" };
    uvQueryParams.lat = lat;
    uvQueryParams.lon = lon;
    var uvQueryUrl = uvQueryUrl + $.param(uvQueryParams);

    // Uv index only for Day 1--------------------------------------------------------------------------------
    $.ajax({
        url: uvQueryUrl,
        method: "GET"
    }).then(function (uvData) {
       
        console.log(uvData);
        console.log($("#UVindex").text());
        // A uv index of 3-5 means moderate risk color yellow
        // A uv index of 0-2 is low risk color green 
        // A uv index of 6-7 is high color orange 
        // A uv index of 8-10 is very high color red 
        
            
        if (uvData.value <= 2) {

            $("#UVindex").text(uvData.value).css("background-color", "green");
        }

        else if (uvData.value >= 3 && uvData.value <= 5) {

            $("#UVindex").text(uvData.value).css("background-color", "yellow").css("color", "black");
        }
        else if (uvData.value >= 6 && uvData.value <= 7) {

            $("#UVindex").text(uvData.value).css("background-color", "orange");
        }
        else if (uvData.value >= 8 && uvData.value <= 10) {

            $("#UVindex").text(uvData.value).css("background-color", "red");
        }

    });

   

    // Day 2 -------------------------------------------------------------------------------------------

    var iconUrl2 =
        "https://openweathermap.org/img/wn/" + cityData.list[1].weather[0].icon + "@2x.png";
    

    var dateEpochts2 = cityData.list[1].dt * 1000;
    var date2 = new Date(dateEpochts2);
    var month2 = date2.getMonth() + 1;
    var day2 = date2.getDate();

    var theDate2 = month2 + "/" + day2 + "/" + year;


    $("#icon2").attr({
        src: iconUrl2,
        alt: cityData.list[1].weather[0].description,
    });
    // Text to be updated 
    $("#2ndDate").text(theDate2);
    $("#temp2").text("Temp: " + cityData.list[1].main.temp + "°");
    $("#humidity2").text("Humidity: " + cityData.list[1].main.humidity + "%");

    // Day 3 ------------------------------------------------------------------------------------------------

    var iconUrl3 =
        "https://openweathermap.org/img/wn/" + cityData.list[2].weather[0].icon + "@2x.png";


    var dateEpochts3 = cityData.list[2].dt * 1000;
    var date3 = new Date(dateEpochts3);
    var month3 = date3.getMonth() + 1;
    var day3 = date3.getDate();

    var theDate3 = month3 + "/" + day3 + "/" + year;


    $("#icon3").attr({
        src: iconUrl3,
        alt: cityData.list[2].weather[0].description,
    });
    // Text to be updated 
    $("#3rdDate").text(theDate3);
    $("#temp3").text("Temp: " + cityData.list[2].main.temp + "°");
    $("#humidity3").text("Humidity: " + cityData.list[2].main.humidity + "%");

    // Day 4----------------------------------------------------------------------------------------------
    var iconUrl4 =
        "https://openweathermap.org/img/wn/" + cityData.list[3].weather[0].icon + "@2x.png";

    var dateEpochts4 = cityData.list[3].dt * 1000;
    var date4 = new Date(dateEpochts4);
    var month4 = date4.getMonth() + 1;
    var day4 = date4.getDate();

    var theDate4 = month4 + "/" + day4 + "/" + year;


    $("#icon4").attr({
        src: iconUrl4,
        alt: cityData.list[3].weather[0].description,
    });
    // Text to be updated 
    $("#4thDate").text(theDate4);
    $("#temp4").text("Temp: " + cityData.list[3].main.temp + "°");
    $("#humidity4").text("Humidity: " + cityData.list[3].main.humidity + "%");
// Day 5-------------------------------------------------------------------------------------------------------

var iconUrl5 =
        "https://openweathermap.org/img/wn/" + cityData.list[4].weather[0].icon + "@2x.png";

    var dateEpochts5 = cityData.list[4].dt * 1000;
    var date5 = new Date(dateEpochts5);
    var month5 = date5.getMonth() + 1;
    var day5 = date5.getDate();

    var theDate5 = month5 + "/" + day5 + "/" + year;


    $("#icon5").attr({
        src: iconUrl5,
        alt: cityData.list[4].weather[0].description,
    });
    // Text to be updated 
    $("#5thDate").text(theDate5);
    $("#temp5").text("Temp: " + cityData.list[4].main.temp + "°");
    $("#humidity5").text("Humidity: " + cityData.list[4].main.humidity + "%");

    
    


};




// click Handlers
// ======================================================================================================
// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {

    event.preventDefault();


    // Update list based on user input
    var userInput = $("#search4City").val();
    var newList = $("<li>").addClass("list-group-item");
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

