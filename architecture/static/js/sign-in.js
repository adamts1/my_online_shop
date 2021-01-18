(function ($) {

  $("#not_member").on('click', function () {
        $("#not_member").addClass("active");
        $("#member").removeClass("active");
  });

    $("#member").on('click', function () {
        $("#member").addClass("active");
        $("#not_member").removeClass("active");
  });

})(jQuery);