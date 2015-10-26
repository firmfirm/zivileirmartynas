var karys = function(n, ord) {
    var s = String(n).split("."),
        f = s[1] || "",
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return "other";
    return n10 == 1 && (n100 < 11 || n100 > 19) ? "one" : n10 >= 2 && n10 <= 9 && (n100 < 11 || n100 > 19) ? "few" : f != 0 ? "many" : "other"
};

var varyk = function() {
  var tada = moment(new Date(2015, 4, 15, 13, 15));
  var dabar = moment(new Date());
  var diff = moment.duration(dabar.diff(tada));
  var locale = moment.localeData('lt');
  var months = diff.months();
  var days = diff.days();
  var hours = diff.hours();
  var minutes = diff.minutes();
  var seconds = diff.seconds();
  $('.footer').text(
    "Susituokę " + months + (karys(months) == 'one' ? ' mėnesį, ' : (karys(months) == 'few' ? ' mėnesius, ' : ' mėnesių, ')) +
    days + (karys(days) == 'one' ? ' dieną, ' : (karys(days) == 'few' ? ' dienas, ' : ' dienų, ')) +
    hours + (karys(hours) == 'one' ? ' valandą, ' : (karys(hours) == 'few' ? ' valandas, ' : ' valandų, ')) +
    minutes + (karys(minutes) == 'one' ? ' minutę, ' : (karys(minutes) == 'few' ? ' minutes, ' : ' minučių, ')) +
    seconds + (karys(seconds) == 'one' ? ' sekundę' : (karys(seconds) == 'few' ? ' sekundes' : ' sekundžių'))
  );
};

var pisk = function() {
  varyk();
  setTimeout(function() {
    pisk();
  }, 1000);
}

$(document).ready(function(){
  pisk();
});
