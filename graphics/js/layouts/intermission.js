// Main run info update functionality.
'use strict';

// The bundle name where all the run information is pulled from.
const speedcontrolBundle = 'nodecg-speedcontrol';

const rotateInterval = 15000;
let rotateState = 0;

// Initialize the page.
$(() => {
  // Run data.
  let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
  let runDataArray = nodecg.Replicant('runDataArray', speedcontrolBundle);
  let currentHost = nodecg.Replicant('currentHost');

  // Get the next X runs in the schedule.
  function getNextRuns(runData, amount) {
    let nextRuns = [];
    let indexOfCurrentRun = findIndexInRunDataArray(runData);
    for (let i = 1; i <= amount; i++) {
      if (!runDataArray.value[indexOfCurrentRun + i]) {
        break;
      }
      nextRuns.push(runDataArray.value[indexOfCurrentRun + i]);
    }
    return nextRuns;
  }

  // Find array index of current run based on it's ID.
  function findIndexInRunDataArray(run) {
    let indexOfRun = -1;

    // Completely skips this if the run variable isn't defined.
    if (run) {
      for (let i = 0; i < runDataArray.value.length; i++) {
        if (run.id === runDataArray.value[i].id) {
          indexOfRun = i; break;
        }
      }
    }

    return indexOfRun;
  }

  if (isOffline) {
    loadOffline();
  }
  else {
    // Wait for replicants to load before we do anything.
    NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(loadFromSpeedControl);
  }

  function loadOffline() {
	let host = $('#host');
	host.html('KrunchyLex');

    let upNextGame = $('#up-next-game');
    let upNextInfo = $('#up-next-info');

    upNextGame.html('METROID PRIME HUNTERS');
    upNextInfo.html('Mr_Shasta');
    FixSize('#up-next-game');
    FixSize('#up-next-info');

    let onDeckGame1 = $('#on-deck-game1');
    let onDeckInfo1 = $('#on-deck-info1');

    let onDeckGame2 = $('#on-deck-game2');
    let onDeckInfo2 = $('#on-deck-info2');

    onDeckGame1.text('A HAT IN TIME');
    onDeckInfo1.text('flarebear');
    FixSize('#on-deck-game1');
    FixSize('#on-deck-info1');

    onDeckGame2.text('FIRE EMBLEM: THREE HOUSES');
    onDeckInfo2.text('Claris');
    FixSize('#on-deck-game2');
    FixSize('#on-deck-info2');
  }

  function loadFromSpeedControl() {
    // This is where the information is received for the run we want to display.
    // The "change" event is triggered when the current run is changed.
    runDataActiveRun.on('change', (newVal, oldVal) => {
      refreshNextRunsData(newVal);
    });

    runDataArray.on('change', (newVal, oldVal) => {
      refreshNextRunsData(runDataActiveRun.value);
	});

	currentHost.on('change', (newHost, oldHost) => {
    fadeHtml('#host', newHost);
	});
  }

  function refreshNextRunsData(currentRun) {
    const numUpcoming = 2;
    let nextRuns = getNextRuns(currentRun, numUpcoming);

    let upNextGame = '#up-next-game';
    let upNextInfo = '#up-next-info';

    // Next up game.
    fadeHtml(upNextGame, currentRun.game, true);
    fadeHtml(upNextInfo, getNamesForRun(runDataActiveRun.value).join(', '), true);

    // On deck games.
    let i = 0;
    for (let run of nextRuns) {
      if (i >= numUpcoming) {
        break;
      }
      let onDeckGame = '#on-deck-game' + (i + 1);
      let onDeckRunner = '#on-deck-info' + (i + 1);
      fadeHtml(onDeckGame, run.game, true);
      fadeHtml(onDeckRunner, getNamesForRun(run).join(', '), true);
      i += 1;
    }
  }
});
