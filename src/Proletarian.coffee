class Proletarian
  @defaults =
    lineBreak: true
    targets: "[contenteditable='true']"

  constructor: (options = {}) ->
    @options = jQuery.extend({}, Proletarian.defaults, options)
    @targets = @options.targets

  getOptions: ->
    @options

  getTargets: ->
    jQuery(@targets)

class Command
  execute: ->
    execCommand @name

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

(exports ? this).Proletarian = Proletarian
(exports ? this).Proletarian.Command = Command
(exports ? this).Proletarian.BoldCommand = BoldCommand
(exports ? this).Proletarian.ItalicCommand = ItalicCommand
(exports ? this).Proletarian.ImageCommand = ImageCommand
