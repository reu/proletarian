(function() {
  var Proletarian;
  Proletarian = (function() {
    Proletarian.defaults = {
      lineBreak: true,
      targets: "[contenteditable='true']"
    };
    function Proletarian(options) {
      if (options == null) {
        options = {};
      }
      this.options = jQuery.extend({}, Proletarian.defaults, options);
      this.targets = this.options.targets;
    }
    Proletarian.prototype.getOptions = function() {
      return this.options;
    };
    Proletarian.prototype.getTargets = function() {
      return jQuery(this.targets);
    };
    return Proletarian;
  })();
  (typeof exports != "undefined" && exports !== null ? exports : this).Proletarian = Proletarian;
}).call(this);
