// File: Assignment5/Assignment5.js
// COMP 4610 Assignment: Creating an Interactive Dynamic Table
// Kunj Patel, UMass Lowell Computer Science, kunj_patel@student.uml.edu
// Copyright (c) 2020 by Kunj Patel. All rights reserved. May be freely copied
// or excerpted for educational purposes with credit to the author.
// created by Kunj on 10/25/2020
// updated by Kunj on 10/28/2020 at 8:00 pm
//
// This will hadle dynamic sides of the multiplication table


// Minimum bounds that should be allowed
const MINHORIZONTAL = -50;
const MAXHORIZONTAL = 50;
const MINVERTICLE = -50;
const MAXVERTICLE = 50;

// Standard error when user types value that is out of bounds described above
const OUTOFBOUNDERROR = "Please Enter a value between -50 and 50";


function validateForm() {
    var minHorizontal = parseInt(document.getElementById("min-horizontal").value);
    var maxHorizontal = parseInt(document.getElementById("max-horizontal").value);
    var minVerticle = parseInt(document.getElementById("min-verticle").value);
    var maxVerticle = parseInt(document.getElementById("max-verticle").value);

    // If there is an issue with user input, no need to calculate table
    if(!checkBounds(minHorizontal, maxHorizontal, minVerticle, maxVerticle)) {
        return;
    }

    // Clear the table before generating a new one.
    // Added as an extra protection
    clearTable();

    // Display the column first
    displayColumn(minHorizontal, maxHorizontal);
    // Display rest of cells
    multiplicationTable(minHorizontal, maxHorizontal, minVerticle, maxVerticle);
}

// Function will check whether the user input is within the range
// If not, function will display error to the screen
function checkBounds(minHorizontal, maxHorizontal, minVerticle, maxVerticle) {

    // This variable will indicate to the calling function on
    // whether or not to display the table.
    var retVal = true;

    // We clear all of the error message before proceading because
    // we don't want to mislead the user by displaying older errors
    clearErrorMessages();

    //Next 4 if statements will check to make sure user values are within bounds.
    if(minHorizontal < MINHORIZONTAL || isNaN(minHorizontal)) {
        document.getElementById("min-horizontal-error").innerHTML = OUTOFBOUNDERROR;
        retVal = false;
    }
    if(maxHorizontal > MAXHORIZONTAL || isNaN(maxHorizontal)) {
        document.getElementById("max-horizontal-error").innerHTML = OUTOFBOUNDERROR;
        retVal = false;
    }
    if(minVerticle < MINVERTICLE || isNaN(minVerticle)) {
        document.getElementById("min-verticle-error").innerHTML = OUTOFBOUNDERROR;
        retVal = false;
    }
    if(maxVerticle > MAXVERTICLE || isNaN(maxVerticle)) {
        document.getElementById("max-verticle-error").innerHTML = OUTOFBOUNDERROR;
        retVal = false;
    }

    //If user entered value that were out of bounds. Then, this will not execute
    if(retVal == true) {
        //If the values are within bounds, we need to make sure min < max.
        if(maxHorizontal < minHorizontal) {
            document.getElementById("max-horizontal-error").innerHTML =
                "Maximum value must be greater than the Minimum";
            retVal = false;
        }
        if(maxVerticle < minVerticle) {
            document.getElementById("max-verticle-error").innerHTML =
                "Maximum value must be greater than the Minimum";
            retVal = false;
        }
        //Returns true if all of the contidions are met
        return retVal;
    }else {
        //Returns false if values are out of bounds
        return retVal;
    }

}

function multiplicationTable(minH, maxH, minV, maxV) {
    var multiplication = "";

    for(var x = minV; x <= maxV; x++)
    {
        // This will display the multiplier
        // With this setup, it will look like a row on the left
        multiplication += "<tr>" + "<td>" + String(x) + "</td>";

        for(var y = minH; y<= maxH; y++)
        {
            // multiply the two numbers and add that between appropriate tag
            multiplication += "<td>" + String(x*y) + "</td>"
        }
        multiplication += "</tr>";
    }

    // We add to what is already displayed because column is printed
    // before this function is called.
    document.getElementById("displayTable").innerHTML += multiplication;
}

function displayColumn(minH, maxH) {
    //Define row in a table
    var columnDisplay = "<tr>";

    //This will create empty cell on top left to make it look neat.
    columnDisplay += "<th></th>"

    // Displays all the values from min to max
    for(var x = minH; x <= maxH; x++)
    {
        columnDisplay += "<th>" + String(x) + "</th>";
    }
    columnDisplay += "</tr>";

    //Push everything to html
    document.getElementById("displayTable").innerHTML = columnDisplay;
}

// This function will clear all of the error messages
function clearErrorMessages() {
    document.getElementById("min-horizontal-error").innerHTML = "";
    document.getElementById("max-horizontal-error").innerHTML = "";
    document.getElementById("min-verticle-error").innerHTML = "";
    document.getElementById("max-verticle-error").innerHTML = "";
}

// This function will simply clear table by overwriting everything inside <table> with an empty string
function clearTable() {
    document.getElementById("displayTable").innerHTML = "";
}
