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

  describe("#targets", function(){
    var proletarian;

    beforeEach(function () {
      loadFixtures("editableDivs.html");
      proletarian = new Proletarian();
    });

    it('defaults to all contentEditable elements', function() {
      expect(proletarian.getTargets().size()).toBe(2);
    });
  });

  describe('#commands', function () {
    var proletarian;
    var commands;

    beforeEach(function () {
      commands = [new Proletarian.BoldCommand(), new Proletarian.ImageCommand()];
      proletarian = new Proletarian({ commands: commands });
    });

    it('lists all its commands', function () {
      expect(proletarian.getCommands()).toEqual(commands);
    });

    it('defaults to bold and italic commands', function () {
      expect(new Proletarian().getCommands()).toEqual([new Proletarian.BoldCommand(), new Proletarian.ItalicCommand()]);
    });
  });
});
