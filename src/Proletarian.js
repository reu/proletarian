(function() {
  var BoldCommand, Command, ImageCommand, ItalicCommand, Proletarian;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Proletarian = (function() {
    Proletarian.defaults = {
      lineBreak: true,
      targets: "[contenteditable='true']"
    };
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.options = jQuery.extend({}, Proletarian.defaults, options);
      this.targets = this.options.targets;
    }
    Proletarian.prototype.getOptions = function() {
      return this.options;
    };
    Proletarian.prototype.getTargets = function() {
      return jQuery(this.targets);
    };
    return Proletarian;
  })();
  Command = (function() {
    function Command() {}
    Command.prototype.execute = function() {
      return execCommand(this.name);
    };
    Command.prototype.getName = function() {
      return this.name;
    };
    Command.prototype.getLabel = function() {
      var _ref;
      return (_ref = this.label) != null ? _ref : this.label = this.name;
    };
    return Command;
  })();
  BoldCommand = (function() {
    __extends(BoldCommand, Command);
    function BoldCommand() {
      this.name = "Bold";
    }
    return BoldCommand;
  })();
  ItalicCommand = (function() {
    __extends(ItalicCommand, Command);
    function ItalicCommand() {
      this.name = "Italic";
    }
    return ItalicCommand;
  })();
  ImageCommand = (function() {
    __extends(ImageCommand, Command);
    function ImageCommand() {
      this.name = "insertImage";
      this.label = "Image";
    }
    return ImageCommand;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.Command = Command;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.BoldCommand = BoldCommand;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.ItalicCommand = ItalicCommand;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.ImageCommand = ImageCommand;
}).call(this);
