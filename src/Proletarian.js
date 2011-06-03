(function() {
  var Proletarian;
  Proletarian = (function() {
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.options = options;
    }
    Proletarian.prototype.getOptions = function() {
      return this.options;
    };
    return Proletarian;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;
}).call(this);
