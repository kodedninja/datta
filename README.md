# datta
A readable plain text structure for strictly formatted data

## Installation
```
npm i datta
```

## Usage
```javascript
var datta = require('..')

var str = datta.parse(`
ID  NAME         EMAIL
---
000 RANDOM JOE   joe@mail.com
001 RANDOM JERRY jerry@mail.com
`)

var obj = datta.stringify([
	{ ID: '000', NAME: 'RANDOM JOE', EMAIL: 'joe@mail.com' },
	{ ID: '001', NAME: 'RANDOM JERRY', EMAIL: 'jerry@mail.com' }
])

```
You can also require just a single method:
```javascript
var stringify = require('datta/stringify')
var parse = require('datta/parse')
```

## API

### ```stringify(obj)```
Accepts a single ```object```. Returns a ```string```.

### ```parse(str)```
Accepts a single ```string```. Returns an ```object```.
