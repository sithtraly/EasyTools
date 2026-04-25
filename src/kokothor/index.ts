import '../fonts/fonts.css'
import '../styles/global.scss'
import '../helpers/link.helper.ts'
import '../helpers/dialog.helper.ts'

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

	const showImage = (selector: string, file: File) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			$(selector).attr('src', (e.target?.result as any))
		}
		reader.readAsDataURL(file)
		console.log(selector)
	}

	for (let i = 1; i <= 7; i++) {
		$('#ko-' + i + '-image').on('change', function () {
			const files: File[] = (this as any).files
			const filesName = []
			if (files.length > 1) {
				for (let i = 0; i < files.length; i++) {
					filesName.push(files[i].name)
				}
				filesName.sort()
				for (let i = 0; i < files.length; i++) {
					const name = filesName[i]
					for (let j = 0; j < files.length; j++) {
						if (files[j].name === name) {
							if (files[j]) {
								const dataTransfer = new DataTransfer()
								dataTransfer.items.add(files[j])
								$('#ko-' + (i + 1) + '-image')[0].files = dataTransfer.files
								showImage('.ko-' + (i + 1) + '-image', files[j])
							}
							break
						}
					}

				}
			} else {
				showImage('.ko-' + i + '-image', files[0])
			}
		})


		$('#view').on('click', function () {
			($('#dialog')[0] as HTMLDialogElement).showModal()

			const people = ($('#names').val() as any).split('\n').filter((p: string) => p.length > 0).map((row: string) => row.split('\t'))
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

		$('#normalDate').text(displayDate())

		$('.close-dialog').on('click', e => {
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
	}
})
