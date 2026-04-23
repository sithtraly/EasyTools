const { existsSync, rmSync } = require('node:fs')

const [arg1, arg2, ...args] = process.argv

const remover = (target) => {
	try {
		if (!existsSync(target)) {
			return console.log(`target "${target}" doesn't exist`)
		}

		rmSync(target, { force: true, recursive: true, maxRetries: 3 })
		console.log(`Removed: "${target}"`)
	} catch (err) {
		console.error(err)
	}
}

args.forEach(arg => remover(arg))