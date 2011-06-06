(function() {
  var BoldCommand, Command, ImageCommand, ItalicCommand, Proletarian, TextFormatCommand;
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
    Command.prototype.active = function() {
      return document.queryCommandState(this.name);
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
  TextFormatCommand = (function() {
    function TextFormatCommand() {
      TextFormatCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(TextFormatCommand, Command);
    TextFormatCommand.prototype.execute = function() {
      if (!this.active()) {
        document.execCommand("removeFormat");
      }
      return TextFormatCommand.__super__.execute.apply(this, arguments);
    };
    return TextFormatCommand;
  })();
  BoldCommand = (function() {
    __extends(BoldCommand, TextFormatCommand);
    function BoldCommand() {
      this.name = "Bold";
    }
    return BoldCommand;
  })();
  ItalicCommand = (function() {
    __extends(ItalicCommand, TextFormatCommand);
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
    ImageCommand.prototype.extraArgument = function() {
      return prompt("Inform the image url: ");
    };
    return ImageCommand;
  })();
  Proletarian = (function() {
    Proletarian.defaults = {
      lineBreak: true,
      commands: [new BoldCommand, new ItalicCommand]
    };
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.options = jQuery.extend({}, Proletarian.defaults, options);
      this.commands = this.options.commands;
      this.current = null;
    }
    Proletarian.prototype.unbuild = function() {
      return this.current.attr("contentEditable", false);
    };
    Proletarian.prototype.buildOn = function(target) {
      if (this.current) {
        unbuild();
      }
      this.current = jQuery(target);
      this.current.attr("contentEditable", true);
      return jQuery.each(this.commands, function(index, command) {
        var button;
        button = jQuery("<button class='proletarian-command'>" + (command.getLabel()) + "</button>");
        button.click(function() {
          return command.execute();
        });
        return jQuery(target).before(button);
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
