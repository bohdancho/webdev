$(document).ready(function () {
  $('#contacts-main__form__form').validate({ // initialize the plugin
    rules: {
      Name: {
        required: true
      },
      Phone: {
        required: true
      },
      Message: {
        required: true
      }
    },
    errorPlacement: function(){
      return false;
    }
  });
});