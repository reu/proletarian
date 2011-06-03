class Command
  execute: ->
    document.execCommand @name

  getName: ->
    @name

  getLabel: ->
    @label ?= @name

class BoldCommand extends Command
  constructor: ->
    @name = "Bold"

class ItalicCommand extends Command
  constructor: ->
    @name = "Italic"

class ImageCommand extends Command
  constructor: ->
    @name  = "insertImage"
    @label = "Image"

class Proletarian
  @defaults =
    lineBreak: true
    targets: "[contenteditable='true']"
    commands: [
      new BoldCommand,
      new ItalicCommand
    ]

  constructor: (options = {}) ->
    @options = jQuery.extend({}, Proletarian.defaults, options)
    @targets = @options.targets
    @commands = @options.commands

  getOptions: ->
    @options

  getTargets: ->
    jQuery(@targets)

  getCommands: ->
    @commands

(exports ? this).Proletarian = Proletarian
(exports ? this).Proletarian.Command = Command
(exports ? this).Proletarian.BoldCommand = BoldCommand
(exports ? this).Proletarian.ItalicCommand = ItalicCommand
(exports ? this).Proletarian.ImageCommand = ImageCommand
