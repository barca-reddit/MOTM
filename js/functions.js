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

function chart_color(player) {

    switch(player) {
        case 'Ter Stegen': return '#2196f3';
        case 'Semedo': return '#e91e63';
        case 'Pique': return '#8bc34a';
        case 'Rakitic': return '#757575';
        case 'Busquets': return '#f57c00';
        case 'Denis Suarez': return '#26c6da';
        case 'Arda': return '#3f51b5';
        case 'Iniesta': return '#66bb6a';
        case 'Suarez': return '#263238';
        case 'Messi': return '#ffab00';
        case 'Dembele': return '#4fc3f7';
        case 'Rafinha': return '#9c27b0';
        case 'Cillessen': return '#26a69a';
        case 'Mascherano': return '#78909c';
        case 'Paulinho': return '#fc0214';
        case 'Paco': return '#7c4dff';
        case 'Alba': return '#795548';
        case 'Digne': return '#aeea00';
        case 'Sergi Roberto': return '#bdbdbd';
        case 'Gomes': return '#e64a19';
        case 'Vidal': return '#2196f3';
        case 'Umtiti': return '#e91e63';
        case 'Yerry Mina': return '#8bc34a';
        case 'Vermaelen': return '#757575';
        case 'Coutinho': return '#f57c00';
        default: return '#ccc';
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

    var home_chart_container = $('#home-page-chart')[0].getContext('2d');
    var home_chart = new Chart(home_chart_container, {

        type: 'bar',

        data: {
            labels: ratings.filter(function(item){ return item.match_id === last_match.match_id }).map(function(item){ return item.player_name }),
            datasets: [{
                label: "Total Votes:",
                backgroundColor: 'rgba(33, 150, 243, 0.8)',
                borderColor: 'rgba(33, 150, 243, 0.8)',
                data: ratings.filter(function(item){ return item.match_id === last_match.match_id }).map(function(item){ return item.votes })
            }]
        },

        options: {
            legend: {
                display:false
            },
            tooltips: {
                intersect: false
            },
            maintainAspectRatio: false
        }
    });

}

function return_stat(stat,array) {
	switch (stat) {
		case "map": return array[0]; break;      // Matches played
		case "mas": return array[1]; break;      // Matches started
		case "masub": return array[2]; break;    // Matches as substitute
		case "masubout": return array[3]; break; // Matches substituted
		case "mip": return array[4]; break;      // Minutes played
		case "gs": return array[5]; break;       // Goals scored
		case "gh": return array[6]; break;       // Goals with head
		case "gp": return array[7]; break;       // Goals from penalties
		case "gf": return array[8]; break;       // Goals from free kicks
		case "gl": return array[9]; break;       // Goals with left foot
		case "gr": return array[10]; break;       // Goals with right foot
		case "p": return array[11]; break;        // Assists (NB:This is actually passes)
		case "a": return array[12]; break;        // Goal assists
		case "s": return array[13]; break;        // Shots
		case "sot": return array[14]; break;      // Shots on target
		case "sof": return array[15]; break;      // Shots off target
		case "sw": return array[16]; break;       // Shots onto woodwork
		case "o": return array[17]; break;        // Offsides
		case "y": return array[18]; break;        // Yellow cards
		case "r": return array[19]; break;        // Direct red cards
		case "yr": return array[20]; break;       // Red cards for double yellow
		case "fc": return array[21]; break;       // Fouls committed
		case "fr": return array[22]; break;       // Fouls received
		case "bw": return array[23]; break;       // Balls won
		case "bl": return array[24]; break;       // Balls lost
	}
}
