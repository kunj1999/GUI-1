
const MINHORIZONTAL = -50;
const MAXHORIZONTAL = 50;
const MINVERTICLE = -50;
const MAXVERTICLE = 50;

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


}

// Function will check whether the user input is within the range
// If not, function will display error to the screen
function checkBounds(minHorizontal, maxHorizontal, minVerticle, maxVerticle) {
    var retVal = true;

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
            console.log("1 must be greater than or equal to minValue");
            retVal = false;
        }
        if(maxVerticle < minVerticle) {
            console.log("2 must be greater than or equal to minValue");
            retVal = false;
        }
        //Returns true if above conditions met.
        return retVal;
    }else {
        //Returns false if above conditions not satisfied
        return retVal;
    }

}

function clearErrorMessages() {
    document.getElementById("min-horizontal-error").innerHTML = "";
    document.getElementById("max-horizontal-error").innerHTML = "";
    document.getElementById("min-verticle-error").innerHTML = "";
    document.getElementById("max-verticle-error").innerHTML = "";
}
