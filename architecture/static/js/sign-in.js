(function ($) {

  $("#not_member").on('click', function () {
        $("#not_member").addClass("active");
        $("#member").removeClass("active");
        $("#signup").addClass("active");
        $("#log_in").removeClass("active");
  });

    $("#member").on('click', function () {
        $("#member").addClass("active");
        $("#not_member").removeClass("active");
        $("#log_in").addClass("active");
        $("#signup").removeClass("active");
  });

})(jQuery);