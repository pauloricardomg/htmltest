// add links to calendars
if (document.currentScript && document.currentScript.dataset.track) {
  var track = document.currentScript.dataset.track;

  function calendar(link) {
    return "<a style='text-decoration: none' href='../calendars/" + link + ".ics' download>&#128197;</a>";
  };

  // track calendar
  $("header.major h2:first").prepend(calendar(track));

  // individual event calendars
  var names = {};
  $("strong+br+a[name]").each(function () {
    // fixup name collisions
    var name = this.name;
    if (names[name]) {
      names[name]++;
      name += '-' + names[name];
      $(this).attr('name', name);
    } else {
      names[name] = 1;
    }

    $(this).prev().prev().before(calendar(track + "-" + name));
  });

  // localize times
  var options = { weekday: 'long', year: 'numeric', month: 'long', 
    day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
  var format = Intl.DateTimeFormat(navigator.language, options).format;
  $("strong a").each(function () {
    var iso = $(this).attr('href').match(/\d[-\dT:]+/);
    if (iso) $(this).attr('title', iso[0] + 'Z').text(format(new Date(iso[0] + 'Z')));
  });
};
