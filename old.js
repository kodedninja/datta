const fs = require('fs');

function filter(arr) {
	let res = [];
	arr.forEach(function(el) {
		el = el.trim();
		if (el && el.length != 0) res.push(el);
	});
	return res;
}

function destructor(c) {
	for (let i = 0; i < c.length; i++) {
		c[i] = parseInt(c[i]);
	}
	return function(content) {
		let res = [];
		content.forEach(function(line) {
			let line_res = [];
			line_res.push(line.slice(c[0], c[1] - 1));
			for (let i = 1; i < c.length - 1; i++) {
				line_res.push(line.slice(c[i] - 1, c[i + 1] - 1).trim());
			}
			line_res.push(line.slice(c[c.length - 1] - 1, line.length).trim());
			res.push(line_res);
		});
		return res;
	}
}

function singular(header, data) {
	let res = [];
	data.forEach(function(line) {
		let json = {};
		for (let i = 0; i < header.length; i++) {
			json[header[i]] = line[i];
		}
		res.push(json);
	});
	return res;
}

function writeHead(head) {
	let res = '';
	for (let key in head) {
		res += key + ' = ' + head[key] + '\n';
	}
	return res;
}

function writeStruct(structure) {
	let res = '';

	for (let i = 0; i < structure.length - 1; i++) {
		let string = structure[i].toString();
		let sep = separation(string, structure[i + 1] - structure[i]);
		res += string + sep;
	}
	res += structure[structure.length - 1].toString();

	return res;
}

function writeHeader(structure, header) {
	let res = '';

	for (let i = 0; i < header.length - 1; i++) {
		let sep = separation(header[i], structure[i + 1] - structure[i]);
		res += header[i] + sep;
	}
	res += header[header.length - 1];

	return res;
}

function writeData(structure, data) {
	let res = '';

	data.forEach(function(d) {
		for (let i = 0; i < d.length - 1; i++) {
			let a = structure[i] == 0;
			let sep = separation(d[i], structure[i + 1] - structure[i] + a);
			res += d[i] + sep;
		}
		res += d[d.length - 1] + '\n';
	});

	return res;
}

function separation(string, size) {
	let length = size - string.length + 1;
	return new Array(length).join(' ');
}

module.exports = {
	read: function(path) {
		let text = fs.readFileSync(path, 'utf8');
		let split = text.split('\n{DATA}\n');
		let head = split[0],
			body = split[1],
			head_res = {};

		// head
		{
			let lines = head.split('\n');
			lines = filter(lines);

			lines.forEach(function(line) {
				let split = line.split(' = ');
				head_res[split[0]] = split[1];
			});
		}

		// body
		{
			let lines = body.split('\n');
			lines = filter(lines);

			let structure = filter(lines[0].split(' '));
			let header = filter(lines[1].split(' '));
			let content = lines.slice(2, lines.length)

			let data = destructor(structure)(content);

			return {head: head_res, structure: structure, header: header, data: data};
		}
	},
	singular: function(header, data) {
		let res = [];
		data.forEach(function(line) {
			let json = {};
			for (let i = 0; i < header.length; i++) {
				json[header[i]] = line[i];
			}
			res.push(json);
		});
		return res;
	},
	write: function(path, obj) {
		let body = writeHead(obj.head);
		body += '\n{DATA}\n\n';
		body += writeStruct(obj.structure);
		body += '\n\n';
		body += writeHeader(obj.structure, obj.header);
		body += '\n\n';
		body += writeData(obj.structure, obj.data);
		fs.writeFileSync(path, body);
	}
}
