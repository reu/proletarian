describe('BoldCommand', function () {
  var command;

  beforeEach(function () {
    loadFixtures("commands.html");
    $("#edit_me").attr("contentEditable", true).focus();
    command = new Proletarian.BoldCommand();
  });

  it('has bold as its name', function () {
    expect(command.getName()).toEqual('Bold');
  });

  it('has bold as its label', function() {
    expect(command.getLabel()).toEqual('Bold');
  });

  it('is active after executing it', function(){
    command.execute();
    expect(command.isActive()).toBeTruthy();
  });

  it('removes it if it already active', function () {
    command.execute();
    command.execute();
    expect(command.isActive()).toBeFalsy();
  });
});

describe('ItalicCommand', function () {
  var command;

  beforeEach(function () {
    loadFixtures("commands.html");
    $("#edit_me").attr("contentEditable", true).focus();
    command = new Proletarian.ItalicCommand();
  });

  it('has italic as its name', function () {
    expect(command.getName()).toEqual('Italic');
  });

  it('has italic as its label', function() {
    expect(command.getLabel()).toEqual('Italic');
  });

  it('is active after executing it', function(){
    command.execute();
    expect(command.isActive()).toBeTruthy();
  });

  it('removes it if it already active', function () {
    command.execute();
    command.execute();
    expect(command.isActive()).toBeFalsy();
  });
});

describe('ImageCommand', function () {
  var command;

  beforeEach(function () {
    loadFixtures("commands.html");
    $("#edit_me").attr("contentEditable", true).focus();
    command = new Proletarian.ImageCommand();
  });

  it('has insertImage as its name', function () {
    expect(command.getName()).toEqual('insertImage');
  });

  it('has image as its label', function() {
    expect(command.getLabel()).toEqual('Image');
  });

  it('asks for a image url when executed', function() {
    spyOn(window, "prompt");
    expect(command.execute()).toBeTruthy();
  });

});
