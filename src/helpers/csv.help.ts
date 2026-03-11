import $ from 'jquery'

export const exportCsv = (fileName: string, data: any) => {
	const blob = new Blob(["\uFEFF" + data], { type: 'text/csv;chartset=utf-8;' })
	const url = URL.createObjectURL(blob)

	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	link.click()
	link.remove()
	URL.revokeObjectURL(url)
}