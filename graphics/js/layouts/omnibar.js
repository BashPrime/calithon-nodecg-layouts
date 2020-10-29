// Omnibar functionality (primarily the ticker text)
'use strict';

const speedcontrolBundle = 'nodecg-speedcontrol';

const OMNIBAR_CONTENT = [
	`<p class="is-single-line is-text-centered">
		You are watching
		<span style="color: #725dc6;">Calithon Spooktacular</span>
	</p>`,
	`<p class="is-single-line is-text-centered">
		Calithon Spooktacular benefits the
		<span style="color: #725dc6;">California Fire Foundation</span>
	</p>`,
	`<p class="is-single-line is-text-centered">You can donate at <span style="color: #725dc6;">donate.tiltify.com/@calithon/calithon-spooktacular</span></p>`
];

$(() => {
	// Run data
	let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	let runDataArray = nodecg.Replicant('runDataArray', speedcontrolBundle);

	NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(runTickerText);

	function setOmnibarHtml(html) {
		$('#omnibar-content').fadeOut(400, () => {
			$('#omnibar-content').html(html).fadeIn(400);
		});
	}

	function displayUpcomingRun(run) {
		const players = getNamesForRun(run).join(', ');
		setOmnibarHtml(`<p class="is-multiline is-text-centered">COMING SOON: ${run.game.toUpperCase()}</p>
		<p class="is-multiline is-text-centered">${run.category} by ${players}</p>`);
	}

	function getRandomUpcomingRun(run, excludeRun, numHours = 12) {
		// Return null if the array is empty or not defined
		if (!runDataArray || runDataArray.length) return null;

		// If run is defined (usually the active run), pick an upcoming run within numHours ahead of it and display it
		if (run) {
			const runCandidates = runDataArray.value.filter(runData => {
				const maxScheduledS = run.scheduledS + (numHours * 3600);

				// Only get runs after the current run, within the numHours threshold
				return runData.scheduledS > run.scheduledS && runData.scheduledS <= maxScheduledS;
			});

			// We don't want to potentially display the same run as the one last displayed,
			// so we pass in the previous displayed run as excludeRun
			// however, excludeRun is overridden if there is only one run left to display
			if (runCandidates.length === 1) {
				return runCandidates[0];
			}

			return runCandidates.filter(runData => runData.id !== run.id)[getRandomInt(0, runCandidates.length)];
		}
	}

	function runTickerText() {
		let index = 0;
		let displayContent = false;
		let previousDisplayedRun;

		// Initially set text
		setOmnibarHtml(OMNIBAR_CONTENT[index]);

		setInterval(() => {
			let upcomingRun;
			// Get random upcoming run in advance to determine if we have any
			if (!displayContent && runDataActiveRun && runDataArray) {
				upcomingRun = getRandomUpcomingRun(runDataActiveRun.value, previousDisplayedRun, 6);
			}

			if (!upcomingRun || !runDataActiveRun || Math.random() <= 0.25) {
				index = (index < OMNIBAR_CONTENT.length - 1) ? index + 1 : 0;
				setOmnibarHtml(OMNIBAR_CONTENT[index]);

				if (displayContent) {
					displayContent = false;
				}
			} else {
				displayContent = true; // force next iteration to display regular content
				previousDisplayedRun = upcomingRun;
				displayUpcomingRun(previousDisplayedRun);
			}
		}, 5000);
	}
});
