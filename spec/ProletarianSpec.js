describe("Proletarian", function() {
  describe("#options", function(){
    var options;

    beforeEach(function(){
      options = { some: "option", and: "another one" }
    });

    it("allows passing options on its initialization", function(){
      var proletarian = new Proletarian(options);

      expect(proletarian.getOptions()).toBe(options);
    });

    it("creates an empty set of options if not informed on initialization", function(){
      var proletarian = new Proletarian();

      expect(proletarian.getOptions()).toEqual({});
    });
  });
});
