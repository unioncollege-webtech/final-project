$(document).ready(function() {
  console.log("Javascript Ready")
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
  //Function for changing the active screen
  function changeScreen(newScreen) {
    $(".status.active").toggleClass("active hidden")
    $(".area.active").toggleClass("active hidden")
    console.log($("#" + newScreen.substr(3).toLowerCase() + "Status"))
    $("#" + newScreen.substring(3).toLowerCase() + "Status").toggleClass("active hidden")
    $("#" + newScreen.substring(3).toLowerCase()).toggleClass("active hidden")
  }
});
