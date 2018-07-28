const validate = require('aproba')

module.exports = stringify

function stringify(obj) {
	validate('A', arguments)

	const structure = analyze()

	var body = head()
	obj.map(line => {
		var str = ''
		for (var key in structure) {
			str += line[key]
			var length = line[key].length || line[key].toString().length
			str += margin(structure[key] - length + 1)
		}
		body += str.trim() + '\n'
	})

	return body

	function analyze() {
		// name and length of fields
		var res = {}
		obj.map(line => {
			for (var key in line) {
				var type = typeof line[key],
					l = key.length

				if (type == 'number') {
					var num_len = line[key].toString().length
					if (num_len > l) l = num_len
				} else {
					if (line[key].length > l) l = line[key].length
				}

				if (!res[key]) {
					res[key] = l
				} else if (l > res[key]) res[key] = l
			}
		})
		return res
	}

	function head() {
		var str = ''
		for (var key in structure) {
			str += key
			str += margin(structure[key] - key.length + 1)
		}
		str = str.trim()
		str += '\n---\n'
		return str
	}

	function margin(length) {
		var str = ''
		for (var i = 0; i < length; i++) str += ' '
		return str
	}
}
