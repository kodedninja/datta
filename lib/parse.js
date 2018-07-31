const validate = require('aproba')

module.exports = parse

function parse(str, limit) {
	validate('S|SN', arguments)

	str = str.trim().replace(/#.*\n/g, '').split('---')

	const structure = parse_header(str[0].trim())

	var arr = str[1].trim().split('\n'),
		res = [],
		length = limit || arr.length

	for (var j = 0; j < length; j++) {
		var line = arr[j],
			t = {}

		const l = structure.t.length - 1
		for (var i = 0; i < l; i++) {
			t[structure.t[i]] = line.slice(structure.p[i], structure.p[i + 1]).trim()
			if (t[structure.t[i]] !== '' && !isNaN(t[structure.t[i]])) t[structure.t[i]] = parseFloat(t[structure.t[i]])
		}
		t[structure.t[l]] = line.slice(structure.p[l], line.length).trim()
		if (t[structure.t[l]] !== '' && !isNaN(t[structure.t[l]])) t[structure.t[l]] = parseFloat(t[structure.t[l]])
		res.push(t)
	}

	return res

	function parse_header(header) {
		var positions = [],
			words = [],
			s = -1, e = 0

		const l = header.length
		for (var i = 0; i < l - 1; i++) {
			if (header[i] != ' ') {
				if (s == -1) s = i
				e = i
			} else {
				var w = header.slice(s, e + 1)
				if (w.length > 0) {
					words.push(w)
					positions.push(s)
				}
				s = -1
			}
		}
		words.push(header.slice(s, e + 2))
		positions.push(s)

		return {t: words, p: positions}
	}
}
