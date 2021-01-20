(function ($) {

  $.validator.addMethod("maxDate", function(value, element) {
    var curDate = new Date();
    var inputDate = new Date(value);
    if (inputDate >= curDate)
      return true;
    return false;
  }, "Invalid Date!");

  $("form[name='checkout_form']").validate({
    // Specify form_validation rules
    rules: {
      first_name: "required",
      sure_name: "required",
      phone:{ required: true,
        number: true },
      address: "required",
      city: "required",
      s_first_name: "required",
      s_sure_name: "required",
      s_address: "required",
      s_phone: "required",
      s_city: "required",
      s_day:{
        required: true,
        date: true,
        maxDate: true
      },
      s_hour: "required",
      t_day: {
        required: true,
        date: true,
        maxDate: true
      },
      t_hour: "required",
      policy_confermation: "required",
    },
    // Specify form_validation error messages
    messages: {
      first_name: "שדה חובה",
      sure_name: "שדה חובה",
      phone: {
        required:  "שדה חובה",
        number: "מספרים בלבד"
      },
      address: "שדה חובה",
      city: "שדה חובה",
      s_sure_name: "שדה חובה",
      s_first_name: "שדה חובה",
      s_sure_name: "שדה חובה",
      s_address: "שדה חובה",
      s_phone: "שדה חובה",
      s_city: "שדה חובה",
      s_day:{
        required: "שדה חובה",
        date: "תאריך בלבד",
        maxDate: "תאריך עתידי"
      },
      s_hour: "שדה חובה",
      t_day:{
        required: "שדה חובה",
        date: "תאריך בלבד",
        maxDate: "תאריך עתידי"
      },
      t_hour: "שדה חובה",
      policy_confermation: "נא אשר מדיניות האתר",
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });

  $("form[name='signup_form']").validate({
    // Specify form_validation rules
    rules: {
      email_signup: "required",
      username_signup: "required",
      password_signup: "required",
      repassword_signup: {
        equalTo: "#password_signup"
      }
    },
    // Specify form_validation error messages
    messages: {
      email_signup: "שדה חובה",
      username_signup: "שדה חובה",
      password_signup: "שדה חובה",
      repassword_signup: "סיסמאות לא זהות"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

})(jQuery);