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
  Command = (function() {
    function Command() {}
    Command.prototype.execute = function() {
      return document.execCommand(this.name, this.showDefaultUi(), this.extraArgument());
    };
    Command.prototype.getName = function() {
      return this.name;
    };
    Command.prototype.getLabel = function() {
      var _ref;
      return (_ref = this.label) != null ? _ref : this.label = this.name;
    };
    Command.prototype.showDefaultUi = function() {
      return false;
    };
    Command.prototype.extraArgument = function() {
      return true;
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
  Proletarian = (function() {
    Proletarian.defaults = {
      lineBreak: true,
      targets: "[contenteditable='true']",
      commands: [new BoldCommand, new ItalicCommand]
    };
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.options = jQuery.extend({}, Proletarian.defaults, options);
      this.targets = this.options.targets;
      this.commands = this.options.commands;
    }
    Proletarian.prototype.getOptions = function() {
      return this.options;
    };
    Proletarian.prototype.getTargets = function() {
      return jQuery(this.targets);
    };
    Proletarian.prototype.getCommands = function() {
      return this.commands;
    };
    Proletarian.prototype.build = function() {
      var commands, targets;
      commands = this.getCommands();
      targets = this.getTargets();
      return jQuery.each(targets, function(index, target) {
        return jQuery.each(commands, function(index, command) {
          var button;
          button = jQuery("<button class='proletarian-command'>" + (command.getLabel()) + "</button>");
          button.click(function() {
            return command.execute();
          });
          return jQuery(target).before(button);
        });
      });
    };
    return Proletarian;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.Command = Command;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.BoldCommand = BoldCommand;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.ItalicCommand = ItalicCommand;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.ImageCommand = ImageCommand;
}).call(this);
