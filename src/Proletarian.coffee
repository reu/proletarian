class Proletarian
  constructor: (options = {}) ->
    @options = options

  getOptions: ->
    @options

(exports ? this).Proletarian = Proletarian
