class Proletarian
  @defaults =
    lineBreak: true

  constructor: (options = {}) ->
    @options = jQuery.extend({}, Proletarian.defaults, options)

  getOptions: ->
    @options

(exports ? this).Proletarian = Proletarian
