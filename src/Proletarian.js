(function() {
  var BoldCommand, Command, ImageCommand, IndentCommand, ItalicCommand, LinkCommand, OrderedListCommand, OutdentCommand, Proletarian, TextAreaProletarian, TextFormatCommand, UnorderedListCommand;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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

    __extends(TextFormatCommand, Command);

    function TextFormatCommand() {
      TextFormatCommand.__super__.constructor.apply(this, arguments);
    }

    TextFormatCommand.prototype.toggleOn = function() {
      document.execCommand("removeFormat");
      return TextFormatCommand.__super__.toggleOn.apply(this, arguments);
    };

    return TextFormatCommand;

  })();

  BoldCommand = (function() {

    __extends(BoldCommand, TextFormatCommand);

    function BoldCommand() {
      BoldCommand.__super__.constructor.apply(this, arguments);
    }

    BoldCommand.prototype.getName = function() {
      return "Bold";
    };

    return BoldCommand;

  })();

  ItalicCommand = (function() {

    __extends(ItalicCommand, TextFormatCommand);

    function ItalicCommand() {
      ItalicCommand.__super__.constructor.apply(this, arguments);
    }

    ItalicCommand.prototype.getName = function() {
      return "Italic";
    };

    return ItalicCommand;

  })();

  LinkCommand = (function() {

    __extends(LinkCommand, TextFormatCommand);

    function LinkCommand() {
      LinkCommand.__super__.constructor.apply(this, arguments);
    }

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

    __extends(OrderedListCommand, TextFormatCommand);

    function OrderedListCommand() {
      OrderedListCommand.__super__.constructor.apply(this, arguments);
    }

    OrderedListCommand.prototype.getName = function() {
      return "insertOrderedList";
    };

    OrderedListCommand.prototype.getLabel = function() {
      return "Ordered List";
    };

    return OrderedListCommand;

  })();

  UnorderedListCommand = (function() {

    __extends(UnorderedListCommand, TextFormatCommand);

    function UnorderedListCommand() {
      UnorderedListCommand.__super__.constructor.apply(this, arguments);
    }

    UnorderedListCommand.prototype.getName = function() {
      return "insertUnorderedList";
    };

    UnorderedListCommand.prototype.getLabel = function() {
      return "Unordered List";
    };

    return UnorderedListCommand;

  })();

  ImageCommand = (function() {

    __extends(ImageCommand, Command);

    function ImageCommand() {
      ImageCommand.__super__.constructor.apply(this, arguments);
    }

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

    __extends(IndentCommand, Command);

    function IndentCommand() {
      IndentCommand.__super__.constructor.apply(this, arguments);
    }

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

    __extends(OutdentCommand, IndentCommand);

    function OutdentCommand() {
      OutdentCommand.__super__.constructor.apply(this, arguments);
    }

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
      if (options == null) options = {};
      this.buildCommandsBar = __bind(this.buildCommandsBar, this);
      this.options = jQuery.extend({}, Proletarian.defaults, options);
      this.commands = this.options.commands;
      this.target = this.options.target;
    }

    Proletarian.prototype.unbuild = function() {
      return this.target.attr("contentEditable", false);
    };

    Proletarian.prototype.buildOn = function(target) {
      if (this.target) this.unbuild();
      this.target = jQuery(target);
      return this.build();
    };

    Proletarian.prototype.build = function() {
      this.target.attr("contentEditable", true);
      return this.buildCommandsBar();
    };

    Proletarian.prototype.buildCommandsBar = function() {
      var commandsList, target;
      target = this.target;
      commandsList = jQuery("<ul></ul>");
      jQuery.each(this.commands, function(index, command) {
        var button;
        button = jQuery("<button class='proletarian-command'>" + (command.getLabel()) + "</button>");
        button.click(function() {
          command.execute();
          return target.trigger("change");
        });
        return jQuery(commandsList).append(jQuery("<li></li>").append(button));
      });
      return jQuery(target).before(commandsList);
    };

    return Proletarian;

  })();

  TextAreaProletarian = (function() {

    __extends(TextAreaProletarian, Proletarian);

    function TextAreaProletarian() {
      TextAreaProletarian.__super__.constructor.apply(this, arguments);
    }

    TextAreaProletarian.prototype.buildOn = function(target) {
      var editableElement, textArea;
      if (this.target) this.unbuild();
      this.textArea = jQuery(target);
      editableElement = jQuery("<div contentEditable>" + (this.textArea.val()) + "</div>");
      this.textArea.after(editableElement);
      this.textArea.hide();
      this.target = jQuery(editableElement);
      this.build();
      textArea = this.textArea;
      return this.target.bind("change keyup", function() {
        return textArea.val(this.innerHTML);
      });
    };

    TextAreaProletarian.prototype.unbuild = function() {
      TextAreaProletarian.__super__.unbuild.call(this);
      this.target.remove();
      return this.textArea.show();
    };

    return TextAreaProletarian;

  })();

  jQuery.fn.proletarian = function(options) {
    if (options == null) options = {};
    this.each(function(element) {
      if ($(this).get(0).tagName === "TEXTAREA") {
        return new TextAreaProletarian(options).buildOn(this);
      } else {
        return new Proletarian(options).buildOn(this);
      }
    });
    return this;
  };

  (typeof exports !== "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;

  (typeof exports !== "undefined" && exports !== null ? exports : this).TextAreaProletarian = TextAreaProletarian;

  (typeof exports !== "undefined" && exports !== null ? exports : this).Proletarian.Command = Command;

  (typeof exports !== "undefined" && exports !== null ? exports : this).Proletarian.BoldCommand = BoldCommand;

  (typeof exports !== "undefined" && exports !== null ? exports : this).Proletarian.ItalicCommand = ItalicCommand;

  (typeof exports !== "undefined" && exports !== null ? exports : this).Proletarian.ImageCommand = ImageCommand;

}).call(this);
