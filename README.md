# Disturber

Just a jQuery scroll handler

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Demo
[Disturber demo](http://bartos.me/data/projects/disturb/demo/)

## Installation using NPM

```sh
$ npm install disturber
```

## Usage


```js
$(document).disturber({
  scenes: [{selector: '#slide1', action: {css:'fade-in'}},
           {selector: '.general-slide', action: {css:'fade-in'}},
           {selector: '#slide2', action: {css:'fade-in',
                                         js: function() {$.fn.disturb()}
                                         }
          }]
  mobile: true
});
```

## Troubleshooting

In some cases (loading of external resources etc) may be needed to wrap the code in 


```js
$( window ).load(function() {
  // Init disturber
});
```

### 
