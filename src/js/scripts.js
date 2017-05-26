(function () {
    'use strict';

    // get current user date
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    // calculate initial angles for all clock hands
    var secondsAngle = seconds * 6;
    var minuntesAngle = minutes * 6;
    var hoursAngle = 0.5 * (60 * hours + minutes);

    // get DOM elements for the clock hands
    var $secondsHand = document.querySelector('.js-seconds');
    var $minutesHand = document.querySelector('.js-minutes');
    var $hoursHand = document.querySelector('.js-hours');

    /**
     * Rotate animation
     *
     * @param $hand
     * @param angle
     */
    function rotateAnimation($hand, angle) {
        // rotate the DOM element with the specified angle
        $hand.style.msTransform = 'translate(-50%, -50%) rotate(' + angle + 'deg)';
        $hand.style.MozTransform = 'translate(-50%, -50%) rotate(' + angle + 'deg)';
        $hand.style.webkitTransform = 'translate(-50%, -50%) rotate(' + angle + 'deg)';
        $hand.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'deg)';
    }

    /**
     * Set initial position for clock hand
     *
     * @param $hand
     * @param angle
     */
    function setInitPosition($hand, angle) {
        // move the clock hand to the initial position
        rotateAnimation($hand, angle);

        // save rotation angle into data attribute
        $hand.setAttribute('data-angle', angle);
    }

    /**
     * Move clock hand
     *
     * @param $hand
     * @param position
     * @param delay
     * @param moveBeforeTimer
     */
    function moveHand($hand, position, delay, moveBeforeTimer) {
        // ger name & angle attributes for hand
        var angle = parseInt($hand.getAttribute('data-angle'));
        var handName = $hand.getAttribute('data-name');

        // set bool for moving the hand before the timer starts
        var moveBeforeTimer = moveBeforeTimer ? moveBeforeTimer : false;

        // update angle if clock hand is moved without delay
        angle += moveBeforeTimer ? position : 0;

        // rotate clock hand right away
        moveBeforeTimer && rotateAnimation($hand, angle);

        // set loop to move the clock hand
        setInterval(function() {
            // increase angle on each step
            angle += position;

            // rotate clock hand after the delay
            rotateAnimation($hand, angle);
        }, delay);
    }

    /**
     * Move minutes & hours hands after 60s
     */
    function autoMoveHands() {
        // get angle for seconds hand
        var angle = parseInt($secondsHand.getAttribute('data-angle'));

        // calculate remaining time until 1st minute
        var delay = (360 - angle) / 6 * 1000;

        // start move for minutes & hours when
        // when the first 60s are up
        setTimeout(function() {
            // trigger move for minutes hand
            // it will move 6deg each minute
            moveHand($minutesHand, 6, 60000, true);

            // trigger move for hours hand
            // it will move 0.5deg each minute
            moveHand($hoursHand, 0.5, 60000, true);
        }, delay);
    }

    /**
     * Init clock
     */
    function init() {
        // set initial position for all clock hands
        setInitPosition($secondsHand, secondsAngle);
        setInitPosition($minutesHand, minuntesAngle);
        setInitPosition($hoursHand, hoursAngle);

        // start the move for the seconds hands
        // it will move 6deg each second
        moveHand($secondsHand, 6, 1000);

        // start the move for the minutes & hours hands
        autoMoveHands();
    }
    
    init();
})();