const validate = require('aproba')

module.exports = parse

function parse(str) {
	validate('S', arguments)

	str = str.trim().replace(/#.*\n/g, '').split('---')
	const structure = parse_header(str[0].trim())

	return str[1].trim()
		.split('\n')
		.map(line => {
			var t = {}

			const l = structure.t.length
			for (var i = 0; i < l - 1; i++) {
				t[structure.t[i]] = line.slice(structure.p[i], structure.p[i + 1]).trim()
				if (!isNaN(t[structure.t[i]])) t[structure.t[i]] = parseFloat(t[structure.t[i]])
			}
			t[structure.t[l - 1]] = line.slice(structure.p[l - 1], line.length).trim()
			if (!isNaN(t[structure.t[l - 1]])) t[structure.t[l - 1]] = parseFloat(t[structure.t[l - 1]])
			return t
		})

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
