var wait = 1;
var min = 0;
var sec = 0;
var hrs = 0;
var openlist = [];
var moves = 1;
var stars = 3;
var newCard = [];
var newno = 0;
var newnumber = 0;
var newlist = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];




$('.deck').each(function() {
    $(this).find('li').each(function() {
        newCard.push($(this));
    });
    $(this).find('li').find('i').each(function() {
        var newClass = $($(newCard[newno][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(newClass);
        newno++;
    });
});

// shuffle all the cards in the list 
newlist = shuffle(newlist);

$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(newlist[newnumber]);
        newnumber++;
    });
});




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// array to store open cards

remove = function(self) {
    setTimeout(function() {
        self.removeClass('show open animated woffle');
        openlist[0].removeClass('show open animated woffle');
        openlist = [];
    }, 250);
};
// function to remove property after 150 milliSecond

// function to display the clicked card
opencard = function(card) {
    card.on('click', function() {
        wait = 0;
        $('section .moves').html(moves);
        if (openlist.length % 2 === 0) {
            $(this).addClass('show open animated woffle');
            openlist.push($(this));
            $(this).off('click');
        } else if (openlist.length != 0) {
            $(this).addClass('show open animated woffle');
            var self = $(this);
            for (var j = 0; j < openlist.length; j++) {
                if ((openlist[j].find('i').attr('class')) === (self.find('i').attr('class'))) {
                    self.removeClass('animated woffle');
                    self.addClass('show match animated tada');
                    openlist[j].removeClass('animated woffle');
                    openlist[j].addClass('show match animated tada');
                    //console.log('match');
                    //openlist.push(self);
                    $(this).off('click');
                    openlist = [];
                    moves++;
                    break;
                } else {
                    self.addClass('show open animated woffle');
                    remove(self);
                    openlist[0].on('click', opencard(openlist[0]));
                    moves++;
                    //console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {
                    //$(this).find('li').hide();
                    swal({
                        type: 'success',
                        title: 'Congrats.You did an amanzing job!.',
                        text: 'You were brave enough to complete the game in just ' + moves + ' moves and ' + stars + ' stars in just ' + hrs + ' hrs ' + min + ' minutes ' + sec + ' sec. If you liked the game and wanna play again tap the button below',
                        confirmButtonText: 'I wanna play Again',
                        confirmButtonColor: '#0eb7f7',
                        focusConfirm: true,
                        showCancelButton: true,
                        cancelButtonText: 'No Thanks',
                        cancelButtonColor: '#f7de0e',
                        allowOutsideClick: false
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        window.close();
                    });
                });
            }, 300);
            wait = 1;
            $('.stopWatch').html('0:0:0');
        }
        if (moves > 10) {
            $('#star3').hide();
            stars = 2;
        }
        if (moves > 15) {
            $('#star2').hide();
            stars = 1;
        }
    });
};

//add click listner to each card 
for (var i = 0; i < newCard.length; i++) {
    newCard[i].on('click', opencard(newCard[i]));
}

// restart button 
$('.restart').on('click', function() {
    location.reload();
});
window.onload = function() {
    setInterval(function() {
        if (wait === 0) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hrs++;
                min = 0;
                sec = 0;
            }
            $('.stopWatch').html(hrs + ':' + min + ':' + sec);
        }
    }, 1000);
};
