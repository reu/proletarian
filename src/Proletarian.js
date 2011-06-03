(function() {
  var Proletarian;
  Proletarian = (function() {
    Proletarian.defaults = {
      lineBreak: true
    };
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.options = jQuery.extend({}, Proletarian.defaults, options);
    }
    Proletarian.prototype.getOptions = function() {
      return this.options;
    };
    return Proletarian;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;
}).call(this);
