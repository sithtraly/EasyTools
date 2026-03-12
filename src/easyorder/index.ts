import '../fonts/fonts.css'
import '../styles/global.scss'
import $ from 'jquery';

const targetList = $('#targetSort')
const sortList = $('#toSort')
const resultList = $('#sortResult')

function sort() {
	const sourceMapped = new Map(targetList.val()?.toString().split('\n').map((v, i) => [v, i + 1]))
	const target = sortList.val()?.toString().split('\n')?.map(row => row.split('\t'))
	target?.sort((a, b) => (sourceMapped.get(a[0]) || Infinity) - (sourceMapped.get(b[0]) || Infinity))
	resultList.val(target?.map(row => row.join('\t')).join('\n'))
}

sortList.on('focusout', sort)