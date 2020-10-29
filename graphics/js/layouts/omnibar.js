// Omnibar functionality (primarily the ticker text)
'use strict';

const TEXT_ITEMS = [
	'Calithon Spooktacular benefits ',
	'This benefits this charity',
	'For more info go to Baltimore'
];

$(() => {
	runTickerText();

	function setOmnibarText(text) {
		$('#omnibar-text').fadeOut(400, () => {
			$('#omnibar-text').html(text).fadeIn(400);
		});
	}

	function runTickerText() {
		let index = 0;

		// Initially set text
		setOmnibarText(TEXT_ITEMS[index]);

		setInterval(() => {
			index = (index < textItems.length - 1) ? index + 1 : 0;
			setOmnibarText(TEXT_ITEMS[index]);
		}, 10000);
	}
});
