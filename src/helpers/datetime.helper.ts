import { khmerNumber, numberLatinToKhmer } from "./number.helper"

const khmerDays = ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"]
const khmerMonths = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]

const combinator = (seperator: string, ...arr: string[] | number[]) => {
	return arr.join(seperator)
}

export const currentYear = (date = Date.now()): number => {
	const d = new Date(date)
	return d.getFullYear()
}


export const currentMonth = (date = Date.now()): number => {
	const d = new Date(date)
	return d.getMonth() + 1
}

export const currentDay = (date = Date.now()): number => {
	const d = new Date(date)
	return d.getDate()
}

export const currentDayText = (date = Date.now()): string => {
	const d = new Date(date)
	return khmerDays[d.getDate()]
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

export const displayDate = (date = Date.now()) => {
	return `ថ្ងៃទី ${numberLatinToKhmer(currentDay(date).toString().padStart(2, '0'))} ខែ${khmerMonths[currentMonth(date) - 1]} ឆ្នាំ ${numberLatinToKhmer(currentYear(date))}`
}