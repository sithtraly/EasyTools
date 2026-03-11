import '../fonts/fonts.css'
import '../styles/global.scss'
import $ from 'jquery'
import { newTag } from '../helpers/tag.helper'
import { exportCsv } from '../helpers/csv.help'
import { currentDate, currentTime } from '../helpers/datetime.helper'

var result: any

$(function () {
	const scores: any = {
		'150': [135, 120, 105, 90, 75],
		// '125': [],
		'100': [60, 80, 70, 60, 50],
		// '75': [],
		'50': [45, 40, 35, 30, 25],
		'38': [34, 30, 27, 23, 19],
		'37': [33, 30, 26, 22, 18],
		'25': [23, 20, 17, 15, 13],
	}

	const maxScore = $('#maxScore')
	Object.keys(scores).forEach(v => {
		const tag = newTag('option', { text: v, value: v, classes: 'text-center bold' })
		maxScore.append(tag)
	})

	const studentList = $('#studentList')
	studentList.on('focusout', function () {
		const scoreList = $(this).val()
		const selectedScore = $('#maxScore').val()?.toString()
		if (!selectedScore) return alert('សូមជ្រើសរើសពិន្ទុ')
		result = scoreList?.toString().split('\n').map((row: string) => {
			const arr = row.split('\t')
			if (selectedScore) {
				const s = scores[selectedScore]
				if (arr[2] >= s[0]) arr.push('A')
				else if (arr[2] >= s[1]) arr.push('B')
				else if (arr[2] >= s[2]) arr.push('C')
				else if (arr[2] >= s[3]) arr.push('D')
				else if (arr[2] >= s[4]) arr.push('E')
				else arr.push('F')
				return arr
			}
		}) as any
		if ($('#isOrder').prop('checked')) result?.sort((a: any, b: any) => parseFloat(b[2]) - parseFloat(a[2]))
		$('#result').val(result?.map((row: any) => row?.join('\t'))?.join('\n'))

		function countGrade(grade: string) {
			const all = result.filter((row: any) => row[3] == grade)
			const girl = all.filter((row: any) => row[1] == 'ស្រី')
			return { total: all.length, girl: girl.length, grade }
		}

		const A = countGrade('A')
		const B = countGrade('B')
		const C = countGrade('C')
		const D = countGrade('D')
		const E = countGrade('E')
		const F = countGrade('F')
		const resultContianer = $('#total')
		resultContianer.empty()
		const total = result.length
		const girl = result.filter((row: any) => row[1] == 'ស្រី').length
		const tempGrade = [A, B, C, D, E, F]
		let text = ''
		tempGrade.forEach((grade, i) => {
			const c = grade.grade != 'F' ? 'class="primary"' : 'class="danger"'
			if (i == 0) {
				text += `<p class="indent-0">សរុប <span ${c}>${total}</span> នាក់ ស្រី <span ${c}>${girl}</span> នាក់</p>` +
					`\n<p class="indent-0">ជាប់ <span ${c}>${total - F.total}</span> នាក់ ស្រី <span ${c}>${girl - F.girl}</span> នាក់</p>`
			}
			text += `\n<p class="indent-0">និទ្ទេស <span ${c}>${grade.grade}</span> សរុប <span ${c}>${grade.total}</span> នាក់ ស្រី <span ${c}>${grade.girl}</span> នាក់</p>`
		})
		resultContianer.append(text)
		$('#copy').show()
		$('#downloadCsv').show()
	})

	$('#copy').on('click', function () {
		navigator.clipboard.writeText($('#total').text())
	})
	$('#downloadCsv').on('click', function () {
		const count = $('#total').text()
		const fileName = currentDate('') + '_' + currentTime('') + '.csv'
		exportCsv(fileName, 'ឈ្មោះ,ភេទ,ពិន្ទុ,និទ្ទេស\n' + result.map((row: any) => row.join(',')).join('\n') + '\n\n' + count)
	})
})