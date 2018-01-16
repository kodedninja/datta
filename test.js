const datta = require('.')

var str = `ID  NAME         EMAIL
---
000 RANDOM JOE   joe@mail.com
001 RANDOM JERRY jerry@mail.com
`

var str_c = `#
ID  NAME         EMAIL
# coommment 	.... super comment
---
# another comment
000 RANDOM JOE   joe@mail.com
# some comment
001 RANDOM JERRY jerry@mail.com
`

var obj = [ { ID: '000', NAME: 'RANDOM JOE', EMAIL: 'joe@mail.com' },
  			{ ID: '001', NAME: 'RANDOM JERRY', EMAIL: 'jerry@mail.com' } ]

test('parses the example', () => {
	expect(datta.parse(str)).toEqual(obj)
})

test('parses comments', () => {
	expect(datta.parse(str_c)).toEqual(obj)
})

test('stringifies the example', () => {
	expect(datta.stringify(obj)).toEqual(str)
})

