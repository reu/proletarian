describe("Proletarian", function() {
  describe("#options", function(){
    it("has some default values", function(){
      var proletarian = new Proletarian();
      expect(proletarian.options).toEqual(Proletarian.defaults);
    });

    it("allows passing options on its initialization", function(){
      var options = { some: "option" }
      var proletarian = new Proletarian(options);

      expect(proletarian.options.some).toEqual(options.some);
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
      expect(proletarian.commands).toEqual(commands);
    });

    it('defaults to bold and italic commands', function () {
      expect(new Proletarian().commands).toEqual([new Proletarian.BoldCommand(), new Proletarian.ItalicCommand()]);
    });
  });

  describe('#buildOn', function () {
    beforeEach(function () {
      loadFixtures("commands.html");
      new Proletarian().buildOn("#edit_me");
    });

    it('adds command buttons above the editable area', function () {
      expect($("#commands")).toContain("button.proletarian-command");
    });

    it('enables editing the target element', function() {
      expect($("#edit_me")).toHaveAttr("contentEditable", "true");
    });
  });

  describe('#unbuild', function () {
    beforeEach(function () {
      loadFixtures("commands.html");
      var proletarian = new Proletarian();
      proletarian.buildOn("#edit_me");
      proletarian.unbuild();
    });

    it('disables editing on the target element', function () {
      expect($("#edit_me")).toHaveAttr("contentEditable", "false");
    });
  });

});
