jQuery(function ($) {
  $('#left_middle_widget').width('100%').height('100%').split({
    orientation: 'vertical',
    limit: 10,
    position: '30%',
    percent: true
  });
  $('#middle_right_widget').split({
    orientation: 'vertical',
    limit: 10,
    position: '60%',
    percent: true
  });
  $('#right_upper_lower_widget').split({
    orientation: 'horizontal',
    limit: 10,
    position: '50%',
    percent: true
  });
});