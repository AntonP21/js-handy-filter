# Handy Filter [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Tohman21/js-handy-filter/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/handy-filter)](https://www.npmjs.com/package/handy-filter)


## Overview
Handy Filter is a JavaScript/TypeScript library for handy arrays filtration. With her you can filter 
by conditions of **any complexity** in **declarative** style.

If you want to work with `React` see [handy-filter-hook](https://github.com/Tohman21/handy-filter-hook)


## Installation
npm:

    npm install handy-filter
    
yarn:

    yarn add handy-filter


## Table of Contents  
* [Usage](#usage)
  * [Base usage](#base-usage)
  * [Plain syntax](#plain-syntax)
  * [With an array of objects](#with-an-array-of-objects)
  * [Create filter in runtime](#create-filter-in-runtime)
* [The \_\_any\_\_ value](#any-value)
* [Conditions](#conditions)
  * [Simple conditions](#simple-conditions)
  * [Logical conditions](#logical-conditions)
  * [Range conditions](#range-conditions)
  * [RegExp conditions](#regexp-conditions)
  * [Independent use](#independent-use)
* [Supported types](#supported-types)
* [Filter options](#filter-options)
  * [addTo](#add-to)


<a name="usage"></a>
## Usage


<a name="base-usage"></a>
### Base usage
```javascript
import Filter, { gte, lt, not, eq } from 'handy-filter';

// num < 10 or num >= 100 and num !== 500
const filter = new Filter(lt(10)).or(gte(100)).and(not(eq(500)));
const example = [2, 1, 3, 10, 5, 10, 100, 1000, 200, 10, 500];

filter.filter(example); // result is [2, 1, 3, 5, 100, 1000, 200]
```
See more about [Conditions](#conditions).

> **NOTE** that you can pass to the methods any number of conditions.


<a name="with-an-array-of-objects"></a>
### With an array of objects
You can use the Filter with an array of objects. 

You can filter objects by properties of any deep.
```javascript
import Filter, { eq, gt, not } from 'handy-filter';

const example = [
  { num: 20, nested: { str: 'bar', prop: true }},
  { num: 100, nested: { str: 'bar', prop: false }},
  { num: 100, nested: { str: 'foo', prop: null }},
  { num: 10, nested: { str: 'bar', prop: true }},
];

// obj.num > 20 and obj.nested.prop !== null or obj.nested.str === 'foo'
const filter = new Filter(gt('num', 20)).and(not(eq('nested.prop', null))).or(eq('nested.str', 'foo'));

filter.filter(example);
// result is [
//   { num: 100, nested: { str: 'bar', prop: false }},
//   { num: 100, nested: { str: 'foo', prop: null }},
// ]
```

<a name="plain-syntax"></a>
### Plain syntax
It is just another way to use conditions.
```javascript
import Filter from 'handy-filter';

const example = [
  { num: 20, nested: { str: 'bar', prop: true }},
  { num: 100, nested: { str: 'bar', prop: false }},
  { num: 100, nested: { str: 'foo', prop: null }},
  { num: 10, nested: { str: 'bar', prop: true }},
];

// obj.num > 20 and obj.nested.prop !== null or obj.nested.str === 'foo'
const filter = new Filter(['num__gt', 20]).and(['nested.prop__eq', false]).or(['nested.str__eq', 'foo']);

filter.filter(example);
// result is [
//   { num: 100, nested: { str: 'bar', prop: false }},
//   { num: 100, nested: { str: 'foo', prop: null }},
// ]
```
See more about [Conditions](#conditions).


<a name="create-filter-in-runtime"></a>
### Create filter in runtime
```javascript
import Filter, { lt, lte, gt, eq } from 'handy-filter';

let filter1 = new Filter(lte((20)));

if (Math.random() < 0.5) {
  filter = filter.and(gt(10));
} else {
  filter = filter.and(lt(30)).or(eq(100));
}
```
> **NOTE** that "and" and "or" methods create a **new instance** of the Filter:
```javascript
import Filter, { lte, gt } from 'handy-filter';

const filter1 = new Filter(lte(20));
// the filter1 still contain the "lte(20)" condition, but filter2 contain "lte(20) and gt(10)"
const filter2 = filter1.and(gt(10));
```


<a name="any-value"></a>
## The \_\_any\_\_ value
To make a condition always true, you can use the \_\_any\_\_. This can be useful if you don't want to change 
a structure of the filter, but want to change his values. Or, for example, you want to disable a part of the 
filter condition.
```javascript
import Filter, { ANY, not, eq, lt, gt, gte } from 'handy-filter';

// This is equivalent to "value !== 20 and value < 100"
new Filter(not(eq(20))).and(gt('__any__')).and(lt(100)).and(not(eq(ANY)));

// This will always be true
new Filter(not(eq(20))).or(lt(100)).or(gte('__any__'));
```
The Filter **automatically optimising** conditions containing **\_\_any\_\_** values, so you **don't need to worry** 
about performance.


<a name="conditions"></a>
## Conditions


<a name="simple-conditions"></a>
### Simple conditions
Simple conditions work with all [basic types](#supported-types).

|        Name         | Alias |                        Purpose                          |
|:--------------------|:-----:|:-------------------------------------------------------:|
|        Equal        |  eq   |       Check if a value is equal to another value        |
|       Greater       |  gt   |     Check if a value is greater than another value      |
|Greater than or equal|  gte  |Check if a value is grater than or equal to another value|
|         Less        |  lt   |         Check if a value less than another value        |
|  Less than or equal |  lte  |   Check if a value less than or equal to another value  |


<a name="logical-conditions"></a>
### Logical conditions
Can check values of any [base type](#supported-types), but only conditions can be passed as constructor parameters:
* [Simple conditions](#simple-conditions);
* [Logical conditions](#logical-conditions);
* [Range conditions](#range-conditions);
* [RegExp conditions](#regexp-conditions).

|        Name         | Alias |                        Purpose                          |
|:--------------------|:-----:|:-------------------------------------------------------:|
|         And         |  and  |     Combine other conditions through logical "and"      |
|         Or          |  or   |     Combine other conditions through logical "or"       |
|         Not         |  not  |         Takes truth to falsity and vice versa           |


<a name="range-conditions"></a>
### Range conditions
These conditions check if a value is in some range/set. Work with all [base types](#supported-types).

|        Name         | Alias |                        Purpose                          |
|:--------------------|:-----:|:-------------------------------------------------------:|
|         In          |  inl  |         Check if a value is in a list of values         |


<a name="regexp-conditions"></a>
### RegExp conditions
Can check values of any [base type](#supported-types), but only values of type string or RegExp can 
be passed as constructor parameters.

> **NOTE** that RegExp conditions automatically convert all values to string type. 

|        Name         | Alias |                        Purpose                          |
|:--------------------|:-----:|:-------------------------------------------------------:|
|       Contain       |  cnt  |         Check if a value contains another value         |
| Ignore case contain |  icnt |         Check if a value contains another value         |


<a name="independent-use"></a>
### Independent use
You can use conditions independently of the filter:
```javascript
import { and, or, eq } from 'handy-filter';

const user = {
  active: true,
  isAdmin: false,
  permissions: {
    canWrite: true,
    canRead: true,
  },
};

const isActive = eq('active', true);
const isAdmin = eq('isAdmin', true);
const canWrite = and(isActive, or(isAdmin, eq('permissions.canWrite', true)));

if (canWrite.check(user)) {
// do somthing
}
```

<a name="supported-types"></a>
## Supported types
1. bigint;
1. boolean;
1. Date;
1. null;
1. number;
1. string;
1. undefined.


<a name="filter-options"></a>
## Filter options
The Filter constructor can receive options object as the second parameter.


<a name="add-to"></a>
### addTo
|  Valid values | Default |
|:--------------|:-------:|
|  all, latest  | latest  |

This option changes how the filter add new conditions using "and" and "or" methods:
```javascript
import Filter, { and, not, or, eq, gt, lte } from 'handy-filter';

const values = [4, 1, 60, 3, 5, 10, 50, 20, 100, 30, 1000];

// This is equivalent to "value < 0 or value > 50 and value <= 100 or value != 60 and value === 30"
const defaultFilter = new Filter(lt(0)).or(gt(50)).and(lte(100)).or(not(eq(60))).and(eq(30));
// This is equivalent to "(((value < 0 or value > 50) and value <= 100) or value != 60) and value === 30"
const filterWithOption = new Filter(lt(0), { addTo: 'all' }).or(gt(50)).and(lte(100)).or(not(eq(60))).and(eq(30));

defaultFilter.filter(values); // result is [60, 100, 30]
filterWithOption.filter(values); // result is [30]

```
