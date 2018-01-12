$(document).ready(function() {

var last_match = matches[matches.length-1];
var latest_month_data = 'Table ' + month_num_str(last_match.month) + ' ' + last_match.year + ':';
var last_update = 'Last update: ' + meta[0].last_update;
$('.latest-month').text(latest_month_data);
$('.last-update').text(last_update);
$('.season-table-home').replaceWith(return_table(12));
$('.monthly-table-home').replaceWith(return_table(12,1));
$('.post-match-thread-home').attr('href','https://redd.it/' + last_match.thread);
$('.post-match-thread-home').text(
    last_match.day
    + '-' +
    last_match.month
    + '-' +
    last_match.year
    + ' ' +
    last_match.home_team
    + ' ' +
    last_match.home_score
    + ':' +
    last_match.away_score
    + ' ' +
    last_match.away_team
    + ' (' +
    last_match.competition
    + ') '
);

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



$.each(ratings, function(i, item) {
    if (ratings[i].points === 12 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_1').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('h5.latest_motm_1').text(ratings[i].player_name);
    }
    else if (ratings[i].points === 9 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_2').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('h5.latest_motm_2').text(ratings[i].player_name);
    }
    else if (ratings[i].points === 6 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_3').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('h5.latest_motm_3').text(ratings[i].player_name);
    }
});

function return_table(length,month) {
    var table = [];
    var html = '';
    var match_list = [];

    var html = '<table class="table table-sm table-striped text-center season-table-home">\
            <thead><tr><th scope="col">#</th><th class="text-left" scope="col">Player Name</th><th scope="col">Total Votes</th><th scope="col">Total Points</th></tr></thead>\
            <tbody>';
    
    if (!month) {
        for (i=0;i<players.length;i++) {
            var list = ratings.filter(function(item) { return ( item.player_name === players[i].name ) });
            var total_points = list.map(function(item){ return item.points; }).reduce(function(a, b){ return a + b; }, 0);
            var total_votes = list.map(function(item){ return item.votes; }).reduce(function(a, b){ return a + b; }, 0);
            table.push({ "name": players[i].name, "votes": total_votes,  "points": total_points })
        }

        table.sort(function(a, b){
            return a.points < b.points;
        });

        for (i=0;i<length;i++) {
            html += '<tr><th scope="row">' + (i+1) + '</th>\
            <td class="text-left">'+ table[i].name + '</td>\
            <td>'+ table[i].votes + '</td>\
            <td>'+ table[i].points + '</td>\
            </tr>'
        }

        html += '</tbody></table>';
        return(html);
    }

    if (month) {
        var month_ratings = [];

        for (i=0;i<matches.length;i++) {
            if (matches[i].month === month) {
                match_list.push(matches[i].match_id);
            }
        }
        for (i=0;i<match_list.length;i++) {
            month_ratings = month_ratings.concat(ratings.filter(function(item) { return ( item.match_id === match_list[i] ) }));
        }
        for (i=0;i<players.length;i++) {
            var list = month_ratings.filter(function(item) { return ( item.player_name === players[i].name ) });
            var total_points = list.map(function(item){ return item.points; }).reduce(function(a, b){ return a + b; }, 0);
            var total_votes = list.map(function(item){ return item.votes; }).reduce(function(a, b){ return a + b; }, 0);
            table.push({ "name": players[i].name, "votes": total_votes,  "points": total_points })
        }

        table.sort(function(a, b){
            return a.points < b.points;
        });

        console.log(table);

        for (i=0;i<length;i++) {
            html += '<tr><th scope="row">' + (i+1) + '</th>\
            <td class="text-left">'+ table[i].name + '</td>\
            <td>'+ table[i].votes + '</td>\
            <td>'+ table[i].points + '</td>\
            </tr>'
        }

        html += '</tbody></table>';
        return(html);
        
    }
}


setInterval(function () {  
    var target_date = meta[0].next_match;
    
    var days, hours, minutes, seconds;
    
    var current_date = new Date().getTime();
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





function table_data(data) {
    var data_array = [];
    var last_x_matches;
    var iter = 0;

    var kw = data.type;

    console.log(data.length);

    if (data.length !== 'all') {
        last_x_matches = matches.slice(1).slice(-data.length);
        for (i=0;i<data.length;i++) {
            data_array[i] = [last_x_matches[i].day + '-' + month_num_str(last_x_matches[i].month)];
        }
        iter = data_array.length;
    }
    else {
        last_x_matches = matches;
        for (i=0;i<matches.length;i++) {
            data_array[i] = [last_x_matches[i].day + '-' + month_num_str(last_x_matches[i].month)];
        }
        iter = matches.length;
    }

    if (data.players.length > 1) {
        for (i=0;i<data.players.length;i++) {
            data.players[i][kw] = 0;
        }
    }

    for (i=0;i<data.players.length;i++) {
        for (j=0;j<iter;j++) {
            var temp = ratings.filter(function(item) { return ( item.player_name === data.players[i].name && item.match_id === last_x_matches[j].match_id) });
            if (temp[0] !== undefined) {
                data.players[i][kw] += temp[0][kw];
                data_array[j].push(data.players[i][kw]);
                if (!data.sum) { data.players[i][kw] = 0 }
            }
            else {
                data_array[j].push(data.players[i][kw]);
                if (!data.sum) { data.players[i][kw] = 0 }
            }
        }
    }

    console.log(data_array);
    return(data_array);
}

var args = { location: '#my_chart', type: 'votes', sum: false, length: 'all', players: [ {name: 'Ter Stegen'}, {  name: 'Busquets' }, { name: 'Umtiti' }, {name: 'Sergi Roberto'}, {name: 'Paulinho'}, {name: 'Semedo'}, {name: 'Alba'}] };

google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(function(){
    drawChart(args);
});



function drawChart(args) {
    console.log('start');
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');

    for (i=0;i<args.players.length;i++) {
        data.addColumn('number', args.players[i].name);
    }

    data.addRows(table_data(args));

    var options = {
        chart: {
            title: 'Player votes (Last ' + args.length + ' games)'
        },
        vAxis: {
            title: 'Votes'
        }
    };

    var chart = new google.charts.Line($(args.location)[0]);

    chart.draw(data, google.charts.Line.convertOptions(options));
}

$('.top3-click').click(function() {
    var list = [];
    $('.top3-click').each(function(){
        list.push( { name: $(this).prev().text().trim() });
    });

    console.log(list);

    var popup = { location: '#popup-chart', type: 'votes', sum: true, length: 'all', players: list };
    drawChart(popup);
    
    $('.popup').css({visibility:'visible'});
    $('.popup').animate({
        opacity: 1
    }, 500, function() {
    // Animation complete.
    });
});

$('.popup .modal-footer button, .popup .close').click(function() {
    $('.popup').animate({
        opacity: 0,
    }, 500, function() {
        $('.popup').css({visibility:'hidden'});
    });
});

// $('.clicker').click(function() {
//     $('.popup').fadeIn( "fast", function() {
//         var popup = { location: '#popup-chart', type: 'votes', sum: true, length: 'all', players: [ {name: 'Ter Stegen'}, {  name: 'Busquets' }, { name: 'Umtiti' }, {name: 'Sergi Roberto'}, {name: 'Paulinho'}, {name: 'Semedo'}] };
//         drawChart(popup);
//     });
// });

// $('.popup .modal-footer button, .popup .close').click(function() {
//     $('.popup').fadeOut( "slow", function() {
//         // Animation complete.
//     });
// });


$(window).resize(function(){
    drawChart(args);
});


}); //end of onload



