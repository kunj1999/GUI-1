// File: Assignment7/Assignment7.js
// COMP 4610 Assignment: Using the jQuery UI Slider and Tab Widgets
// Kunj Patel, UMass Lowell Computer Science, kunj_patel@student.uml.edu
// Copyright (c) 2020 by Kunj Patel. All rights reserved. May be freely copied
// or excerpted for educational purposes with credit to the author.
// created by Kunj on 11/17/2020
// updated by Kunj on 11/24/2020 at 8:00 pm
//
// This will create page that will display multiplication table based on slider input
// It will also allow the user to save the multiplication table

// Minimum and maximum bounds that should be allowed
const MINHORIZONTAL = -50;
const MAXHORIZONTAL = 50;
const MINVERTICLE = -50;
const MAXVERTICLE = 50;

// Standard error when user types value that is out of bounds described above
const OUTOFBOUNDERROR = "Please Enter a integer between -50 and 50";

var numberOfTabs = 1;
var currentTab = "Tab1";

// Code to add checkbox and closing icon to every tab
var removeIcon = "<span class='ui-icon ui-icon-close ui-closable-tab'></span>";
var removeCheckbox = "<input type='checkbox'>";

// slider configuration. min and max range and input box element passed as arguments
function sliderConfig(minP, maxP, TextBoxElement) {

    // configuration for the slider
    var retVal = {min: minP, max: maxP, step: 1,
                slide: function(event, ui) {
                    $("#"+TextBoxElement).val(ui.value); // updates input box based on slider position
                    $("#inputForm").submit();
                }};
    return retVal;
}

// This function will be called when the webpage is loaded
function documentReady() {

    validateForm();

    $("#myTabs").tabs();
    // Applies the min and max parameters and ties input tag to the slider
    $("#minHorz").slider(sliderConfig(MINHORIZONTAL, MAXHORIZONTAL, "minhorizontal"));
    $("#maxHorz").slider(sliderConfig(MINHORIZONTAL, MAXHORIZONTAL, "maxhorizontal"));
    $("#minVert").slider(sliderConfig(MINVERTICLE, MAXVERTICLE, "minverticle"));
    $("#maxVert").slider(sliderConfig(MINVERTICLE, MAXVERTICLE, "maxverticle"));

    //update slider based on input
    $("#minhorizontal").change( function() {
        $("#minHorz").slider("value", $(this).val());
        $("#inputForm").submit();
    });

    $("#maxhorizontal").change( function() {
        $("#maxHorz").slider("value", $(this).val());
        $("#inputForm").submit();
    });

    $("#minverticle").change( function() {
        $("#minVert").slider("value", $(this).val());
        $("#inputForm").submit();
    });

    $("#maxverticle").change( function() {
        $("#maxVert").slider("value", $(this).val());
        $("#inputForm").submit();
    });

    // We generate new Table with whatever the current parameters are
    // This will convey to the viewer that website is working properly
    $("#inputForm").submit();

    // Bind the current tab's closing icon to a function callback
    close_tab();
}

// Set currentTab as active
function set_current_tab_active() {
    // I found the following trick to set active tab at the link below
    // https://stackoverflow.com/questions/21860658/how-to-set-active-tab-in-jquery-ui
    $("a[href='#" + currentTab + "']").click();
}

// check if tabs are deleted
// Return true if empty
function check_for_empty() {

    // Check if all of the tabs are deleted
    if (document.getElementById("Tablist").childElementCount != 0) {
        return false;
    }
    return true;
}

// Set the last tab added as active
function setLastAddedTabAsActive() {
    var ulElement = document.getElementById("Tablist").lastElementChild;
    currentTab = ulElement.getAttribute("aria-controls");

    set_current_tab_active();
}

function close_tab() {
    $(".ui-closable-tab").on("click", function() {

        // Get id and remove it. This will remove the content of the tabs
        var tabID = this.parentNode.children[0].hash;
        $(tabID).remove();

        // Remove list element
        var parentNode = this.parentNode;
        parentNode.remove();

        // check if this was the last tab
        if(!check_for_empty()) {

            // This handles the special case when the user closes the current tab
            // We set the last added tab as active
            setLastAddedTabAsActive();
        }
    });
}

// Delete tabs that have checkbox checked
function deleteSelectedTabs() {
    // Iterate through all of the tab elements
    $('#Tablist > li').each(function () {
        var liElement = $(this)[0];

        // If the checkbox is selected delete that tab
        if(liElement.children[2].checked) {
            $(liElement.children[0].hash).remove();
            liElement.remove();
        }
    });

    // If tabs still exist, set the last added tab as active
    if(!check_for_empty()) {
        setLastAddedTabAsActive();
    }
}

// Delete all the tabs
function deleteAllTabs() {
    // Iterate through all of the tab elements and delete them
    $('#Tablist > li').each(function () {
        var liElement = $(this)[0];
        $(liElement.children[0].hash).remove();
        liElement.remove();
    });
}

function newTab() {
    // Get the element containing the list of tabs
    var ul = document.getElementById("Tablist");

    // Increment the tab count and assemble the appropriate title for it
    numberOfTabs++;
    currentTab = "Tab" + numberOfTabs.toString();

    // contruct new tab html text
    var newTab = "<li><a href='#"+ currentTab + "'>" + currentTab + "</a>" + removeIcon + removeCheckbox + "</li>";

    // Append new tab to the list
    ul.innerHTML += newTab;

    // Bind the current tab's closing icon to a function callback
    close_tab();

    // Construct body of the current tab and link it appropriatly
    var div = document.getElementById("tabBody");
    var newDiv = "<div id='" + currentTab + "'></div>";

    // Push the new tab body to html
    div.innerHTML += newDiv;

    // Refresh the tabs
    $("#myTabs").tabs("refresh");

    // Sumbit the form such that new tab will open with multiplication table
    $("#inputForm").submit();

    // Deselect all tabs. This fixed a problem I was having where multiple tabs selected
    $(".ui-tabs-active").removeClass("ui-state-active").removeClass("ui-tabs-active");

    // Set the current tab active and refresh all the tabs
    set_current_tab_active();
    $("#myTabs").tabs("refresh");
}

function validateForm() {

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

    // Get the input values
    minH = parseInt(document.getElementById("minhorizontal").value);
    maxH = parseInt(document.getElementById("maxhorizontal").value);
    minV = parseInt(document.getElementById("minverticle").value);
    maxV = parseInt(document.getElementById("maxverticle").value);

    // Local variable for multiplication table html text
    var texthtml = "";

    // If min > max, we switch it.
    // In my previous assignments I rejected such parameters, but this assignment will accept it.
    if(minH > maxH) {
        var temp = minH;
        minH = maxH;
        maxH = temp;
    }

    if (minV > maxV) {
        var temp = minV;
        minV = maxV;
        maxV = temp;
    }

    // Acquires the html text that will display the multiplication table
    texthtml = displayColumn(minH, maxH);
    texthtml += multiplicationTable(minH, maxH, minV, maxV);

    // We only display table if there exists at least one tab
    if (!check_for_empty()) {

        // Push html table text to current div for current tab
        document.getElementById(currentTab).innerHTML = texthtml;

        // Update the title of the tab to accuratly represent the table it holds
        $("a[href='#" + currentTab + "']")[0].innerHTML =
            minH.toString() + "*" + maxH.toString() + " by " + minV.toString() + "*" + maxV.toString();

        //If the user is on some other tab, we switch it to current if he/she moves slider or changes input value
        set_current_tab_active();
    }
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

    multiplication += "</table></div>"

    // Return the string text containing table
    return multiplication;
}

function displayColumn(minH, maxH) {
    //Define row in a table
    var columnDisplay = "<div class='responsive center'><table id='displayTable'><tr>";

    //This will create empty cell on top left to make it look neat.
    columnDisplay += "<th></th>"

    // Displays all the values from min to max
    for(var x = minH; x <= maxH; x++)
    {
        columnDisplay += "<th>" + String(x) + "</th>";
    }
    columnDisplay += "</tr>";

    // Return partial table html text
    return columnDisplay;
}
