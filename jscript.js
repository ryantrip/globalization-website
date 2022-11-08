// JavaScript Document

// Global variables
var currentSelection;
var currentOffset;
var noHint = false;
var links = [''];

// Set your links here
links[0] = '<a href="index.html">Home</a>';
links[1] = '<a href="history.html">History</a>';
links[2] = '<a href="factors.html">Factors</a>';
links[3] = '<a href="sources.html">Sources</a>';
links[4] = '<a href="contact.html">Contact Us</a>';

// Builds the navigation menu
function setNav() {
    'use strict';
    var navLinks = '';
    var i;
    for ( i = 0; i < links.length; i++ ) {
        if ( i < links.length-1 ) {
        navLinks += links[i] + '&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;';
        } else {
           navLinks += links[i]
        }
    }
    document.getElementById( 'navContainer' ).innerHTML = navLinks;
}

// Returns the top and left positions of an element.
function getOffset( el ) {
    'use strict';
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

// Displays the hint to the right of the form elements.
function showHint( curElement, hintText, offset ) {
    'use strict';
    if ( noHint == false ) {
        if ( ! offset ) {
            offset = 0;
        }
        currentOffset = offset;
        var hintElement = document.getElementById( 'hint' );
        currentSelection = curElement;
        hintElement.style.display = 'inline';
        if ( curElement.id == "messageContainer" ) {
            var elementLeft = getOffset( document.getElementById( curElement.id ) ).left + document.getElementById( curElement.id ).offsetWidth + 20;
        } else {
            var elementLeft = getOffset( document.getElementById( 'blockContainer' ) ).left + document.getElementById( 'blockContainer' ).offsetWidth + 15;
        }
        var elementTop = getOffset( document.getElementById( curElement.id ) ).top - offset;
        hintElement.style.left = elementLeft + 'px';
        hintElement.style.top = elementTop + 'px';
        hintElement.innerHTML = '<img src="images/shortarrowleft.png" />&nbsp;' + hintText;
    }
}

// Updates the position of the hint element.
function updateHintPosition() {
    'use strict';
    if ( noHint == false ) {
        var hintElement = document.getElementById( 'hint' );
        if ( currentSelection.id == "messageContainer" ) {
            var elementLeft = getOffset( document.getElementById( currentSelection.id ) ).left + document.getElementById( currentSelection.id ).offsetWidth + 20;
        } else {
            var elementLeft = getOffset( document.getElementById( 'blockContainer' ) ).left + document.getElementById( 'blockContainer' ).offsetWidth + 15;
        }
        var elementTop = getOffset( document.getElementById( currentSelection.id ) ).top - currentOffset;
        hintElement.style.left = elementLeft + 'px';
        hintElement.style.top = elementTop + 'px';
    }
}

// Valides each element in the form, and returns element-specific errors to the user if they don't pass (both graphically and through text).
function formValidation() {
    'use strict';
    var passInspection = true;
    var errorContent = '';
    var firstError = '';
    var emailPatt = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    
    //Checking each element...
    if ( document.getElementById( 'contactFirstName' ).value == '' ) {
        errorContent = errorContent + '&bull;&nbsp;First name is missing.<br>';
        document.getElementById( 'contactFirstName' ).style.border = '1px solid #b52a0a';
        firstError = 'contactFirstName';
        passInspection = false;
    } else {
        document.getElementById( 'contactFirstName' ).style.border = 'solid #2E3549 1px';
    }
    if ( document.getElementById( 'contactLastName' ).value == '' ) {
        errorContent = errorContent + '&bull;&nbsp;Last name is missing.<br>';
        document.getElementById( 'contactLastName' ).style.border = '1px solid #b52a0a';
        if (firstError == '') {
            firstError = 'contactLastName';
        }
        passInspection = false;
    } else {
        document.getElementById( 'contactLastName' ).style.border = 'solid #2E3549 1px';
    }
    if ( document.getElementById( 'contactEmail' ).value == '' ) {
        errorContent = errorContent + '&bull;&nbsp;Email is missing.<br>';
        document.getElementById( 'contactEmail' ).style.border = '1px solid #b52a0a';
        if (firstError == '') {
            firstError = 'contactEmail';
        }
        passInspection = false;
    } else if ( emailPatt.test( document.getElementById( 'contactEmail' ).value) == false ) {
        errorContent = errorContent + '&bull;&nbsp;The email address is invalid.<br>';
        document.getElementById( 'contactEmail' ).style.border = '1px solid #b52a0a';
        if (firstError == '') {
            firstError = 'contactEmail';
        }
        passInspection = false;
    } else {
        document.getElementById( 'contactEmail' ).style.border = 'solid #2E3549 1px';
    }
    if ( document.getElementById( 'contactPhone' ).value != '' && document.getElementById( 'contactPhone' ).value.replace(/[^0-9]/g, '').length != 10 ) {
        errorContent = errorContent + '&bull;&nbsp;Invalid phone number.<br>';
        document.getElementById( 'contactPhone' ).style.border = '1px solid #b52a0a';
        if (firstError == '') {
            firstError = 'contactPhone';
        }
        passInspection = false;
    } else {
        document.getElementById( 'contactPhone' ).style.border = 'solid #2E3549 1px';
    }   
    if ( document.getElementById( 'messageContent' ).value == '' ) {
        errorContent = errorContent + '&bull;&nbsp;Your message is missing.<br>';
        document.getElementById( 'messageContent' ).style.border = '1px solid #b52a0a';
        if (firstError == '') {
            firstError = 'messageContent';
        }
        passInspection = false;
    } else {
        document.getElementById( 'messageContent' ).style.border = 'solid #2E3549 1px';
    }
    
    // If all the elements pass inspection....
    if ( passInspection == true ) {
        var thankYou = new Audio('files/thankyou.mp3');
        thankYou.play();
        var fullName = document.getElementById( 'contactLastName' ).value + ',&nbsp;' + document.getElementById( 'contactFirstName' ).value;
        var validEmail = document.getElementById( 'contactEmail' ).value;
        var validPhone = document.getElementById( 'contactPhone' ).value.replace(/[^0-9]/g, '');
        var message = document.getElementById( 'messageContent' ).value;
        var resultsWindow = window.open( '', 'newwindow', 'toolbar=no, scrollbars=no, resizable=no, height=500, width=300, left=500, top=50' );
        resultsWindow.document.body.innerHTML = '';
	    resultsWindow.document.write( '<html><title>Results!</title><style>body { } h1 { text-align: center; }</style><body><h1>Results:</h1>');
	    resultsWindow.document.write( '<h3>Name:</h3>&nbsp;&nbsp;' + fullName);
        resultsWindow.document.write( '<h3>Email:</h3>&nbsp;&nbsp;' + validEmail);
        if ( validPhone != '' ) {
            resultsWindow.document.write( '<h3>Phone:</h3>&nbsp;&nbsp;' + validPhone);
        } else {
            resultsWindow.document.write( '<h3>Phone:</h3>&nbsp;&nbsp;None.' );
        }
        resultsWindow.document.write( '<h3>Message:</h3>&nbsp;&nbsp;' + message);
        resultsWindow.document.write( '</body></html>' );
        document.getElementById( 'errorsBlock' ).innerHTML = '';
        document.getElementById( 'hint' ).style.display = 'none';
        return false;   // For testing purposes
      //return true;

    // If the validation fails...
    } else {
        document.getElementById( 'errorsBlock' ).innerHTML = '<div name="errorsTitle" id="errorsTitle"><b>Please fix the following:</b></div>' + errorContent;
        if ( firstError != '' ) {
            if ( document.getElementById( firstError ).value == '' ) {
                document.getElementById( firstError ).focus();
            } else {
                document.getElementById( firstError ).select();
            }
        }
        updateHintPosition();
        return false;
    }
}

// Resets all form elements to their default state.
function clearAll() {
    'use strict';
    document.getElementById( 'contactFirstName' ).value = '';
    document.getElementById( 'contactLastName' ).value = '';
    document.getElementById( 'contactEmail' ).value = '';
    document.getElementById( 'contactPhone' ).value = '';
    document.getElementById( 'messageContent' ).value = '';
}

// Auto-fills the elements with predetermined entries for *testing* purposes.
function autoFill() {
    'use strict';
    document.getElementById( 'contactFirstName' ).value = 'Ryan';
    document.getElementById( 'contactLastName' ).value = 'Trip';
    document.getElementById( 'contactEmail' ).value = 'email@totallynotrealtest.net';
    document.getElementById( 'contactPhone' ).value = '(555) 555-5555';
    document.getElementById( 'messageContent' ).value = "'Ello world...";
}

// Runs when the page loads.
window.onload = function ( event ) {
    'use strict';
    setNav();
    document.getElementById( 'contactFirstName' ).focus();
}

// Updates the "hint" element's position when the webpage is resized.
window.onresize = function( event ) {
    'use strict';
    updateHintPosition();
};

// Updates the "hint" element's position when the webpage is scrolled.
window.onscroll = function( event ) {
    'use strict';
    updateHintPosition();
};
