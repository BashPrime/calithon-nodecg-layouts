'use strict';
$(() => {
	if (isOffline) {
		loadOffline();
	} else {
		loadFromSpeedControl();
	}

	function loadOffline() {
		$('#timer').html('01:23:45');
	}

	function loadFromSpeedControl() {
		// The bundle name where all the run information is pulled from.
		var speedcontrolBundle = 'nodecg-speedcontrol';

		// JQuery selectors.
		var timerElem = $('#timer'); // timer.html

		// This is where the timer information is received.
		// The "change" event is triggered whenever the time changes or the state changes.
		var timer = nodecg.Replicant('timer', speedcontrolBundle);
		timer.on('change', (newVal, oldVal) => {
			if (newVal)
				updateTimer(newVal, oldVal);
		});

		// Sets the timer text and classes.
		function updateTimer(newVal, oldVal) {
			// Change class on the timer to change the colour if needed.
			// See the common.css file for more information.
			if (oldVal) timerElem.toggleClass('timer_' + oldVal.state, false);
			timerElem.toggleClass('timer_' + newVal.state, true);

			timerElem.html(newVal.time); // timer.html
		}
	}
});
