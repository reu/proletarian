describe('BoldCommand', function () {
  var command;

  beforeEach(function () {
    command = new Proletarian.BoldCommand();
  });

  it('has bold as its name', function () {
    expect(command.getName()).toEqual('Bold');
  });

  it('has bold as its label', function() {
    expect(command.getLabel()).toEqual('Bold');
  });
});

describe('ItalicCommand', function () {
  var command;

  beforeEach(function () {
    command = new Proletarian.ItalicCommand();
  });

  it('has italic as its name', function () {
    expect(command.getName()).toEqual('Italic');
  });

  it('has italic as its label', function() {
    expect(command.getLabel()).toEqual('Italic');
  });
});

describe('ImageCommand', function () {
  var command;

  beforeEach(function () {
    command = new Proletarian.ImageCommand();
  });

  it('has insertImage as its name', function () {
    expect(command.getName()).toEqual('insertImage');
  });

  it('has image as its label', function() {
    expect(command.getLabel()).toEqual('Image');
  });
});
