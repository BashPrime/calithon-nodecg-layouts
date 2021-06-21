'use strict';

$(() => {

	loadFromSpeedControl();

	function loadFromSpeedControl() {
		const speedcontrolBundle = 'nodecg-speedcontrol';

		let gameTitle = $('#game-name');
		let gameCategory = $('#category');
		let gameSystem = $('#platform');
		let gameYear = $('#year');
		let gameEstimate = $('#estimate');

		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal, oldVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		function updateSceneFields(runData) {
			let currentTeamsData = runData.teams;
			gameSystem.html(runData.system);
			gameYear.html(runData.release);
			gameEstimate.html(runData.estimate);

			fadeHtml('#game-name', runData.game, true);
			fadeHtml('#category', runData.category, true);

			$('.runner-name').text('');
			$('.runner-details').data('teamID', '');
			let i = 0;

			for (let team of currentTeamsData) {
				for (let player of team.players) {
					let pronoun;
					if (nodecg.bundleConfig.customData.useCustomPronouns) {
						pronoun = '[' + player.customData.pronouns + ']';
						if (pronoun === '[undefined]')
							pronoun = '';
					}
					else
						pronoun = '';

					const fullText = pronoun && pronoun.length ? player.name + ' ' + pronoun : player.name;
					fadeText('#runner-name' + (i + 1), fullText, true);

					$('#runner-details' + (i + 1)).data('teamID', player.teamID);
					i += 1;
				}
			}
		}
	}
});
