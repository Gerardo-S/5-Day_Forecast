// Building URL
// ================================================================================================
// queryURL is the url we'll use to query the API
function buildQueryURL() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&";
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

// ======================================================================================================

// Make Page Dynamic 
// ======================================================================================================
function updatePage(cityData) {

    var iconUrl =
        "https://openweathermap.org/img/wn/" + cityData.weather[0].icon + "@2x.png";
    console.log(cityData);
    console.log("------------------------------------");
    console.log(iconUrl);


    var cityName = cityData.name;
    console.log(cityName);
    var dateEpochts = cityData.dt * 1000;
    var date = new Date(dateEpochts);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var theDate = "(" + month + "/" + day + "/" + year + ")";
    console.log("-----------CurrentDate-------------")
    console.log(theDate);
    var iconImg = $("#icon1").attr({
        src: iconUrl,
        alt: cityData.weather[0].description,
    });
    // Text to be updated 
    $("h3").text(cityName + " " + theDate);
    $(".temp").text("Temperature: " + cityData.main.temp + "°");
    $(".humidity").text("Humidity: " + cityData.main.humidity + " %");
    $(".wind").text("Wind Speed: " + cityData.wind.speed + " mph");
    $("h3").append(iconImg);


};




// click Handlers
// ======================================================================================================
// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();


    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});

