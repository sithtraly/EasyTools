import '../fonts/fonts.css'
import '../styles/global.scss'

import $ from 'jquery';
import { currentMonth, currentYear, displayDate } from '../helpers/datetime.helper';
import { getLunarDate } from '../helpers/khmercalendar.js';
import { numberLatinToKhmer } from '../helpers/number.helper.js';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

$(function () {
	const year = currentYear()
	if (currentMonth() >= 10) $('#study-year').val(year + '-' + (year + 1))
	else $('#study-year').val((year - 1) + '-' + year);

	for (let i = 1; i <= 7; i++) {
		$('#ko-' + i + '-image').on('change', function () {
			const file = (this as any).files[0]
			const reader = new FileReader()
			reader.onload = (e) => {
				$('.ko-' + i + '-image').attr('src', (e.target?.result as any))
			}
			reader.readAsDataURL(file)
		})
	}

	$('#view').on('click', function () {
		($('#dialog')[0] as HTMLDialogElement).showModal()

		const people = ($('#names').val() as any).split('\n').map((row: string) => row.split('\t'))
		$('.show-grade-number').text($('#grade-number').val() + '')
		$('.show-grade-text').text($('#grade-text').val() + '')
		people.forEach((person: any, i: number) => {
			const [call, ...name] = person[0].split(' ')
			$('.ko-' + (i + 1) + '-name0').text(call + ' ')
			$('.ko-' + (i + 1) + '-name').text(name.join(' '))
			$('.ko-' + (i + 1) + '-gender').text(person[1])
			$('.ko-' + (i + 1) + '-job').text(person[2])
			$('.ko-' + (i + 1) + '-phone').text(numberLatinToKhmer(person[3]))
		})
		$('.show-study-year').text(numberLatinToKhmer($('#study-year').val() + ''))

		$('#lunarDate').text(getLunarDate())
	});


	// ($('#dialog')[0] as HTMLDialogElement).showModal()

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
	$('#normalDate').text(displayDate())

	$('.cl6ose-dialog').on('click', e => {
		($('#dialog')[0] as HTMLDialogElement).close()
	})

	$('#download').on('click', async (e) => {
		$('#download').html('<div class="px-5"><div class="loader"></div></div>')
		$('#download').prop('disabled', true);
		const pdf = new jsPDF({
			unit: 'px',
			format: 'A4',
			compress: true,
		})
		const pages = document.querySelectorAll('.a4')
		for (let i = 0; i < pages.length; i++) {
			const imgData = await toPng(pages[i], {
				pixelRatio: 2,                   // Sharp / retina quality (you can use 2 or 4)
				quality: 1,
			})
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			if (i > 0) pdf.addPage()
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
		}
		pdf.save('kokothor-' + new Date().getTime() + '.pdf')
		$('#download').prop('disabled', false);
		$('#download').text('ទាញយក')
	})
})