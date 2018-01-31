// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
       // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
  
        var o = Object(this);
  
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;
  
        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
  
        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];
  
        // 5. Let k be 0.
        var k = 0;
  
        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }
  
        // 7. Return undefined.
        return undefined;
      }
    });
  }

function month_num_str(month) {
    switch (month) {
        case 1:
        return 'Jan';
        case 2:
        return 'Feb';
        case 3:
        return 'Mar';
        case 4:
        return 'Apr';
        case 5:
        return 'May';
        case 6:
        return 'Jun';
        case 7:
        return 'Jul';
        case 8:
        return 'Aug';
        case 9:
        return 'Sep';
        case 10:
        return 'Oct';
        case 11:
        return 'Nov';
        case 12:
        return 'Dec';
    }
}

function month_str_num(month) {
    switch (month) {
        case 'Jan':
        return 1;
        case 'Feb':
        return 2;
        case 'Mar':
        return 3;
        case 'Apr':
        return 4;
        case 'May':
        return 5;
        case 'Jun':
        return 6;
        case 'Jul':
        return 7;
        case 'Aug':
        return 8;
        case 'Sep':
        return 9;
        case 'Oct':
        return 10;
        case 'Nov':
        return 11;
        case 'Dec':
        return 12;
    }
}

function chart_color(number) {
    colors = [
        '#2196f3',
        '#e91e63',
        '#8bc34a',
        '#757575',
        '#f57c00',
        '#26c6da',
        '#3f51b5',
        '#66bb6a',
        '#263238',
        '#ffab00',
        '#4fc3f7',
        '#9c27b0',
        '#26a69a',
        '#78909c',
        '#fc0214',
        '#7c4dff',
        '#795548',
        '#aeea00',
        '#bdbdbd',
        '#e64a19'
    ]
    if (number > 19) {
        return colors[number - 20];
    }
    else {
        return colors[number];
    }
}

function countdown_clock(meta) {
    setInterval(function () {  
        var current_date = new Date().getTime();
        var target_date = (meta[0].upcoming_match <= current_date) ? nearest_match = meta[0].next_match : nearest_match = meta[0].upcoming_match;
        
        var days, hours, minutes, seconds;
        var seconds_left = (target_date - current_date) / 1000;
        
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);

        var final = 'Next match in: ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';

        $('.countdown').text(final);

    }, 1000);
}

function home_page_chart(ratings,last_match) {

    var home_chart = $('#home-page-chart')[0].getContext('2d');
    var chart = new Chart(home_chart, {

        type: 'bar',

        data: {
            labels: ratings.filter(function(item){ return item.match_id === last_match.match_id }).map(function(item){ return item.player_name }),
            datasets: [{
                label: "Total Votes:",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: ratings.filter(function(item){ return item.match_id === last_match.match_id }).map(function(item){ return item.votes }),
            }]
        },

        options: {
            legend: {
                display:false
            },
            tooltips: {
                mode: 'nearest',
                intersect: false
            },
            maintainAspectRatio: false
        }
    });

}

