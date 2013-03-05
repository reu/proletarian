describe("Proletarian", function(){
  var fixturesContext = function() { return $("#fixtures") }

  describe("#options", function(){
    it("has some default values", function(){
      var proletarian = new Proletarian();
      expect(proletarian.options).to.eql(Proletarian.defaults);
    });

    it("allows passing options on its initialization", function(){
      var options = { some: "option" }
      var proletarian = new Proletarian(options);

      expect(proletarian.options.some).to.eql(options.some);
    });
  });

  describe('#commands', function(){
    var proletarian;
    var commands;

    beforeEach(function(){
      commands = [new Proletarian.BoldCommand(), new Proletarian.ImageCommand()];
      proletarian = new Proletarian({ commands: commands });
    });

    it('lists all its commands', function(){
      expect(proletarian.commands).to.eql(commands);
    });

    it('defaults to bold and italic commands', function(){
      expect(new Proletarian().commands).to.eql([new Proletarian.BoldCommand(), new Proletarian.ItalicCommand()]);
    });
  });

  describe('#buildOn', function(){
    beforeEach(function(){
      new Proletarian().buildOn(fixturesContext().find("#edit_me"));
    });

    it('adds command buttons above the editable area', function(){
      $expect(fixturesContext().find("#commands")).to.have("button.proletarian-command");
    });

    it('enables editing the target element', function(){
      $expect(fixturesContext().find("#edit_me")).to.have.attr("contentEditable", "true");
    });
  });

  describe('#unbuild', function(){
    beforeEach(function(){
      var proletarian = new Proletarian();
      proletarian.buildOn(fixturesContext().find("#edit_me"));
      proletarian.unbuild();
    });

    it('disables editing on the target element', function(){
      $expect($("#edit_me", fixturesContext())).to.have.attr("contentEditable", "false");
    });
  });
});
