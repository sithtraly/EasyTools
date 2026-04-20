import { toPng } from 'html-to-image';
import '../fonts/fonts.css'
import '../styles/global.scss'

import $ from 'jquery';

$(function () {
	const khmerNumber = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
	const khmerMonth = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]
	for (let i = 1; i <= 5; i++) {
		$(`#student-${i}-image`).on('change', function () {
			const file = (this as any).files[0]
			const reader = new FileReader()
			reader.onload = function (e) {
				$(`#show-student-${i}-image`).attr('src', e.target?.result as any)
			}
			reader.readAsDataURL(file)
		})
	}
	$('#bt-show').on('click', function () {
		($('#dialog')[0] as HTMLDialogElement).showModal()
		$('#show-grade').text($('#grade').val() as string)
		$('#show-resultFor').text($('#resultFor').val() as string)
		for (let i = 1; i <= 5; i++) {
			$(`#show-student-${i}-grade`).text($(`#student-${i}-grade`).val() + '.  ' + $(`#student-${i}`).val())
		}

		const date = new Date();
		$('#date').text(date.getDate().toString().padStart(2, '0').split('').map((d: any) => khmerNumber[parseInt(d)]).join('') + ' ')
		$('#month').text(khmerMonth[date.getMonth()] + ' ')
		$('#year').text(date.getFullYear().toString().split('').map(y => khmerNumber[parseInt(y)]).join('') + '')
	})


	$('#dialog').on('click', e => {
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


	$('#download').on('click', async function () {
		const el = $('#honor-chart')[0] as HTMLElement

		const dataUrl = await toPng(el, {
			quality: 1.0,                    // Best quality
			pixelRatio: 3,                   // Sharp / retina quality (you can use 2 or 4)
			backgroundColor: '#ffffff',      // White background
			cacheBust: true,                 // Helps with external images if any
			skipFonts: false,                // Keep custom fonts if used
		})

		const link = document.createElement('a')
		link.download = 'honor-chart-' + new Date().getTime() + '.png'
		link.href = dataUrl
		link.click();
		($('#dialog')[0] as HTMLDialogElement).close()
	})
})