var should = require("should");
require('./loadpokedex');

describe('geninfo', function () {
    var numGens = lastgen.num;

    describe('.getGen', function () {
        it('should convert non-objects', function () {
            geninfo.getGen(1).should.eql({num: 1});
            geninfo.getGen(6).should.eql({num: 6});
        });
        it('should range test generations', function () {
            geninfo.getGen(-1).should.eql({num: 6});
            geninfo.getGen(numGens + 1).should.eql({num: 6});
        });
        it('should not range test generations if correct is false', function () {
            geninfo.getGen(-1, false).should.eql({num: -1});
            geninfo.getGen(numGens + 1, false).should.eql({num: numGens + 1});
            geninfo.getGen(undefined, false).should.eql({num: undefined});
        });
    });
    describe('.list', function () {
        it('should return the list of generations', function () {
            geninfo.list().should.equal(pokedex.generations.generations);
            Object.keys(geninfo.list()).length.should.equal(numGens);
        });
    });
    describe('.name', function () {
        it('should return the generation name if it exists', function () {
            geninfo.name(3).should.equal("Generation 3");
            geninfo.name({num: 4}).should.equal("Generation 4");
            geninfo.name(6).should.equal("Generation 6");
            should(geninfo.name(-1)).equal(undefined);
            should(geninfo.name({num: "Generation 1"})).equal(undefined);
        });
    });
    describe('.options', function () {
        it('should return the list of generation options', function () {
            geninfo.options().should.equal(pokedex.generations.options);
            Object.keys(geninfo.options()).length.should.equal(numGens);
        });
    });
    describe('.option', function () {
        it('should return options specific to a generation if given', function () {
            geninfo.option(1).sprite_folder.should.equal('http://pokemon-online.eu/images/pokemon/red-blue/');
            geninfo.option(2).ability.should.equal(false);
            geninfo.option({num: 4}).gender.should.equal(true);
            should(geninfo.option(-1)).equal(undefined);
        });
    });
    describe('.hasOption', function () {
        it('should return true or false depending on if given gen has that option enabled', function () {
            geninfo.hasOption(1, 'sprite_folder').should.equal(true);
            geninfo.hasOption(2, 'ability').should.equal(false);
            geninfo.hasOption({num: 4}, 'gender').should.equal(true);
        });
    });
});
