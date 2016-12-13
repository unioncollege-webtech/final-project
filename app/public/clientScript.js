$(document).ready(function() {
  console.log("Javascript Ready")
  function update() {
    
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
});
