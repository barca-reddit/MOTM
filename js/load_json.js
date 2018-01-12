var players,matches,ratings,meta;

$.ajax({
    dataType: "json",
    url: "./data/players.json",
    async: false,
    mimeType: "application/json",
    success: function(result){
        players = result;
    }
});

$.ajax({
    dataType: "json",
    url: "./data/matches.json",
    async: false,
    mimeType: "application/json",
    success: function(result){
        matches = result;
    }
});

$.ajax({
    dataType: "json",
    url: "./data/ratings.json",
    async: false,
    mimeType: "application/json",
    success: function(result){
        ratings = result;
    }
});

$.ajax({
    dataType: "json",
    url: "./data/meta.json",
    async: false,
    mimeType: "application/json",
    success: function(result){
        meta = result;
    }
});