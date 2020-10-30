'use strict';

const SPONSOR_IMGS = [
	'img/logos/Spook_Logo.png',
	'img/logos/MWSF_Logo.png',
	'img/logos/logo_transp.png',
	'img/logos/cff_logo.png'
];
let index = 0;

$(() => {
	runImages();

	$('#sponsor-img').on('load', () => {
		$('#sponsor-img').fadeIn(750);
	});

	function updateSponsorImage(imgSrc) {
		$('#sponsor-img').fadeOut(750, () => {
			setTimeout(() => {
				$('#sponsor-img').attr('src', imgSrc);
			}, 500);
		});
	}

	function incrementIndex() {
		if (index < SPONSOR_IMGS.length - 1) {
			index += 1;
		} else {
			index = 0;
		}
	}

	function runImages() {
		// Set first image
		updateSponsorImage(SPONSOR_IMGS[index]);

		setInterval(() => {
			incrementIndex();
			updateSponsorImage(SPONSOR_IMGS[index]);
		}, 20000);
	}
});
