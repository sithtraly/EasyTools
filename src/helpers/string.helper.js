export const stringPad = (str, maxLength, fillString, isStart = true) => {
	if (isStart) {
		return `${str}`.padStart(maxLength, `${fillString}`)
	}
	return `${str}`.padEnd(maxLength, `${fillString}`)
}