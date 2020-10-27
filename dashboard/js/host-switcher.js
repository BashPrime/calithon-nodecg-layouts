'use strict';
$(() => {
	// Replicants
	let currentHost = nodecg.Replicant('currentHost');
	$('input[type=text]#hostName').val(currentHost);


	// Sets the host name typed in the input text box as the current host.
    $('#applyHost').click(() => {
		changeHost();
	});

	$('#hostName').keypress(event => {
		if (event.which == 13) {
			changeHost();
		}
	});

	// Change the text box to the currently active host.
    currentHost.on('change', newHost => {
		$('#hostName').val(newHost);
	});

	function changeHost() {
		let hostName = $('#hostName').val();
		nodecg.sendMessage('changeHost', hostName, err => {});
	}
});
