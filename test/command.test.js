(function(){
  var fixturesContext = function() { return $("#fixtures") };
  var fixturesHTML = fixturesContext().html();

  describe('BoldCommand', function(){
    var command;

    beforeEach(function(){
      document.execCommand("selectAll");
      document.execCommand("removeFormat"); // Clear any format

      fixturesContext().find("#edit_me").attr("contentEditable", true).focus();
      command = new Proletarian.BoldCommand();
    });

    it('has bold as its name', function(){
      expect(command.getName()).to.eql('Bold');
    });

    it('has bold as its label', function(){
      expect(command.getLabel()).to.eql('Bold');
    });

    it('is active after executing it', function(){
      command.execute();
      expect(command.isActive()).to.be(true);
    });

    it('removes it if it already active', function(){
      command.execute();
      command.execute();
      expect(command.isActive()).to.be(false);
    });
  });

  describe('ItalicCommand', function(){
    var command;

    beforeEach(function(){
      document.execCommand("selectAll");
      document.execCommand("removeFormat"); // Clear any format

      fixturesContext().find("#edit_me").attr("contentEditable", true).focus();
      command = new Proletarian.ItalicCommand();
    });

    it('has italic as its name', function(){
      expect(command.getName()).to.eql('Italic');
    });

    it('has italic as its label', function(){
      expect(command.getLabel()).to.eql('Italic');
    });

    it('is active after executing it', function(){
      command.execute();
      expect(command.isActive()).to.be(true);
    });

    it('removes it if it already active', function(){
      command.execute();
      command.execute();
      expect(command.isActive()).to.be(false);
    });
  });

  describe('ImageCommand', function(){
    var command, nativePrompt;

    before(function(){
      nativePrompt = window.prompt;
      window.prompt = function(){ return "http://image/url/prompt/executed" };
    });


    beforeEach(function(){
      document.execCommand("selectAll");
      document.execCommand("removeFormat"); // Clear any format

      fixturesContext().find("#edit_me").attr("contentEditable", true).focus();
      command = new Proletarian.ImageCommand();
    });

    after(function(){
      window.prompt = nativePrompt;
    });

    it('has insertImage as its name', function(){
      expect(command.getName()).to.eql('insertImage');
    });

    it('has image as its label', function(){
      expect(command.getLabel()).to.eql('Image');
    });

    it('asks for a image url when executed', function(){
      command.execute()
      expect(fixturesContext().find("#edit_me").html()).to.contain("http://image/url/prompt/executed");
    });
  });
})();
