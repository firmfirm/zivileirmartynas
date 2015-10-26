var kiek = function(n) {
    var s = String(n).split("."),
        f = s[1] || "",
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    return n10 == 1 && (n100 < 11 || n100 > 19) ? "one" : n10 >= 2 && n10 <= 9 && (n100 < 11 || n100 > 19) ? "few" : f != 0 ? "many" : "other"
};

var skaiciuok = function() {
  var tada = moment(new Date(2015, 4, 15, 13, 15));
  var dabar = moment(new Date());
  var diff = moment.duration(dabar.diff(tada));
  var locale = moment.localeData('lt');
  var months = diff.months();
  var days = diff.days();
  var hours = diff.hours();
  var minutes = diff.minutes();
  var seconds = diff.seconds();
  $('.footer').html(
    "Susituokę " + "<strong>" + months + "</strong>" + (kiek(months) == 'one' ? ' mėnesį, ' : (kiek(months) == 'few' ? ' mėnesius, ' : ' mėnesių, ')) +
    "<strong>" + days + "</strong>" + (kiek(days) == 'one' ? ' dieną, ' : (kiek(days) == 'few' ? ' dienas, ' : ' dienų, ')) +
    "<strong>" + hours + "</strong>" + (kiek(hours) == 'one' ? ' valandą, ' : (kiek(hours) == 'few' ? ' valandas, ' : ' valandų, ')) +
    "<strong>" + minutes + "</strong>" + (kiek(minutes) == 'one' ? ' minutę, ' : (kiek(minutes) == 'few' ? ' minutes, ' : ' minučių, ')) +
    "<strong>" + seconds + "</strong>" + (kiek(seconds) == 'one' ? ' sekundę' : (kiek(seconds) == 'few' ? ' sekundes' : ' sekundžių'))
  );
};

var varyk = function() {
  skaiciuok();
  setTimeout(function() {
    varyk();
  }, 1000);
}

$(document).ready(function(){
  varyk();
});
