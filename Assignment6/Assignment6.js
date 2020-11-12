// File: Assignment6/Assignment6.js
// COMP 4610 Assignment: Using the jQuery Validation Plugin with Your Dynamic Table
// Kunj Patel, UMass Lowell Computer Science, kunj_patel@student.uml.edu
// Copyright (c) 2020 by Kunj Patel. All rights reserved. May be freely copied
// or excerpted for educational purposes with credit to the author.
// created by Kunj on 11/7/2020
// updated by Kunj on 11/11/2020 at 8:00 pm
//
// This will hadle dynamic sides of the multiplication table (jQuery added for input validation)

// Minimum and maximum bounds that should be allowed
const MINHORIZONTAL = -50;
const MAXHORIZONTAL = 50;
const MINVERTICLE = -50;
const MAXVERTICLE = 50;

// Standard error when user types value that is out of bounds described above
const OUTOFBOUNDERROR = "Please Enter a integer between -50 and 50";


function validateForm() {

// This function will check whether maximum horizontal column is greater than or equal to
// minimum horizontal column. It will diplay error if max < min.
jQuery.validator.addMethod("maxMinHorizontal", function() {
    return ($("#maxhorizontal").val() >= $("#minhorizontal").val())
}, "Maximum value must be greater than the Minimum");

// This function will check whether maximum verticle row is greater than or equal to
// minimum verticle row. It will diplay error if max < min.
jQuery.validator.addMethod("maxMinVerticle", function () {
    return ($("#maxverticle").val() >= $("#minverticle").val())
}, "Maximum value must be greater than the Minimum");


    $("#inputForm").validate({
        // Defines rules for each input box
        rules: {
            minhorizontal: {
                min: MINHORIZONTAL,
                max: MAXHORIZONTAL,
                required: true
            },
            maxhorizontal: {
                min: MINHORIZONTAL,
                max: MAXHORIZONTAL,
                required: true,
                maxMinHorizontal: true
            },
            minverticle: {
                min: MINVERTICLE,
                max: MAXHORIZONTAL,
                required: true
            },
            maxverticle: {
                min: MINVERTICLE,
                max: MAXHORIZONTAL,
                required: true,
                maxMinVerticle: true
            }
        },
        // messages to be displyed if above rule not met
        messages: {
            minhorizontal: {
                min: OUTOFBOUNDERROR,
                max: OUTOFBOUNDERROR,
                required: OUTOFBOUNDERROR
            },
            maxhorizontal: {
                min: OUTOFBOUNDERROR,
                max: OUTOFBOUNDERROR,
                required: OUTOFBOUNDERROR
            },
            minverticle: {
                min: OUTOFBOUNDERROR,
                max: OUTOFBOUNDERROR,
                required: OUTOFBOUNDERROR
            },
            maxverticle: {
                min: OUTOFBOUNDERROR,
                max: OUTOFBOUNDERROR,
                required: OUTOFBOUNDERROR
            }
        },
        // Element to use for diplaying error message
        errorElement: "span",

        // When the submit button is clicked, table will be generated if all the
        // rules are met
        submitHandler: function() {
            generateTable();
            return false;
        }
    });
}

// Generate Table
function generateTable() {
    minH = parseInt(document.getElementById("minhorizontal").value);
    maxH = parseInt(document.getElementById("maxhorizontal").value);
    minV = parseInt(document.getElementById("minverticle").value);
    maxV = parseInt(document.getElementById("maxverticle").value);

    displayColumn(minH, maxH);
    multiplicationTable(minH, maxH, minV, maxV);

    return 0;
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
    return 0;
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
    return 0;
}
