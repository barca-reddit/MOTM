$(document).ready(function() {

// FAKE LOAD

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

var last_match = matches[matches.length-1];
var latest_month_data = 'Table ' + month_num_str(last_match.month) + ' ' + last_match.year + ':';
var last_update = 'Last update: ' + meta[0].last_update;
var last_ratings = ratings.filter(function(item){ return item.match_id === last_match.match_id});

countdown_clock(meta);
home_page_chart(ratings,last_match);

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

for (i=0;i<last_ratings.length;i++) {
    if (last_ratings[i].points === 12 && last_ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_1').attr('src','img/players/' + last_ratings[i].player_id + '.jpg');
        $('div.latest_motm_1 h6').text(last_ratings[i].player_name);
        $('div.latest_motm_1 p').text(last_ratings[i].votes + ' votes (' + last_ratings[i].percentage + '%)');
    }
    else if (last_ratings[i].points === 9 && last_ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_2').attr('src','img/players/' + last_ratings[i].player_id + '.jpg');
        $('div.latest_motm_2 h6').text(last_ratings[i].player_name);
        $('div.latest_motm_2 p').text(last_ratings[i].votes + ' votes (' + last_ratings[i].percentage + '%)');
    }
    else if (last_ratings[i].points === 6 && last_ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_3').attr('src','img/players/' + last_ratings[i].player_id + '.jpg');
        $('div.latest_motm_3 h6').text(last_ratings[i].player_name);
        $('div.latest_motm_3 p').text(last_ratings[i].votes + ' votes (' + last_ratings[i].percentage + '%)');
    }
    else if (last_ratings[i].points === 4 && last_ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_4').attr('src','img/players/' + last_ratings[i].player_id + '.jpg');
        $('div.latest_motm_4 h6').text(last_ratings[i].player_name);
        $('div.latest_motm_4 p').text(last_ratings[i].votes + ' votes (' + last_ratings[i].percentage + '%)');
    }
    else if (last_ratings[i].points === 2 && last_ratings[i].match_id == last_match.match_id) {
        $('img.latest_motm_5').attr('src','img/players/' + last_ratings[i].player_id + '.jpg');
        $('div.latest_motm_5 h6').text(last_ratings[i].player_name);
        $('div.latest_motm_5 p').text(last_ratings[i].votes + ' votes (' + last_ratings[i].percentage + '%)');
    }
}

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
            var top_3 = list.filter(function(x) { return x.points >= 6 });
            var motm_html = '';
            if (top_3.length > 0) {
                for (j=0;j<top_3.length;j++) {
                    if (top_3[j].points === 12) { motm_html += '<a><img src="'+ trophies[0] +'"></img><span>' + matches.find(function(match){ return match.match_id === top_3[j].match_id }).opponent + '</span></a>' }
                    else if (top_3[j].points === 9) { motm_html += '<a><img src="'+ trophies[1] +'"></img><span>' + matches.find(function(match){ return match.match_id === top_3[j].match_id }).opponent + '</span></a>' }
                    else if (top_3[j].points === 6) { motm_html += '<a><img src="'+ trophies[2] +'"></img><span>' + matches.find(function(match){ return match.match_id === top_3[j].match_id }).opponent + '</span></a>' }
                }
            }
            var total_points = list.map(function(item){ return item.points; }).reduce(function(a, b){ return a + b; }, 0);
            var total_votes = list.map(function(item){ return item.votes; }).reduce(function(a, b){ return a + b; }, 0);
            table.push({ "name": players[i].name, "votes": total_votes,  "points": total_points, "motm": motm_html })
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
            <td>'+ table[i].motm + '</td>\
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
            var top_3 = list.filter(function(x) { return x.points >= 6 });
            var motm_html = '';
            if (top_3.length > 0) {
                for (j=0;j<top_3.length;j++) {
                    if (top_3[j].points === 12) { motm_html += '<a><img src="'+ trophies[0] +'"></img><span>' + matches.find(function(match){ return match.match_id === top_3[j].match_id }).opponent + '</span></a>' }
                    else if (top_3[j].points === 9) { motm_html += '<a><img src="'+ trophies[1] +'"></img><span>' + matches.find(function(match){ return match.match_id === top_3[j].match_id }).opponent + '</span></a>' }
                    else if (top_3[j].points === 6) { motm_html += '<a><img src="'+ trophies[2] +'"></img><span>' + matches.find(function(match){ return match.match_id === top_3[j].match_id }).opponent + '</span></a>' }
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
    for (i=(matches.length-1);i>=0;i--) {
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

    else if (clicked === 'charts') {
        if ($('.page-charts .was-active').length > 0) {
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
        else {
            $('<div class="was-active" style="display:none"></div>').appendTo('.page-charts');

            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');

            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                $(this).prop('checked', false);
            });

            $('.page-charts select').val('line-points-season');
            
            for (i=0;i<5;i++) {
                $('.page-charts #pp_' + last_ratings[i].player_id).prop('checked', true);
            }

            var args = { type: 'line', kw: 'points', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() })
            });

            event_listener_charts();
            charts_page_do_line_chart(args);
        }
    }

    else if (clicked === 'tables') {
        if ($('.page-tables .table-season-tables tbody tr').length > 0) {
            $('.visible-page').removeClass('visible-page');
            $('.page-' + clicked).addClass('visible-page');
        }
        else {
            $('.page-tables .pagination').append(pagination_html());
            $('.page-tables .table-season-tables tbody').replaceWith(standings_table_data(players.length));
            $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(players.length,1));
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
            max_votes.sort(function(a,b) {return (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0);} );

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

            max_percentage.sort(function(a,b) {return (a.percentage < b.percentage) ? 1 : ((b.percentage < a.percentage) ? -1 : 0);} );

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

            motm_final.sort(function(a,b) {return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);} );

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

            match_total_votes.sort(function(a,b) {return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);} );

            match_total_votes_low.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);} );

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

function event_listener_charts() {

    $('.page-charts .custom-control-input').click(function(){

        if ($('.page-charts select').val() === 'line-points-season') {
            var args = { type: 'line', kw: 'points', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
            })
            args = charts_page_line_chart_data(args);
            chart.data.datasets = args;
            chart.options.animation.duration = 0;
            chart.update();

        }
        else if ($('.page-charts select').val() === 'line-votes-season') {
            var args = { type: 'line', kw: 'votes', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
            })
            args = charts_page_line_chart_data(args);
            chart.data.datasets = args;
            chart.options.animation.duration = 0;
            chart.update();
        }
        else if ($('.page-charts select').val() === 'bar-points-season') {

            var labels = [];
            var args = { type: 'line', kw: 'points', players: [] };

            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
                labels.push($(this).next().text().trim());
            })
            var mydataset = charts_page_bar_chart_data(args);

            var datasets = [{
                label: 'Total points',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: mydataset
            }]

            chart.data.datasets = datasets;
            chart.data.labels = labels;
            chart.options.animation.duration = 0;
            chart.update();
        }
        else if ($('.page-charts select').val() === 'bar-votes-season') {
            var labels = [];
            var args = { type: 'line', kw: 'votes', players: [] };

            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
                labels.push($(this).next().text().trim());
            })
            var mydataset = charts_page_bar_chart_data(args);

            var datasets = [{
                label: 'Total votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: mydataset
            }]

            chart.data.datasets = datasets;
            chart.data.labels = labels;
            chart.options.animation.duration = 0;
            chart.update();
        }
    });

    $('.page-charts select').change(function(){
        if ($(this).val() === 'line-points-season') {
            chart.destroy();
            var args = { type: 'line', kw: 'points', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() })
            });
            charts_page_do_line_chart(args);
        }
        else if ($(this).val() === 'line-votes-season') {
            chart.destroy();
            var args = { type: 'line', kw: 'votes', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
            })
            charts_page_do_line_chart(args);
        }
        else if ($(this).val() === 'bar-points-season') {
            chart.destroy();
            var args = { type: 'bar', kw: 'points', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
            })
            charts_page_do_line_chart(args);
        }
        else if ($(this).val() === 'bar-votes-season') {
            chart.destroy();
            var args = { type: 'bar', kw: 'votes', players: [] };
            $('.page-charts .custom-control-input:checkbox:checked').each(function(){
                args.players.push({ name: $(this).next().text().trim() });
            })
            charts_page_do_line_chart(args);
        }
    })
}

function event_listener_tables() {
    $('.page-tables .pagination li.next').click(function() {
        if ($('.page-tables .pagination .month').last().hasClass('active') === false) {
            var index = $('.page-tables .pagination .month.active').index();
            $('.page-tables .pagination .month.active').removeClass('active');
            $('.page-tables .pagination .month').eq(index).addClass('active');
            var month = month_str_num($('.page-tables .pagination .month.active').text());
            $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(players.length,month));
        }
    });

    $('.page-tables .pagination li.prev').click(function() {
        if ($('.page-tables .pagination .month').first().hasClass('active') === false) {
            var index = $('.page-tables .pagination .month.active').index();
            $('.page-tables .pagination .month.active').removeClass('active');
            $('.page-tables .pagination .month').eq(index -2).addClass('active');
            var month = month_str_num($('.page-tables .pagination .month.active').text());
            $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(players.length,month));
        }
    });

    $('.page-tables .pagination li.month').click(function() {
        $('.page-tables .pagination .month.active').removeClass('active');
        $(this).addClass('active');
        var month = month_str_num($('.page-tables .pagination .month.active').text());
        $('.page-tables .table-monthly-tables tbody').replaceWith(standings_table_data(players.length,month));
    });
}

function event_listener_matches() {
    $('.page-matches .table-matches tbody tr').click(function() {

        if ($(this).find('.expandable div').length > 0) {

            var table_match_id = $(this).find('.expandable div').attr('match_id');

            if ($(this).next().hasClass('table_motm_expanded')) {
                $(this).nextUntil('tr:not(".table_motm_expanded")').remove();
                $(this).find('.expandable div').removeClass('uparrow');
            }

            else {
                $(this).find('.expandable div').addClass('uparrow');
                var table_motm_ratings = ratings.filter(function(item){ return item.match_id == table_match_id});
                table_motm_ratings.reverse();
                for (i=0;i<table_motm_ratings.length;i++) {
                    $(this).after(
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
                $(this).after(
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
        }
    });
}

function charts_page_bar_chart_data(args) {
    var dataset = [];
    var kw = args.kw;

    // datasets: [{
    //     label: "Total Votes:",
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: ratings.filter(function(item){ return item.match_id === last_match.match_id }).map(function(item){ return item.votes }),
    // }]

    // dataset.label = 'Total ' + args.kw;
    // dataset.backgroundColor = 'rgb(255, 99, 132)';
    // dataset.borderColor = 'rgb(255, 99, 132)';
    // dataset.data = [];

    for (i=0;i<args.players.length;i++) {
        dataset.push(

                ratings.filter(function(item) {
                    return item.player_name === args.players[i].name })
                    .map(function(item){ return item[kw] })
                    .reduce(function(a, b){ return a + b; }, 0)
                
            )
    }

    return dataset;
}

function charts_page_line_chart_data(args) {
    var dataset = [];
    var kw = args.kw;

    for (i=0;i<args.players.length;i++) {
        dataset.push({ label: args.players[i].name, borderColor: chart_color(args.players[i].name), data: [] });
        var totals = 0;
        for (j=0;j<matches.length;j++) {
            var temp = ratings.filter(function(item) { return ( item.player_name === args.players[i].name && item.match_id === matches[j].match_id) });

            if (temp[0] !== undefined) {
                totals += temp[0][kw];
                dataset[i].data.push(totals);
            }
            else {
                dataset[i].data.push(totals);
            }
        }
    }
    return dataset;
}

var chart;

function charts_page_do_line_chart(args) {
    
    var season_chart = $('#charts-page-chart-season')[0].getContext('2d');

    if (args.type === 'line') {

        var object = { labels: [], series: [] };
        var mydataset = charts_page_line_chart_data(args);

        for (i=0;i<matches.length;i++) {
            object.labels.push(month_num_str(matches[i].month) + ' ' + matches[i].day);
        }

        chart = new Chart(season_chart, {
            type: 'line',
            data: {
                labels: object.labels,
                datasets: mydataset
            },
            options: {
                tooltips: {
                    intersect: false,
                    callbacks: {
                        title: function(tooltipItem) {
                            return month_num_str(matches[tooltipItem[0].index].month) + '-' + matches[tooltipItem[0].index].day + ' ' + matches[tooltipItem[0].index].opponent;
                        }
                    }
                },
                elements: {
                    line: {
                        fill: false,
                        borderWidth: 2,
                        tension: 0
                    },
                    point: {
                        radius: 3,
                        pointStyle: 'cross'
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 15
                    }
                },
                maintainAspectRatio: false,
            }
        })
    }

    else if (args.type === 'bar') {

        var object = { labels: [], series: [] };
        object.labels = args.players.map(function(item){ return item.name });
        var mydataset = charts_page_bar_chart_data(args);

        chart = new Chart(season_chart, {
            type: 'bar',
            data: {
                labels: object.labels,
                datasets: [{
                    label: 'Total :' + args.kw,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: mydataset
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
        })
    }

}





} //end of main
}); //end of onload


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
