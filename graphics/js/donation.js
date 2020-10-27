'use strict';
$(() => {
	const TILTIFY_CAMPAIGN_ID = 59855; // id for calithon stand together cmpaign
	const TILTIFY_AUTH_TOKEN = null;
	let countUp;
	let currentTotal;

	if (isOffline) {
		loadOffline();
	} else {
		if (TILTIFY_CAMPAIGN_ID && TILTIFY_AUTH_TOKEN) {
			const pollInterval = setInterval(() => loadFromTiltifyApi(), 5000); // run every 5 seconds
			loadFromTiltifyApi();
		} else {
			alert('Cannot request Tiltify API - check TILTIFY_CAMPAIGN_ID and TILTIFY_AUTH_TOKEN in donation.js');
		}
	}

	function loadOffline() {
		$('#donation-total').html('$123,456.78');
	}

	function loadFromTiltifyApi() {
		$.ajax({
			url: `https://tiltify.com/api/v3/campaigns/${TILTIFY_CAMPAIGN_ID}`,
			type: 'get',
			headers: {
				'Authorization': `Bearer ${TILTIFY_AUTH_TOKEN}`
			},
			dataType: 'json',
			success: (response) => {
				const newTotal = response.data.totalAmountRaised;

				// Only update if we get a new value from the API
				if (currentTotal !== newTotal) {
					currentTotal = newTotal;
					handleCountUp(currentTotal);
				}
			}
		});
	}

	function handleCountUp(amount) {
		if (!countUp) {
			countUp = new CountUp('donation-total', amount, amount, 2, 0.75, {
				prefix: '$'
			});
			countUp.start();
		} else {
			countUp.update(amount);
		}
	}
});
