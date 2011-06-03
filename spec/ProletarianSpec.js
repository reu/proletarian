describe("Proletarian", function() {
  describe("#options", function(){
    it("has some default values", function(){
      var proletarian = new Proletarian();
      expect(proletarian.getOptions()).toEqual(Proletarian.defaults);
    });

    it("allows passing options on its initialization", function(){
      var options = { some: "option" }
      var proletarian = new Proletarian(options);

      expect(proletarian.getOptions().some).toEqual(options.some);
    });
  });
});
