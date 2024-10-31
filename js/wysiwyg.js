// Generated by CoffeeScript 1.3.1
(function() {
  var $;

  $ = this.jQuery;

  this.Wysiwyg = (function() {

    Wysiwyg.name = 'Wysiwyg';

    Wysiwyg.prototype.className = 'wysiwyg';

    Wysiwyg.prototype.events = {
      'click [data-type=bold]': 'bold',
      'click [data-type=italic]': 'italic',
      'click [data-type=list]': 'list',
      'click [data-type=link]': 'link',
      'click [data-type=h2]': 'h2',
      'click [data-type=h3]': 'h3',
      'click a': 'cancel'
    };

    Wysiwyg.prototype.document = document;

    function Wysiwyg(options) {
      var key, value, _ref;
      this.options = options != null ? options : {};
      this.el = $('<div />');
      _ref = this.options;
      for (key in _ref) {
        value = _ref[key];
        this[key] = value;
      }
      this.el.addClass(this.className);
      this.delegateEvents(this.events);
      this.render();
      listName = this.listName;

    }

    Wysiwyg.prototype.updateButton = function() {
      if (this.id == "directions-area") {
        if(document.queryCommandState('insertOrderedList')){
          $('#btn_Direction').text('Header');   
        } else {
          $('#btn_Direction').text('Direction');
        }
      } else {
        if(document.queryCommandState('insertUnorderedList')){
          $('#btn_Ingredient').text('Header');   
        } else {
          $('#btn_Ingredient').text('Ingredient');
        }
      }
    }

    Wysiwyg.prototype.render = function() {
      this.el.empty();
      this.el.append('<a href="#" data-type="list" id="btn_'+this.listName +'">' + this.listName + '</a>');
      return this;
    };

    Wysiwyg.prototype.bold = function(e) {
      e.preventDefault();
      if (!this.selectTest()) {
        return;
      }
      return this.exec('bold');
    };

    Wysiwyg.prototype.italic = function(e) {
      e.preventDefault();
      if (!this.selectTest()) {
        return;
      }
      return this.exec('italic');
    };

    Wysiwyg.prototype.list = function(e) {
      e.preventDefault();
      if (!$( document.activeElement ).is(this.area)) {
        $(this.area).focus();
      }
      if (this.listType == 'ordered') {
        return this.exec('insertOrderedList');
      } else {
        return this.exec('insertUnorderedList');
      }
    };

    Wysiwyg.prototype.link = function(e) {
      var href;
      e.preventDefault();
      if (!this.selectTest()) {
        return;
      }
      this.exec('unlink');
      href = prompt('Enter a link:', 'http://');
      if (!href || href === 'http://') {
        return;
      }
      if (!/:\/\//.test(href)) {
        href = 'http://' + href;
      }
      return this.exec('createLink', href);
    };

    Wysiwyg.prototype.h2 = function(e) {
      e.preventDefault();
      if (this.query('formatBlock') === 'h2') {
        return this.exec('formatBlock', 'p');
      } else {
        return this.exec('formatBlock', 'h2');
      }
    };

    Wysiwyg.prototype.h3 = function(e) {
      e.preventDefault();
      if (this.query('formatBlock') === 'h3') {
        return this.exec('formatBlock', 'p');
      } else {
        return this.exec('formatBlock', 'h3');
      }
    };

    Wysiwyg.prototype.move = function(position) {
      return this.el.css(position);
    };

    Wysiwyg.prototype.cancel = function(e) {
      e.preventDefault();
      return e.stopImmediatePropagation();
    };

    Wysiwyg.prototype.getSelectedText = function() {
      var _ref;
      if ((_ref = this.document) != null ? _ref.selection : void 0) {
        return document.selection.createRange().text;
      } else if (this.document) {
        return document.getSelection().toString();
      }
    };

    Wysiwyg.prototype.selectTest = function() {
      if (this.getSelectedText().length === 0) {
        alert('Select some text first.');
        return false;
      }
      return true;
    };

    Wysiwyg.prototype.exec = function(type, arg) {
      if (arg == null) {
        arg = null;
      }
      return this.document.execCommand(type, false, arg);
    };

    Wysiwyg.prototype.query = function(type) {
      return this.document.queryCommandValue(type);
    };

    Wysiwyg.prototype.delegateEvents = function(events) {
      var eventName, key, match, method, selector, _results,
        _this = this;
      _results = [];
      for (key in events) {
        method = events[key];
        if (typeof method !== 'function') {
          method = (function(method) {
            return function() {
              _this[method].apply(_this, arguments);
              return true;
            };
          })(method);
        }
        match = key.match(/^(\S+)\s*(.*)$/);
        eventName = match[1];
        selector = match[2];
        if (selector === '') {
          _results.push(this.el.bind(eventName, method));
        } else {
          _results.push(this.el.delegate(selector, eventName, method));
        }
      }
      return _results;
    };

    return Wysiwyg;

  })();

}).call(this);