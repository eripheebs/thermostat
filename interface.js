$ ( document ).ready(function () {
  var thermostat = new Thermostat()

  $('#city-name').text("the laboratory");

  $('#current-temperature').text("25");

  // $ ("html").mouseenter(function () {
  //   $(this).css("cursor", "url(http://orig14.deviantart.net/1586/f/2011/191/2/1/bda__kitty_cat_icon_by_sabakugaara-d3lnz58.gif), auto");
  // });

  $ ( "#temperature" ).text(thermostat.temperature);

  $ ( "#temperature" ).attr("class",thermostat.energyUsage());

  $ ( "#psm" ).text("On");

  $ ( "#increase" ).click(function () {
    thermostat.increase();
    updateTemperature();
    // $ ("img").attr("src", "https://media.giphy.com/media/ffWXNxlfEcrHG/giphy.gif");
  });

  $ ( "#decrease" ).click(function () {
    thermostat.decrease();
    updateTemperature();
    // $ ("img").attr("src", "https://s-media-cache-ak0.pinimg.com/736x/4b/1f/89/4b1f8997747f120e3de8b0f076d6719f.jpg");
  });

  $ ( "#reset" ).click(function () {
    thermostat.resetTemp();
    updateTemperature();
  });

  $ ( "#psm-on" ).click(function () {
    thermostat.powerSavingOn();
    $ ( "#psm" ).text("On");
  });

  $ ( "#psm-off" ).click(function () {
    thermostat.powerSavingOff();
    $ ( "#psm" ).text("Off");
  });

  updateTemperature = function() {
    $ ( "#temperature" ).text(thermostat.temperature);
    $ ( "#temperature" ).attr("class", thermostat.energyUsage());
  };

  $( '#select-city' ).submit(function(event) {
    event.preventDefault();
    var city = $('#current-city').val();
    $( "#city-name" ).text(city);
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3a6bc93def461093f7bebf5f7e4cc1bf&units=metric', function(data) {
          $ ( '#current-temperature' ).text(data.main.temp);
      });
  });

  $(window).load(function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:4567/temperature",
    }).then(function(data) {
      console.log(data);
      thermostat.temperature = parseInt(data);
      $ ( "#temperature" ).attr("class", thermostat.energyUsage());
      $ ( "#temperature" ).text(parseInt(data));
    });
  });

  $(window).unload(function () {
    var currentTemp = thermostat.temperature;
    $.ajax({
      type: "POST",
      url: "http://localhost:4567/temperature",
      async: false,
      data: { "temperature": currentTemp.toString() }
    });
  });
});
