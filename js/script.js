$(document).ready(function() {

//FAKE LOAD
// var matches, ratings;
// $.getJSON('./data/matches.json', function(data) {
//     matches = data;
// });
// $.getJSON('./data/ratings.json', function(data) {
//     ratings = data;
// });

function load_json() {

    $.when(
        $.getJSON('./data/players.json'),
        $.getJSON('./data/matches.json'),
        $.getJSON('./data/ratings.json'),
        $.getJSON('./data/meta.json'))
        .done(function(j1,j2,j3,j4) {
            main(j1[0],j2[0],j3[0],j4[0]);
    })
}

load_json();

function main(players,matches,ratings,meta) {

console.log(players);
console.log(matches);
console.log(ratings);
console.log(meta);

var last_match = matches[matches.length-1];
var latest_month_data = 'Table ' + month_num_str(last_match.month) + ' ' + last_match.year + ':';
var last_update = 'Last update: ' + meta[0].last_update;

countdown_clock(meta);

$('.latest-month').text(latest_month_data);
$('.last-update').text(last_update);
$('.table-season-home tbody').replaceWith(standings_table_data(15));
$('.table-monthly-home tbody').replaceWith(standings_table_data(15,last_match.month));
$('.post-match-thread-home').attr('href','https://redd.it/' + last_match.thread);
$('.post-match-thread-home').text(
    last_match.day
    + '-' +
    month_num_str(last_match.month)
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

$.each(ratings, function(i, item) {
    if (ratings[i].points === 12 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_1').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('div.latest_motm_1 h6').text(ratings[i].player_name);
        $('div.latest_motm_1 p').text(ratings[i].votes + ' votes (' + ratings[i].percentage + '%)');
    }
    else if (ratings[i].points === 9 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_2').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('div.latest_motm_2 h6').text(ratings[i].player_name);
        $('div.latest_motm_2 p').text(ratings[i].votes + ' votes (' + ratings[i].percentage + '%)');
    }
    else if (ratings[i].points === 6 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_3').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('div.latest_motm_3 h6').text(ratings[i].player_name);
        $('div.latest_motm_3 p').text(ratings[i].votes + ' votes (' + ratings[i].percentage + '%)');
    }
    else if (ratings[i].points === 4 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_4').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('div.latest_motm_4 h6').text(ratings[i].player_name);
        $('div.latest_motm_4 p').text(ratings[i].votes + ' votes (' + ratings[i].percentage + '%)');
    }
    else if (ratings[i].points === 2 && ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_5').attr('src','img/players/' + ratings[i].player_id + '.jpg');
        $('div.latest_motm_5 h6').text(ratings[i].player_name);
        $('div.latest_motm_5 p').text(ratings[i].votes + ' votes (' + ratings[i].percentage + '%)');
    }
});

function standings_table_data(length,month) {
    var table = [];
    var html = '<tbody>';
    var match_list = [];
    var trophies = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAllBMVEUAAADtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxHtwxFW40iEAAAAMXRSTlMAAQIFBwgJCgwODxITFBYhIyUpLzg7PVZeX2h0eICYur7BxcfKz9HT1d7o6evx9fn7Z9l27AAAAHBJREFUCB1FwYsWgVAQBdBTiqTII6Jwi8i78/8/Z5q7Wu0NkbUUNx9WS7WFKIyh9TAmB+PgQ7ULZkQzRUWVIKyxPnsHqlFcr4D0dWXnW94TCHdxJPncROidyDkGS14wcPZ8T9DL2GnGsH5UKSzHVRB/ce8RUTuczWAAAAAASUVORK5CYII=',
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAllBMVEUAAACVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaaVpaYLwV2+AAAAMXRSTlMAAQIFBwgJCgwODxITFBYhIyUpLzg7PVZeX2h0eICYur7BxcfKz9HT1d7o6evx9fn7Z9l27AAAAHBJREFUCB1FwYsWgVAQBdBTiqTII6Jwi8i78/8/Z5q7Wu0NkbUUNx9WS7WFKIyh9TAmB+PgQ7ULZkQzRUWVIKyxPnsHqlFcr4D0dWXnW94TCHdxJPncROidyDkGS14wcPZ8T9DL2GnGsH5UKSzHVRB/ce8RUTuczWAAAAAASUVORK5CYII=',
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAllBMVEUAAADVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCzVjCyZOFHoAAAAMXRSTlMAAQIFBwgJCgwODxITFBYhIyUpLzg7PVZeX2h0eICYur7BxcfKz9HT1d7o6evx9fn7Z9l27AAAAHBJREFUCB1FwYsWgVAQBdBTiqTII6Jwi8i78/8/Z5q7Wu0NkbUUNx9WS7WFKIyh9TAmB+PgQ7ULZkQzRUWVIKyxPnsHqlFcr4D0dWXnW94TCHdxJPncROidyDkGS14wcPZ8T9DL2GnGsH5UKSzHVRB/ce8RUTuczWAAAAAASUVORK5CYII='
                    ];
    
    if (!month) {
        for (i=0;i<players.length;i++) {
            var list = ratings.filter(function(item) { return ( item.player_name === players[i].name ) });
            var total_points = list.map(function(item){ return item.points; }).reduce(function(a, b){ return a + b; }, 0);
            var total_votes = list.map(function(item){ return item.votes; }).reduce(function(a, b){ return a + b; }, 0);
            table.push({ "name": players[i].name, "votes": total_votes,  "points": total_points })
        }

        table.sort(function(a, b){
            return a.votes == b.votes ? 0 : +(a.votes < b.votes) || -1;
        });

		table.sort(function(a, b) {
  			return a.points == b.points ? 0 : +(a.points < b.points) || -1;
		});

        for (i=0;i<length;i++) {
            html += '<tr><th>' + (i+1) + '</th>\
            <td class="text-left">'+ table[i].name + '</td>\
            <td>'+ table[i].votes + '</td>\
            <td>'+ table[i].points + '</td>\
            </tr>'
        }

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
            var top_3 = list.map(function(x) {
                if (x.points >= 6) {
                    return x.points;
                }
                
            });
            console.log('top3:'  + top_3);
            var motm_html = '';
            if (top_3.length > 0) {
                for (j=0;j<top_3.length;j++) {
                    if (top_3[j] === 12) { motm_html += '<img src="'+ trophies[0] +'"></img>' }
                    else if (top_3[j] === 9) { motm_html += '<img src="'+ trophies[1] +'"></img>' }
                    else if (top_3[j] === 6) { motm_html += '<img src="'+ trophies[2] +'"></img>' }
                }
            }
            var total_points = list.map(function(item){ return item.points; }).reduce(function(a, b){ return a + b; }, 0);
            var total_votes = list.map(function(item){ return item.votes; }).reduce(function(a, b){ return a + b; }, 0);
            table.push({ "name": players[i].name, "votes": total_votes,  "points": total_points, "motm": motm_html })
        }

        table.sort(function(a, b){
  			return a.votes == b.votes ? 0 : +(a.votes < b.votes) || -1;
        });
        
        table.sort(function(a, b){
            return a.points == b.points ? 0 : +(a.points < b.points) || -1;
        });

        for (i=0;i<length;i++) {
            html += '<tr><th>' + (i+1) + '</th>\
            <td class="text-left">'+ table[i].name + '</td>\
            <td>'+ table[i].votes + '</td>\
            <td>'+ table[i].points + '</td>\
            <td>'+ table[i].motm + '</td>\
            </tr>'
        }

        html += '</tbody>';

        return(html);
        
    }
}


function match_list_html() {
    var html;
    for (i=0;i<matches.length;i++) {
        html +=
        '<tr>' +
        '<td>' + matches[i].day + '-' + month_num_str(matches[i].month) + '-' + matches[i].year + '</td>' +
        '<td>' + matches[i].competition + '</td>' +
        '<td>' + matches[i].home_team + '</td>' +
        '<td>' + matches[i].home_score + '-' + matches[i].away_score  + '</td>' +
        '<td>' + matches[i].away_team + '</td>' +
        '<td>' + '<a class="text-primary" href="https://redd.it/' + matches[i].thread + '" target="_blank">Thread</a></td>' +
        '<td class="expandable"><div match_id="' + matches[i].match_id + '"></div></td>' +
        '</tr>'
    }
    return html;
}

function pagination_html() {
    var html = '<li class="page-item prev"><a class="page-link">&laquo;</a></li>';
    var available_months = matches.map(function(item){ return item.month }).filter(function(value,index,self){ return self.indexOf(value) === index });

    for (i=0;i<available_months.length;i++) {
        if (i === (available_months.length-1)) {
            html += '<li class="page-item month active">' +
            '<a class="page-link">' + month_num_str(available_months[i]) + '</a>' +
            '</li>'
        }
        else {
            html += '<li class="page-item month">' +
                    '<a class="page-link">' + month_num_str(available_months[i]) + '</a>' +
                    '</li>'
        }
    }

    html += '<li class="page-item next"><a class="page-link">&raquo;</a></li>';
    return html;
}

$('.main-menu').click(function() {
    var clicked = $(this).attr('href').replace('#','');
    $('.main-menu.active').removeClass('active');
    $(this).addClass('active');

    if (clicked === 'matches') {
        if ($('.page-matches .table-matches tbody tr').length > 0) {
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
        else {
            $('.page-matches .table-matches tbody').html(match_list_html());
            event_listener_matches();
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
    }

    else if (clicked === 'tables') {
        if ($('.page-tables .table-season-tables tbody tr').length > 0) {
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
        else {
            $('.page-tables .pagination').append(pagination_html());
            $('.page-tables .table-season-tables tbody').replaceWith(standings_table_data(25));
            $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(25,1));
            event_listener_tables();
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
    }


    else if (clicked === 'records') {
        if ($('.page-records p').length > 0) {
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
        else {

            var max_votes = ratings;
            max_votes.sort(function(a,b) {
                return a.votes < b.votes;
            });

            max_votes = max_votes.slice(0,5);
            max_votes.reverse(); //reversing array so jquery.after() works properly

            for (i=0;i<max_votes.length;i++) {
                var match = matches.filter(function(item){ return item.match_id === max_votes[i].match_id });
                $('.page-records .record-votes').after(
                    '<p>' + max_votes[i].player_name +
                    ': <strong>' + max_votes[i].votes + '</strong>' +
                    ' votes vs <a href="https://redd.it/' + match[0].thread + '" target="_blank">' + match[0].opponent + '</a>' +
                    '</p>'
                );
            }
            
            var max_percentage = ratings;

            max_percentage.sort(function(a,b) {
                return a.percentage < b.percentage;
            });

            max_percentage = max_percentage.slice(0,5);
            max_percentage.reverse(); //reversing array so jquery.after() works properly

            for (i=0;i<max_percentage.length;i++) {
                var match = matches.filter(function(item){ return item.match_id === max_percentage[i].match_id });
                $('.page-records .record-percentage').after(
                    '<p>' + max_percentage[i].player_name +
                    ': <strong>' + max_percentage[i].percentage + '</strong>' +
                    '% vs <a href="https://redd.it/' + match[0].thread + '" target="_blank">' + match[0].opponent + '</a>' +
                    '</p>'
                );
            }

            var motm_list = ratings.filter(function(item){ return item.points === 12 });
            var unique_names = motm_list.map(function(obj) { return obj.player_name; });
            unique_names = unique_names.filter(function(v,i) { return unique_names.indexOf(v) == i; });

            var motm_final = [];

            for (i=0;i<unique_names.length;i++) {
                motm_final[i] = {name: unique_names[i], count: motm_list.filter(function(val){return val.player_name === unique_names[i]}).length }
            }

            motm_final.sort(function(a,b) {
                return a.count < b.count;
            })

            motm_final = motm_final.slice(0,5);
            motm_final = motm_final.reverse(); //reversing array so jquery.after() works properly

            for (i=0;i<motm_final.length;i++) {
                $('.page-records .record-motm').after(
                    '<p>' + motm_final[i].name +
                    ': <strong>' + motm_final[i].count + '</strong>' +
                    ' wins</p>'
                );
            }

            var unique_match_ids = ratings.map(function(item){ return item.match_id });
            unique_match_ids = unique_match_ids.filter(function(value,index,self){ return self.indexOf(value) === index });

            var match_total_votes = [];

            for (i=0;i<unique_match_ids.length;i++) {
                var match = ratings.filter(function(item){ return item.match_id === unique_match_ids[i] });
                var sum = match.map(function(item){ return item.votes }).reduce(function(a, b){ return a + b; }, 0);
                match_total_votes[i] = {match_id: match[0].match_id, count: sum };
            }

            var match_total_votes_low = match_total_votes.slice(0);

            match_total_votes.sort(function(a,b) {
                return a.count < b.count;
            });

            match_total_votes_low.sort(function(a,b) {
                return a.count > b.count;
            });

            match_total_votes = match_total_votes.slice(0,5);
            match_total_votes = match_total_votes.reverse();

            match_total_votes_low = match_total_votes_low.slice(0,5);
            match_total_votes_low = match_total_votes_low.reverse();


            for (i=0;i<match_total_votes.length;i++) {
                var temp = matches.filter(function(item) { return item.match_id === match_total_votes[i].match_id });
                $('.page-records .record-match-votes').after(
                    '<p><a href="https://redd.it/' + temp[0].thread + '" target="blank_">' + temp[0].home_team + ' vs ' +
                    temp[0].away_team + '</a>: ' +
                    '<strong>' + match_total_votes[i].count + '</strong> ' + 'total votes</p>'
                );   
            }

            for (i=0;i<match_total_votes_low.length;i++) {
                var temp = matches.filter(function(item) { return item.match_id === match_total_votes_low[i].match_id });
                $('.page-records .record-match-votes-low').after(
                    '<p><a href="https://redd.it/' + temp[0].thread + '" target="blank_">' + temp[0].home_team + ' vs ' +
                    temp[0].away_team + '</a>: ' +
                    '<strong>' + match_total_votes_low[i].count + '</strong> ' + 'total votes</p>'
                );   
            }


            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
    }

    else {
        $('.visible-page').removeClass('visible-page');
        $('.page-' + clicked).addClass('visible-page');
    }
});

function event_listener_tables() {
    $('.page-tables .pagination li.next').click(function() {
        if ($('.page-tables .pagination .month').last().hasClass('active') === false) {
            var index = $('.page-tables .pagination .month.active').index();
            $('.page-tables .pagination .month.active').removeClass('active');
            $('.page-tables .pagination .month').eq(index).addClass('active');
            var month = month_str_num($('.page-tables .pagination .month.active').text());
            $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(25,month));
        }
    });

    $('.page-tables .pagination li.prev').click(function() {
        if ($('.page-tables .pagination .month').first().hasClass('active') === false) {
            var index = $('.page-tables .pagination .month.active').index();
            $('.page-tables .pagination .month.active').removeClass('active');
            $('.page-tables .pagination .month').eq(index -2).addClass('active');
            var month = month_str_num($('.page-tables .pagination .month.active').text());
            $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(25,month));
        }
    });

    $('.page-tables .pagination li.month').click(function() {
        $('.page-tables .pagination .month.active').removeClass('active');
        $(this).addClass('active');
        var month = month_str_num($('.page-tables .pagination .month.active').text());
        $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(25,month));
    });
}


function event_listener_matches() {
    $('.page-matches .table-matches tbody .expandable div').click(function() {
        var table_match_id = $(this).attr('match_id');

        if ($(this).parent().parent().next().hasClass('table_motm_expanded')) {
            $(this).parent().parent().nextUntil('tr:not(".table_motm_expanded")').remove();
            $(this).removeClass('uparrow');
        }

        else {
            $(this).addClass('uparrow');
            var table_motm_ratings = ratings.filter(function(item){ return item.match_id == table_match_id});
            table_motm_ratings.reverse();
            for (i=0;i<table_motm_ratings.length;i++) {
                $(this).parent().parent().after(
                    '<tr class="table_motm_expanded small">' +
                    '<td>' + (table_motm_ratings.length-i) + '</td>' +
                    '<td>' + table_motm_ratings[i].player_name + '</td>' +
                    '<td>' + table_motm_ratings[i].votes + ' votes</td>' +
                    '<td>' + table_motm_ratings[i].percentage + '%</td>' +
                    '<td>' + table_motm_ratings[i].points + ' points</td>' +
                    '<td>&nbsp;</td>' +
                    '<td>&nbsp;</td>' +
                    '</tr>'
                )
            }
            $(this).parent().parent().after(
                '<tr class="table_motm_expanded">' +
                '<th>#</th>' +
                '<th>Player name</th>' +
                '<th>Votes</th>' +
                '<th>Percentage</th>' +
                '<th>Points</th>' +
                '<th>&nbsp;</th>' +
                '<th>&nbsp;</th>' +
                '</tr>'
            )
        }
    });
}

function draw_chart(data) {
    data.type;
    data.players;
    data.location;
}

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


















} //end of main
}); //end of onload



// var data = {
//     labels: ['Jan 21', 'Jan 25', 'Jan 27','Jan 21', 'Jan 25', 'Jan 27','Jan 21', 'Jan 25', 'Jan 27','Jan 21', 'Jan 25', 'Jan 27'],
//     series: [
//                 [
//                     {meta: 'Real Madrid (A)', value: 12},
//                     {meta: 'Valencia (A)', value: 45},
//                     {meta: 'Real Sociedad', value: 21},
//                     {meta: 'Getafe', value: 25},
//                     {meta: 'Girona', value: 63}
//                 ],
//                 [
//                     {meta: 'Real Madrid (A)', value: 52},
//                     {meta: 'Valencia (A)', value: 51},
//                     {meta: 'Real Sociedad', value: 121},
//                     {meta: 'Getafe', value: 51},
//                     {meta: 'Girona', value: 43}
//                 ]
//         ]
// }

// google.charts.load('current', {'packages':['line']});
// google.charts.setOnLoadCallback(function(){
//     drawChart(args);
// });

// function drawChart(args) {
//     console.log('start');
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Date');

//     for (i=0;i<args.players.length;i++) {
//         data.addColumn('number', args.players[i].name);
//     }

//     data.addRows(table_data(args));

//     var options = {
//         chart: {
//             title: 'Player votes (Last ' + args.length + ' games)'
//         },
//         vAxis: {
//             title: 'Votes'
//         }
//     };

//     var chart = new google.charts.Line($(args.location)[0]);

//     chart.draw(data, google.charts.Line.convertOptions(options));
// }

// $('.top3-click').click(function() {
//     var list = [];
//     $('.top3-click').each(function(){
//         list.push( { name: $(this).prev().text().trim() });
//     });

//     console.log(list);

//     var popup = { location: '#popup-chart', type: 'votes', sum: true, length: 'all', players: list };
//     drawChart(popup);
    
//     $('.popup').css({visibility:'visible'});
//     $('.popup').animate({
//         opacity: 1
//     }, 500, function() {
//     // Animation complete.
//     });
// });

// $('.popup .modal-footer button, .popup .close').click(function() {
//     $('.popup').animate({
//         opacity: 0,
//     }, 500, function() {
//         $('.popup').css({visibility:'hidden'});
//     });
// });

//vvvvvvvvvvvvvvvv CHARTIST vvvvvvvvvvvvvvvv

// function line_chart_data(data) {
//     var kw = data.type;
//     var object = { labels: [], series: [] };

//     for (i=0;i<matches.length;i++) {
//         object.labels.push(month_num_str(matches[i].month) + ' ' + matches[i].day);
//     }

//     for (i=0;i<data.players.length;i++) {
//         var totals = 0;
//         for (j=0;j<matches.length;j++) {
//             var temp = ratings.filter(function(item) { return ( item.player_name === data.players[i].name && item.match_id === matches[j].match_id) });
//             if (object.series[i] === undefined) {
//                 object.series[i] = [];
//                 (temp[0] !== undefined) ? totals += temp[0][kw] : totals = totals;
//                 (temp[0] !== undefined) ? object.series[i].push({ meta: matches[j].opponent, value: totals }) : object.series[i].push({meta: matches[j].opponent, value: totals});
//             }
//             else {
//                 (temp[0] !== undefined) ? totals += temp[0][kw] : totals = totals;
//                 (temp[0] !== undefined) ? object.series[i].push({ meta: matches[j].opponent, value: totals }) : object.series[i].push({meta: matches[j].opponent, value: totals});
//             }
//         }
//     }

//     return object;

// }


// var args = { type: 'points', sum: true, length: 'all', players: [{name: 'Ter Stegen'},{name: 'Semedo'},{name: 'Pique'},{name: 'Rakitic'},{name: 'Busquets'},{name: 'Denis Suarez'},{name: 'Iniesta'},{name: 'Suarez'},{name: 'Dembele'},{name: 'Rafinha'},{name: 'Cillessen'},{name: 'Mascherano'},{name: 'Paulinho'},{name: 'Deulofeu'},{name: 'Alba'},{name: 'Digne'},{name: 'Sergi Roberto'},{name: 'Vidal'},{name: 'Umtiti'}] };

// var options = {
//     fullWidth: true,
//     axisX: {
//         labelInterpolationFnc: function(value, index) {
//             return index % 2 === 0 ? value : null;
//         }
//     },
//     lineSmooth: false,
//     plugins: [
//         Chartist.plugins.tooltip()
//     ]
// }
  
// var chart = new Chartist.Line('.page-home-main-chart', line_chart_data(args) , options);
// for (i=0;i<args.players.length;i++) {
//     $('.col-10.page-home-main-chart').append('<button type="button" class="btn btn-sm text-white m-1" style="background-color:' + chart_color(i) + '">' + args.players[i].name + '</button>');
// }

  

// $('.page-home-main-chart button').hover(function() {
//     $('.page-home-main-chart g.ct-series').eq($(this).index()).addClass('hovered');
//     $('.page-home-main-chart g.ct-series').eq($(this).index()).addClass('hovered');
// }, function() {
//     $('.page-home-main-chart g.ct-series').eq($(this).index()).removeClass('hovered');
//     $('.page-home-main-chart g.ct-series').eq($(this).index()).removeClass('hovered');
// })