class Command
  execute: ->
    if @isActive()
      @toggleOff()
    else
      @toggleOn()

  toggleOn: ->
    @execCommand()

  toggleOff: ->
    @execCommand()

  execCommand: ->
    document.execCommand @getName(), @showDefaultUi(), @extraArgument()

  isActive: ->
    document.queryCommandState @getName()

  getLabel: ->
    @getName()

  showDefaultUi: ->
    false

  extraArgument: ->
    true

class TextFormatCommand extends Command
  toggleOn: ->
    document.execCommand "removeFormat"
    super

class BoldCommand extends TextFormatCommand
  getName: -> "Bold"

class ItalicCommand extends TextFormatCommand
  getName: -> "Italic"

class LinkCommand extends TextFormatCommand
  getName: -> "createLink"
  getLabel: -> "Link"
  extraArgument: -> prompt "Inform the url: "

class OrderedListCommand extends TextFormatCommand
  getName: -> "insertOrderedList"
  getLabel: -> "Ordered List"

class UnorderedListCommand extends TextFormatCommand
  getName: -> "insertUnorderedList"
  getLabel: -> "Unordered List"

class ImageCommand extends Command
  getName: -> "insertImage"
  getLabel: -> "Image"
  extraArgument: -> prompt "Inform the image url: "

class IndentCommand extends Command
  getName: -> "indent"
  getLabel: -> "Indent"

  execute: ->
    if document.queryCommandState("insertOrderedList", false, true) or document.queryCommandState("insertUnorderedList", false, true)
      super

class OutdentCommand extends IndentCommand
  getName: -> "outdent"
  getLabel: -> "Outdent"

class Proletarian
  @defaults =
    lineBreak: true
    commands: [
      new BoldCommand
      new ItalicCommand
    ]

  constructor: (options = {}) ->
    @options  = jQuery.extend({}, Proletarian.defaults, options)
    @commands = @options.commands
    @target   = @options.target

  unbuild: ->
    @target.attr "contentEditable", false

  buildOn: (target) ->
    @unbuild() if @target
    @target = jQuery(target)
    @build()

  build: ->
    @target.attr "contentEditable", true
    @buildCommandsBar()

  buildCommandsBar: =>
    target = @target
    commandsList = jQuery("<ul></ul>")
    jQuery.each @commands, (index, command) ->
      button = jQuery "<button class='proletarian-command'>#{command.getLabel()}</button>"
      button.click ->
        command.execute()
        target.trigger "change"
      jQuery(commandsList).append jQuery("<li></li>").append(button)

    jQuery(target).before(commandsList)

class TextAreaProletarian extends Proletarian
  buildOn: (target) ->
    @unbuild() if @target
    @textArea = jQuery(target)
    editableElement = jQuery("<div contentEditable>#{@textArea.val()}</div>")
    @textArea.after(editableElement)
    @textArea.hide()
    @target = jQuery(editableElement)
    @build()

    textArea = @textArea

    @target.bind "change keyup", -> textArea.val(@innerHTML)

  unbuild: ->
    super()
    @target.remove()
    @textArea.show()

jQuery.fn.proletarian = (options = {}) ->
  @each (element) ->
    if $(this).get(0).tagName == "TEXTAREA"
      new TextAreaProletarian(options).buildOn(this)
    else
      new Proletarian(options).buildOn(this)
  this

(exports ? this).Proletarian = Proletarian
(exports ? this).TextAreaProletarian = TextAreaProletarian
(exports ? this).Proletarian.Command = Command
(exports ? this).Proletarian.BoldCommand = BoldCommand
(exports ? this).Proletarian.ItalicCommand = ItalicCommand
(exports ? this).Proletarian.ImageCommand = ImageCommand
