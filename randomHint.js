// Полифилы для старых браузеров
;(function () {
  'use strict';
  var _slice = Array.prototype.slice;
  try {
    _slice.call(document.documentElement);
  } catch (e) { 
    Array.prototype.slice = function(begin, end) {
      end = (typeof end !== 'undefined') ? end : this.length;
      if (Object.prototype.toString.call(this) === '[object Array]'){
        return _slice.call(this, begin, end); 
      }
      var i, cloned = [],
        size, len = this.length;
      var start = begin || 0;
      start = (start >= 0) ? start : Math.max(0, len + start);
      var upTo = (typeof end == 'number') ? Math.min(end, len) : len;
      if (end < 0) {
        upTo = len + end;
      }
      size = upTo - start;
      if (size > 0) {
        cloned = new Array(size);
        if (this.charAt) {
          for (i = 0; i < size; i++) {
            cloned[i] = this.charAt(start + i);
          }
        } else {
          for (i = 0; i < size; i++) {
            cloned[i] = this[start + i];
          }
        }
      }
      return cloned;
    };
  }
}());
;(function() {
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };
    function ClassList(element) {
        this.element = element;
    }
    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += this.element.className.length > 0 ? ' ' + name : name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) 
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();


// конец полифилов 


// модуль
;(function (idModule, hintClass) {
	function createRandom(min,max) {
		min = 0 || min;
		return Math.floor(min + Math.random() * (max + 1 - min))
	}
	var showHint = function (idHint) {
		var hintWrapper = document.getElementById(idHint),
			hints = [].slice.call(hintWrapper.querySelectorAll('.'+ hintClass)),
			randomHint = createRandom(0, hints.length - 1);
		hints[randomHint].classList.add('active');
	}(idModule)
})('wrappHints','hint');
