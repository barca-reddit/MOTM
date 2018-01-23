// var players,matches,ratings,meta;
// var all_data = [];

// $.when(
//     $.getJSON("./data/players.json", function(data) {
//         all_data.push(data);
//     }),
//     $.getJSON("./data/matches.json", function(data) {
//         all_data.push(data);
//     }),
//     $.getJSON("./data/ratings.json", function(data) {
//         all_data.push(data);
//     }),
//     $.getJSON("./data/meta.json", function(data) {
//         all_data.push(data);
//     })
//     ).then(function() {
//         players = all_data[0];
//         matches = all_data[1];
//         ratings = all_data[2];
//         meta = all_data[3];
// });

// $.ajax({
//     dataType: "json",
//     url: "./data/players.json",
//     mimeType: "application/json",
//     success: function(result){
//         players = result;
//     }
// });

// $.ajax({
//     dataType: "json",
//     url: "./data/matches.json",
//     mimeType: "application/json",
//     success: function(result){
//         matches = result;
//     }
// });

// $.ajax({
//     dataType: "json",
//     url: "./data/ratings.json",
//     mimeType: "application/json",
//     success: function(result){
//         ratings = result;
//     }
// });

// $.ajax({
//     dataType: "json",
//     url: "./data/meta.json",
//     mimeType: "application/json",
//     success: function(result){
//         meta = result;
//     }
// });