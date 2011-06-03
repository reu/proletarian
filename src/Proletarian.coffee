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

(exports ? this).Proletarian = Proletarian
