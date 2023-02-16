const requestLogger = function (req, res, next) {
	console.log('\n===== Incoming Request =====\n')
	console.log(`${new Date()}`)
	console.log(`${req.method} ${req.url}`)
	console.log('\n============================\n')
	next()
}

module.exports = requestLogger
