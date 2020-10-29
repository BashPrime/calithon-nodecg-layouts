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
	`<p class="is-single-line is-text-centered">Donate at <span style="color: #725dc6;">donate.tiltify.com/@calithon/calithon-spooktacular</span></p>`
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
		setOmnibarHtml(`<p class="is-multiline is-text-centered">ON DECK: ${run.game.toUpperCase()}</p>
		<p class="is-multiline is-text-centered">${run.category} by ${players}</p>`);
	}

	function getRandomUpcomingRun(run, excludeRun, numHours = 12) {
		// Return null if the array is empty or not defined
		if (!runDataArray || runDataArray.length) return null;

		// If run is defined (usually the active run), pick an upcoming run within numHours ahead of it and display it
		if (run) {
			let runCandidates = runDataArray.value.filter(runData => {
				const maxScheduledS = run.scheduledS + (numHours * 3600);

				// Don't include runs without categories to filter out setup blocks
				if (!runData.category) return false;

				// Only get runs after the current run, within the numHours threshold
				return runData.scheduledS > run.scheduledS && runData.scheduledS <= maxScheduledS;
			});

			// We don't want to potentially display the same run as the one last displayed,
			// so we pass in the previous displayed run as excludeRun
			// however, excludeRun is overridden if there is only one run left to display
			if (runCandidates.length === 1) {
				return runCandidates[0];
			}

			// actually handle excludeRun
			if (excludeRun) {
				runCandidates = runCandidates.filter(runData => runData.id !== excludeRun.id);
			}

			return runCandidates[getRandomInt(0, runCandidates.length)];
		}
	}

	function runTickerText() {
		let index = 0;
		let count = OMNIBAR_CONTENT.length - 1;
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

			if (count > 0 && (!upcomingRun || !runDataActiveRun || Math.random() <= 0.55)) {
				index = (index < OMNIBAR_CONTENT.length - 1) ? index + 1 : 0;
				count -= 1;
				setOmnibarHtml(OMNIBAR_CONTENT[index]);

				if (displayContent) {
					displayContent = false;
				}
			} else {
				displayContent = true; // force next iteration to display regular content
				count = OMNIBAR_CONTENT.length;
				previousDisplayedRun = upcomingRun;
				displayUpcomingRun(previousDisplayedRun);
			}
		}, 15000);
	}
});
