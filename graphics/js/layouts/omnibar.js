// Omnibar functionality (primarily the ticker text)
'use strict';

const HTML_ITEMS = [
	`<p class="omnibar-text">
		Calithon Spooktacular benefits
		<span style="color: #6752b4;">Direct Relief</span>
	</p>`,
	`<p class="omnibar-text">Donate: <tiltify link></p>`
];

$(() => {
	runTickerText();

	function setOmnibarHtml(html) {
		$('#omnibar-content').fadeOut(400, () => {
			$('#omnibar-content').html(html).fadeIn(400);
		});
	}

	function runTickerText() {
		let index = 0;

		// Initially set text
		setOmnibarHtml(HTML_ITEMS[index]);

		setInterval(() => {
			index = (index < HTML_ITEMS.length - 1) ? index + 1 : 0;
			setOmnibarHtml(HTML_ITEMS[index]);
		}, 10000);
	}
});
