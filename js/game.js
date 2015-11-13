var bigship_pos, smallship_1_pos, smallship_2_pos, your_score = 0,
    cpu_score = 0,
    clicked_already = [1000];

$(document).ready(function() {

    // selects random columns
    var c_1 = ran(1, 3);
    var c_2 = ran(4, 6);
    var c_3 = ran(7, 10);

    // adds column to an array
    var cols = [c_1, c_2, c_3];

    // suffles values to have ships go into any column
    shuffle(cols);

    // sets pos for ships
    bigship = ran(41, 90);
    smallship_1 = ran(31, 90);
    smallship_2 = ran(31, 90);

    // rounds up values to help spread them
    // also stops overlaps (hopefully)
    bigship = cols[0] + (Math.ceil(bigship / 10) * 10);
    smallship_1 = cols[1] + (Math.ceil(smallship_1 / 10) * 10);
    smallship_2 = cols[2] + (Math.ceil(smallship_2 / 10) * 10);

    // highlights ships on screen 
    placeBigShip(bigship);
    placeSmallShip_1(smallship_1);
    placeSmallShip_2(smallship_2);

    // adds ship pos to global var
    bigship_pos = [bigship, bigship - 10, bigship - 20, bigship - 30, bigship - 40];
    smallship_1_pos = [smallship_1, smallship_1 - 10, smallship_1 - 20, smallship_1 - 30];
    smallship_2_pos = [smallship_2, smallship_2 - 10, smallship_2 - 20, smallship_2 - 30];

    // logs ships for debugging
    console.log(bigship_pos);
    console.log(smallship_1_pos);
    console.log(smallship_2_pos);
});

$("button").click(function() {

	// this is the element clicked
    var clicked = parseInt(this.id);

    // checks if clicked element is a ship
    if (isInArray(clicked, bigship_pos) ||
        isInArray(clicked, smallship_1_pos) ||
        isInArray(clicked, smallship_2_pos)) {

    	// updates ship image 

         $("#" + this.id).css({
            'background-image': 'url(' + "images/bomb.png" + ')', 
            'background-repeat': 'no-repeat',
            'background-size': '50px 50px',
            'id': 'clicked_already'
        });

        // updates your score
        your_score += 10;
    } else {

        // sets block bg to white
        $("#" + clicked).css('opacity', '0');
    }

    // a random cpu click is generated here
    var cpu_click = Math.floor(Math.random() * 100) + 1;

    // $('#' + cpu_click).click();
    // ^above line gave bugs so I have to do this a longer way...

    // this does the same thing but for the cpu
    if (isInArray(cpu_click, bigship_pos) ||
        isInArray(cpu_click, smallship_1_pos) ||
        isInArray(cpu_click, smallship_2_pos)) {


    	// updates ship image 
        $("#" + cpu_click).css({
            'background-image': 'url(' + "images/bomb.png" + ')', 
            'background-repeat': 'no-repeat',
            'background-size': '50px 50px',
            'id': 'clicked_already'
        });

        // updates cpu score
        cpu_score += 10;

    } else {

        // sets block bg to white
        $("#" + cpu_click).css('opacity', '0');
    }


    // shows who won
    if (your_score + cpu_score >= 130) {

    	if(your_score > cpu_score){
        	
        	alert('You Won');
    	}else{

        	alert('CPU Won');
    	}
    }
});

//this will hide the ships
$("#hide_ships").click(function() {

	$('button.pure-button').css("background-color", "#E6E6E6");
});

// These three functions (placeBigShip, placeSmallShip_1 & placeSmallShip_2)
// highlight the ships, this can be stopped on the index page they're shown for debugging/testing
function placeBigShip(v) {

    for (var i = 0; i < 5; i++) {

        $('#' + v).css("background-color", "pink");
        v -= 10;
    }
}

function placeSmallShip_1(v) {

    for (var i = 0; i < 4; i++) {

        $('#' + v).css("background-color", "blue");
        v -= 10;
    }
}

function placeSmallShip_2(v) {

    for (var i = 0; i < 4; i++) {

        $('#' + v).css("background-color", "green");
        v -= 10;
    }
}

// gets random numbers from min max
function ran(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}

// shuffles an array
function shuffle(o) {

    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// checks if value is inside of an array
function isInArray(value, array) {

    return array.indexOf(value) > -1;
}