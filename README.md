# Disturber

Just a jQuery scroll handler

## Demo
[Disturber demo](http://bartos.me/data/projects/disturb/demo/)

## Usage


```js
$(document).disturber({
  scenes: [{selector: '#slide1', action: {css:'fade-in'}},
          {selector: '#slide2', action: {css:'fade-in',
                                         js: function() {$.fn.disturb()}
                                         }
          }]
  mobile: true
});
```
