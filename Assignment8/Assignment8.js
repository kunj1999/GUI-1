/*
    File: Assignment8/Assignment8.js
    COMP 4610 Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
    Kunj Patel, UMass Lowell Computer Science, kunj_patel@student.uml.edu
    Copyright (c) 2020 by Kunj Patel. All rights reserved. May be freely copied
    or excerpted for educational purposes with credit to the author.
    created by Kunj on 11/27/2020
    updated by Kunj on 12/9/2020 at 8:00 pm

    This will create the interactive single player scrabble game
*/

// Global array that will house which tiles have been placed on the board
var currentWord = ["", "", "", "", "", "", ""];
var remainingTiles = 92;
var totalRunningScore = 0;
var word = "";
var WORDGAPERROR = "Word must not contain any gaps";
var highScore = 0;

var tiles = [{letter:"A", value:1, amount:9, remaining: 9, img: "'Graphics/Scrabble_Tile_A.jpg'"},
    {letter:"B", value:3, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_B.jpg'"},
    {letter:"C", value:3, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_C.jpg'"},
    {letter:"D", value:2, amount:4, remaining: 4, img: "'Graphics/Scrabble_Tile_D.jpg'"},
    {letter:"E", value:1, amount:12, remaining: 12, img: "'Graphics/Scrabble_Tile_E.jpg'"},
    {letter:"F", value:4, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_F.jpg'"},
    {letter:"G", value:2, amount:3, remaining: 3, img: "'Graphics/Scrabble_Tile_G.jpg'"},
    {letter:"H", value:4, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_H.jpg'"},
    {letter:"I", value:1, amount:9, remaining: 9, img: "'Graphics/Scrabble_Tile_I.jpg'"},
    {letter:"J", value:8, amount:1, remaining: 1, img: "'Graphics/Scrabble_Tile_J.jpg'"},
    {letter:"K", value:5, amount:1, remaining: 1, img: "'Graphics/Scrabble_Tile_K.jpg'"},
    {letter:"L", value:1, amount:4, remaining: 4, img: "'Graphics/Scrabble_Tile_L.jpg'"},
    {letter:"M", value:3, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_M.jpg'"},
    {letter:"N", value:1, amount:5, remaining: 5, img: "'Graphics/Scrabble_Tile_N.jpg'"},
    {letter:"O", value:1, amount:8, remaining: 8, img: "'Graphics/Scrabble_Tile_O.jpg'"},
    {letter:"P", value:3, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_P.jpg'"},
    {letter:"Q", value:10, amount:1, remaining: 1, img: "'Graphics/Scrabble_Tile_Q.jpg'"},
    {letter:"R", value:1, amount:6, remaining: 6, img: "'Graphics/Scrabble_Tile_R.jpg'"},
    {letter:"S", value:1, amount:4, remaining: 4, img: "'Graphics/Scrabble_Tile_S.jpg'"},
    {letter:"T", value:1, amount:6, remaining: 6, img: "'Graphics/Scrabble_Tile_T.jpg'"},
    {letter:"U", value:1, amount:4, remaining: 4, img: "'Graphics/Scrabble_Tile_U.jpg'"},
    {letter:"V", value:4, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_V.jpg'"},
    {letter:"W", value:4, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_W.jpg'"},
    {letter:"X", value:8, amount:1, remaining: 1, img: "'Graphics/Scrabble_Tile_X.jpg'"},
    {letter:"Y", value:4, amount:2, remaining: 2, img: "'Graphics/Scrabble_Tile_Y.jpg'"},
    {letter:"Z", value:10, amount:1, remaining: 1, img: "'Graphics/Scrabble_Tile_Z.jpg'"},
    {letter:"_", value:0, amount:2, remaining: 2, img:"'Graphics/Scrabble_Tile_Blank.jpg'"}
];

// Shows the currentword to the user
function updateWord() {
    word = "";
    for (character of currentWord) {
        //If the we encounter empty character, we ignore whatever comes after
        if(character == "") {
            break;
        }
        word += character;
    }
    //Display the word using element designated in the stat box
    $("#currentWord span")[0].innerHTML = "Current Word: " + word;

    // It user placed at least one tile on the board, we enable the nextword button
     if(word.length) {
         $('#NextWord').prop('disabled', false);
    }
}

// Calculate the current remaining tiles
function updateRemainingTile() {
    remainingTiles = 0;
    for (tile of tiles) {
        remainingTiles += tile.remaining;
    }
    // Display the remaining tile number to user
    $("#remainingTiles span")[0].innerHTML = "Remaining Tiles: " + remainingTiles.toString();
}

function documentReady() {
    // Intialize  popup dialog with following parameters
    $("#Prompt").dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        dialogClass: 'no-close',
        maxHeight: 400,
        width: 635,
        title: "Choose a letter for blank tile"
    });

    // Empty the tile rack if anything is there and print 7 tiles to start the game
    $("#tileHolder").empty();
    printTiles(7);

    // Intialize the scrabble board to accept the tiles
    $("#Dropzone img").droppable({
        drop: function(event, ui) {
            tileDropped(event, ui);
            return false;
        }
    });

    // Only enable the first square as droppable and disable the rest
    $("#Dropzone img").droppable('disable');
    $("#pos1").droppable('enable');
}

// Show the popup diablog when the user encounters the blank tile
function PromptDialogue(ui) {
    $("#Prompt").empty();
    $("#Prompt").dialog('open');

    // Show all images of letter tiles
    for (tile of tiles) {
        if (tile.letter == "_") { break; }
        var img = "<img src=" + tile.img + "id = '" + tile.letter + "' class='tile' data-position=''>";
        $("#Prompt")[0].innerHTML += img;
    }

    // If the user clicks any of the tiles in the dialog box, we update the img src and id
    $("#Prompt img").click(function() {
        ui.draggable[0].id = this.id;
        ui.draggable[0].src = this.src;
        var position = ui.draggable.attr("data-position");

        // We update the word with new tile
        currentWord[parseInt(position[3])-1] = ui.draggable[0].id;
        updateWord();
        $("#Prompt").dialog('close');
    });
}

// Funtion will update the neccasary variable when the tile is dropped on the scrabble board
function tileDropped(event, ui) {
    var target = event.target;
    var tile = ui.draggable[0];
    var target_id = target.id;
    var target_position = parseInt(target_id[3]);

    // If the user puts blank tile on the board, we ask them which letter they want to choose
    if (tile.id == "_") {
        PromptDialogue(ui);
    }

    // Disable the current square as droppable
    $("#"+target_id).droppable("disable");

    //Assign positional data and update the currentWord
    ui.draggable.attr("data-position", target_id);

    // Prevent the tile from being dragged away from the current square
    ui.draggable.draggable("disable");

    currentWord[target_position - 1] = tile.id;

    // Enable the next square on the board to accept the tile
    $("#pos" + String(target_position+1)).droppable('enable');

    updateWord();
}

// Return the value of the given letter
function returnValue(letter) {
    for (tile of tiles) {
        if (tile.letter == letter) {
            return tile.value;
        }
    }
}

// Calculate the score of the currrent word and added to the total score
function calculateScore() {
    var score = 0;

    // For each character in the currentWord add the value of it to the score
    for (character of currentWord) {
        if(character == "") {
            break;
        } else {
            score += returnValue(character);
        }
    }

    // If one of the tile landed on the double word, we double the score
    if (currentWord[3] != "") {
        score *= 2;
    }
    if (currentWord[5] != "") {
        score *= 2;
    }

    // Add the score of the current word to total score for the game
    totalRunningScore += score;

    if (totalRunningScore > highScore) {
        highScore = totalRunningScore;
        $("#highScore span")[0].innerHTML = "High Score: " + totalRunningScore.toString();
    }
}

function nextWord() {

    calculateScore();

    // Display the score
    $("#score span")[0].innerHTML = "Score: " + totalRunningScore.toString();

    // Disbable the droppable property for of the squares except the first one
    $('#Dropzone img').droppable('disable');
    $("#pos1").droppable('enable');

    // Print the new tiles dependening upon how many were used for the current words
    // Tiles currently located on the board will be deleted
    $("#tileHolder img[data-position != '']").remove();
    printTiles(word.length);

    // Reset the currentWord array and print it to the page
    currentWord = new Array("", "", "", "", "", "", "");
    updateWord();

    //Disable the nextWord button until at least one tile is placed on the board
    $('#NextWord').prop('disabled', true);
}

function Restart() {

    //Deletet all the Tiles
    $("#tileHolder img").remove();

    //Reset the remaining variable for each tile
    for (tile of tiles) {
        tile.remaining = tile.amount;
    }

    // Disbable the droppable property for of the squares except the first one
    $('#Dropzone img').droppable('disable');
    $("#pos1").droppable('enable');

    //Disable the nextWord button until at least one tile is placed on the board
    $('#NextWord').prop('disabled', true);

    totalRunningScore = 0;
    $("#score span")[0].innerHTML = "Score: " + totalRunningScore.toString();

    // Print new sets of tiles
    printTiles(7);
}

function printTiles(num) {

    // If no tile are remaining, we return
    if (remainingTiles == 0) {
        // If all the tile are depleted, we alert the user
        if($("#tileHolder img").length == 0) {
            alert("All the tiles depleted. Game Finished!");
        }
        return 0;
    }

    // If the number of tiles requested is more than remaining, then we only print amount we have
    if (num > remainingTiles) {
        num = remainingTiles;
    }
    
    for(var i = 0; i < num; i++) {
        var randomNum;

        // We continue generate randomNum until it finds letter that still has remaining
        do{
            randomNum = Math.floor(Math.random() * 27);
        }while(!(tiles[randomNum].remaining));

        // Print the tile on the page
        htmlText = "<img src=" + tiles[randomNum].img + "id = '" + tiles[randomNum].letter + "' class='tile' data-position=''>"
        $("#tileHolder").append(htmlText);
        tiles[randomNum].remaining--;
    }

    // Intialize all the tiles as draggable
    $("#tileHolder img").draggable({
        revert:"invalid",
        snap: "#Dropzone img",
        snapMode: "inner",
        snapTolerance: 40
    });
    updateRemainingTile();
}
