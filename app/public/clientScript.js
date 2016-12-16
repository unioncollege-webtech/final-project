$(document).ready(function() {
  var socket = io.connect();
  console.log("Javascript Ready")
  function update() {
    //Add function for every 5 minutes or so to change trumps to turnips for 3 seconds
    socket.emit('userReqUpdate', {
      playerID: "Wilson Grumpstache"
    });
    requestAnimationFrame(update)
  }
  //Selector for when you click a navbar element
  $("#navbar").on("click", "li", function(e) {
    //Create a target variable for less querying
    $target = $(e.target)
    e.preventDefault();
    //If you are already on the right page, then don't bother
    if ($target.hasClass("active")) {
      return;
    } else {
      //If you aren't, set this as the active page, change screen
      $("#navbar li").removeClass("active")
      $target.toggleClass("active")
      changeScreen(e.target.id);
    }
  });
  function lowerFirst(stringbean) {
    return stringbean.charAt(0).toLowerCase() + stringbean.slice(1)
  }
  //Function for changing the active screen
  function changeScreen(newScreen) {
    $(".status.active").toggleClass("active hidden")
    $(".area.active").toggleClass("active hidden")
    $("#" + lowerFirst(newScreen.substr(3)) + "Status").toggleClass("active hidden")
    $("#" + lowerFirst(newScreen.substr(3))).toggleClass("active hidden")
  }
  //function for buttons
  $(".area").on("click","button",function(e){
    e.preventDefault();
    var clickedButton = lowerFirst(e.target.id.substring(0,e.target.id.length - 6))
    socket.emit('incrementClicked', {
      player: "Wilson Grumpstache",
      name: clickedButton
    })
  })
  $("#deleteSave").on("click","button",function(e){
    e.preventDefault();
    var clickedButton = lowerFirst(e.target.id.substring(0,e.target.id.length - 6))
    socket.emit('incrementClicked', {
      player: "Wilson Grumpstache",
      name: clickedButton
    })
  })
  /**
  $(".status #trumps h4").change(function(e) {
    if e.target.text
  })
  **/
  socket.on('updatePlayer', function(data) {
    //console.log(data)
    $(".status #trumps h4").text(data.trumps + "/" + data.hatchery)
    $("#hatcheryMoneyButton").text("Raise Campaign Funds! (+$" + data.trumps + ")")
    $(".status #dollaBills h4").text(data.money)
    if ($("#amMineButtonHolder").hasClass("hidden") && (data.trumps >= 10) && (data.hatchery >= 10)) {
      $("#amMineButtonHolder").removeClass("hidden")
    }
    $(".status #ore h4").text(data.ore)
    $("#mineOreButton").text("Mine an Ore! (" + data.oreDeposits + " Left)")
    $("#hireImmigrantsButton").text("Hire illegal immigrants! ($10000) (+$" + data.immigrants * 500 + "/s)")
  })

  update();
});
