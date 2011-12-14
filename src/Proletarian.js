(function() {
  var BoldCommand, Command, ImageCommand, IndentCommand, ItalicCommand, LinkCommand, OrderedListCommand, OutdentCommand, Proletarian, TextFormatCommand, UnorderedListCommand;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Command = (function() {
    function Command() {}
    Command.prototype.execute = function() {
      if (this.isActive()) {
        return this.toggleOff();
      } else {
        return this.toggleOn();
      }
    };
    Command.prototype.toggleOn = function() {
      return this.execCommand();
    };
    Command.prototype.toggleOff = function() {
      return this.execCommand();
    };
    Command.prototype.execCommand = function() {
      return document.execCommand(this.getName(), this.showDefaultUi(), this.extraArgument());
    };
    Command.prototype.isActive = function() {
      return document.queryCommandState(this.getName());
    };
    Command.prototype.getLabel = function() {
      return this.getName();
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
    TextFormatCommand.prototype.toggleOn = function() {
      document.execCommand("removeFormat");
      return TextFormatCommand.__super__.toggleOn.apply(this, arguments);
    };
    return TextFormatCommand;
  })();
  BoldCommand = (function() {
    function BoldCommand() {
      BoldCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(BoldCommand, TextFormatCommand);
    BoldCommand.prototype.getName = function() {
      return "Bold";
    };
    return BoldCommand;
  })();
  ItalicCommand = (function() {
    function ItalicCommand() {
      ItalicCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(ItalicCommand, TextFormatCommand);
    ItalicCommand.prototype.getName = function() {
      return "Italic";
    };
    return ItalicCommand;
  })();
  LinkCommand = (function() {
    function LinkCommand() {
      LinkCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(LinkCommand, TextFormatCommand);
    LinkCommand.prototype.getName = function() {
      return "createLink";
    };
    LinkCommand.prototype.getLabel = function() {
      return "Link";
    };
    LinkCommand.prototype.extraArgument = function() {
      return prompt("Inform the url: ");
    };
    return LinkCommand;
  })();
  OrderedListCommand = (function() {
    function OrderedListCommand() {
      OrderedListCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(OrderedListCommand, TextFormatCommand);
    OrderedListCommand.prototype.getName = function() {
      return "insertOrderedList";
    };
    OrderedListCommand.prototype.getLabel = function() {
      return "Ordered List";
    };
    return OrderedListCommand;
  })();
  UnorderedListCommand = (function() {
    function UnorderedListCommand() {
      UnorderedListCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(UnorderedListCommand, TextFormatCommand);
    UnorderedListCommand.prototype.getName = function() {
      return "insertUnorderedList";
    };
    UnorderedListCommand.prototype.getLabel = function() {
      return "Unordered List";
    };
    return UnorderedListCommand;
  })();
  ImageCommand = (function() {
    function ImageCommand() {
      ImageCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(ImageCommand, Command);
    ImageCommand.prototype.getName = function() {
      return "insertImage";
    };
    ImageCommand.prototype.getLabel = function() {
      return "Image";
    };
    ImageCommand.prototype.extraArgument = function() {
      return prompt("Inform the image url: ");
    };
    return ImageCommand;
  })();
  IndentCommand = (function() {
    function IndentCommand() {
      IndentCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(IndentCommand, Command);
    IndentCommand.prototype.getName = function() {
      return "indent";
    };
    IndentCommand.prototype.getLabel = function() {
      return "Indent";
    };
    IndentCommand.prototype.execute = function() {
      if (document.queryCommandState("insertOrderedList", false, true) || document.queryCommandState("insertUnorderedList", false, true)) {
        return IndentCommand.__super__.execute.apply(this, arguments);
      }
    };
    return IndentCommand;
  })();
  OutdentCommand = (function() {
    function OutdentCommand() {
      OutdentCommand.__super__.constructor.apply(this, arguments);
    }
    __extends(OutdentCommand, IndentCommand);
    OutdentCommand.prototype.getName = function() {
      return "outdent";
    };
    OutdentCommand.prototype.getLabel = function() {
      return "Outdent";
    };
    return OutdentCommand;
  })();
  Proletarian = (function() {
    Proletarian.defaults = {
      lineBreak: true,
      commands: [new BoldCommand, new ItalicCommand, new ImageCommand, new LinkCommand, new OrderedListCommand, new UnorderedListCommand, new IndentCommand, new OutdentCommand]
    };
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.buildCommandsBar = __bind(this.buildCommandsBar, this);;
      this.options = jQuery.extend({}, Proletarian.defaults, options);
      this.commands = this.options.commands;
      this.current = this.options.target;
    }
    Proletarian.prototype.unbuild = function() {
      return this.current.attr("contentEditable", false);
    };
    Proletarian.prototype.buildOn = function(target) {
      if (this.current) {
        this.unbuild();
      }
      this.current = jQuery(target);
      return this.build();
    };
    Proletarian.prototype.build = function() {
      this.current.attr("contentEditable", true);
      return this.buildCommandsBar();
    };
    Proletarian.prototype.buildCommandsBar = function() {
      var target;
      target = this.current;
      return jQuery.each(this.commands, function(index, command) {
        var button;
        button = jQuery("<button class='proletarian-command'>" + (command.getLabel()) + "</button>");
        button.click(function() {
          command.execute();
          return target.trigger("change");
        });
        return jQuery(target).before(button);
      });
    };
    return Proletarian;
  })();
  jQuery.fn.proletarian = function(options) {
    if (options == null) {
      options = {};
    }
    this.each(function(element) {
      return new Proletarian(options).buildOn(this);
    });
    return this;
  };
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.Command = Command;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.BoldCommand = BoldCommand;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.ItalicCommand = ItalicCommand;
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian.ImageCommand = ImageCommand;
}).call(this);
