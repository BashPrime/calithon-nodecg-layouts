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
	let contentIndex = 0;
	let onDeckIndex = 0;
	let onDeckRuns;

	NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(runTickerText);

	function setOmnibarHtml(html) {
		$('#omnibar-content').fadeOut(400, () => {
			$('#omnibar-content').html(html).fadeIn(400);
		});
	}

	function displayOnDeckRun(run) {
		const players = getNamesForRun(run).join(', ');
		setOmnibarHtml(`<p class="is-multiline is-text-centered">ON DECK: ${run.game.toUpperCase()}</p>
		<p class="is-multiline is-text-centered">${run.category} by ${players}</p>`);
	}

	function getOnDeckRuns(run, numRuns = 3) {
		let nextRuns = [];

		// If run is defined (usually the active run), get the on deck runs
		if (run && runDataArray) {
			let currentRunIndex = runDataArray.value.findIndex(runData => runData.id === run.id);

			for (let i = 1; i <= numRuns; i++) {
				if (!runDataArray.value[currentRunIndex + i]) {
					break;
				}
				nextRuns.push(runDataArray.value[currentRunIndex + i]);
			}
		}

		return nextRuns;
	}

	function runTickerText() {
		// The "change" event is triggered when the current run is changed.
		runDataActiveRun.on('change', (newVal, oldVal) => {
			onDeckRuns = getOnDeckRuns(newVal);
			onDeckIndex = 0;
		});

		runDataArray.on('change', (newVal, oldVal) => {
			onDeckRuns = getOnDeckRuns(runDataActiveRun.value);
			onDeckIndex = 0;
		});

		let contentCount = OMNIBAR_CONTENT.length - 1;
		let forceDisplayContent = false;

		// Initially set text
		setOmnibarHtml(OMNIBAR_CONTENT[contentIndex]);

		setInterval(() => {
			if (contentCount > 0 && (forceDisplayContent || Math.random() <= 0.65)) {
				// Display static omnibar text
				contentIndex = (contentIndex < OMNIBAR_CONTENT.length - 1) ? contentIndex + 1 : 0;
				contentCount -= 1;
				setOmnibarHtml(OMNIBAR_CONTENT[contentIndex]);

				if (forceDisplayContent)
					forceDisplayContent = false;
			} else {
				// Display an on deck run
				forceDisplayContent = true; // force next iteration to display static content
				contentCount = OMNIBAR_CONTENT.length; // reset static content count
				displayOnDeckRun(onDeckRuns[onDeckIndex]);
				onDeckIndex = (onDeckIndex < onDeckRuns.length - 1) ? onDeckIndex + 1 : 0;
				forceDisplayContent = true;
			}
		}, 15000);
	}
});
