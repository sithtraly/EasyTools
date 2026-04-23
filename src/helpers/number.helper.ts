export const khmerNumber = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
export const latinNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export function numberLatinToKhmer(latinNumber: number | string) {
	return latinNumber.toString()
		.split('')
		.map(t => /[0-9]/.test(t) ? khmerNumber[parseInt(t)] : t)
		.join('')
}