var ThumbApiUtil = {
  createThumb: function (thumbParams, businessId, success) {
    $.ajax({
      url: "/api/businesses/" + businessId + "/thumbs",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: thumbParams,
      success: function (thumb) {
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from createThumb');
      }
    });
  }
};

module.exports = ThumbApiUtil;
