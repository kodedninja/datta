const datta = require('.')

var str = `ID NAME         EMAIL
---
0  RANDOM JOE   joe@mail.com
1  RANDOM JERRY jerry@mail.com
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

var obj = [ { ID: 0, NAME: 'RANDOM JOE', EMAIL: 'joe@mail.com' },
  			{ ID: 1, NAME: 'RANDOM JERRY', EMAIL: 'jerry@mail.com' } ]

var obj_limit = [ { ID: 0, NAME: 'RANDOM JOE', EMAIL: 'joe@mail.com' } ]

test('parses the example', () => {
	expect(datta.parse(str)).toEqual(obj)
})

test('parses comments', () => {
	expect(datta.parse(str_c)).toEqual(obj)
})

test('parses with limit', () => {
	expect(datta.parse(str, 1)).toEqual(obj_limit)
})

test('stringifies the example', () => {
	expect(datta.stringify(obj)).toEqual(str)
})
