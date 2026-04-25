import $ from 'jquery'

$('dialog').on('click', e => {
	const rect = $('#dialog')[0].getBoundingClientRect();
	const clickedInDialog =
		rect.top <= e.clientY &&
		e.clientY <= rect.top + rect.height &&
		rect.left <= e.clientX &&
		e.clientX <= rect.left + rect.width;

	if (!clickedInDialog) {
		($('#dialog')[0] as HTMLDialogElement).close();
	}
})