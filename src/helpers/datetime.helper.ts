const combinator = (seperator: string, ...arr: string[] | number[]) => {
	return arr.join(seperator)
}

export const currentDate = (seperator: string = '') => {
	const date = new Date()
	const y = date.getFullYear().toString()
	const m = (date.getMonth() + 1).toString().padStart(2, '0')
	const d = date.getDate().toString().padStart(2, '0')
	return combinator(seperator, y, m, d)
}

export const currentTime = (seperator: string = '') => {
	const datetime = new Date()
	const h = datetime.getHours().toString().padStart(2, '0')
	const m = datetime.getMinutes().toString().padStart(2, '0')
	const s = datetime.getSeconds().toString().padStart(2, '0')
	const ms = datetime.getMilliseconds()
	return combinator(seperator, h, m, s + '.' + ms)
}