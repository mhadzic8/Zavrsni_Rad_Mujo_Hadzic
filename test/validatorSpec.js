const chai = require('chai');
const expect = chai.expect;
var app = require("../src/validator");

const { JSDOM } = require("jsdom");

describe('Name validation', function () {
  before(function() {
    return JSDOM.fromFile("./src/index.html")
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
      });
  })

    it("1 word for name", function() {
      document.getElementById("name").value = "Mujo";
      var result = app.validateName();
      expect(document.getElementById('nameSpan').innerHTML).to.equal('x');
      expect(document.getElementById('nameMessage').innerHTML).to.equal('Name must be at least 2 words');
      expect(result).to.equal(false);
    });

    it("2 words for name", function() {
        document.getElementById("name").value = "Mujo Hadzic";
        var result = app.validateName();
        expect(document.getElementById('nameSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('nameMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
    })

    it("1 word with space at end", function() {
      document.getElementById("name").value = "Mujo ";
      var result = app.validateName();
      expect(document.getElementById('nameSpan').innerHTML).to.equal('x');
      expect(document.getElementById('nameMessage').innerHTML).to.equal('Name must be at least 2 words');
      expect(result).to.equal(false);
    })

});

describe('Occupation validation', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })
  
    //-------------------------------popravka
      it("Empty field", function() {
        document.getElementById("occupation").value = "";
        var result = app.validateOccupation();
        expect(document.getElementById('occupationSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('occupationMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
      });

      //---------------------------------------- popravka
      it("Less than 5 characters", function() {
        document.getElementById("occupation").value = "/";
        var result = app.validateOccupation();
        expect(document.getElementById('occupationSpan').innerHTML).to.equal('x');
        expect(document.getElementById('occupationMessage').innerHTML).to.equal('Minimum 5 chars, maximum 15');
        expect(result).to.equal(false);
      });
  
      it("8 characters", function() {
        document.getElementById("occupation").value = "Engineer";
        var result = app.validateOccupation();
        expect(document.getElementById('occupationSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('occupationMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);

        //-------------------------------------- popravka
        document.getElementById("occupation").value = "abcde";
        var result = app.validateOccupation();
        expect(document.getElementById('occupationSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('occupationMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
      });

      it("20 characters", function() {
        document.getElementById("occupation").value = "Xxxxxxxxxxxxxxxxxx20";
        var result = app.validateOccupation();
        expect(document.getElementById('occupationSpan').innerHTML).to.equal('x');
        expect(document.getElementById('occupationMessage').innerHTML).to.equal('Minimum 5 chars, maximum 15');
        expect(result).to.equal(false);

        //------------------------------- popravka
        document.getElementById("occupation").value = "Xxxxxxxxxxxxx15";
        var result = app.validateOccupation();
        expect(document.getElementById('occupationSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('occupationMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
      });
  
  });

  describe('Number validation', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })

    //-------------------------popravka
    it("8 as input", function() {
        document.getElementById("number").value = "8";
        var result = app.validateNumber();
        expect(document.getElementById('numberSpan').innerHTML).to.equal('x');
        expect(document.getElementById('numberMessage').innerHTML).to.equal('Number must be between 10 and 100');
        expect(result).to.equal(false);
      });
  
      it("434 as input", function() {
        document.getElementById("number").value = "434";
        var result = app.validateNumber();
        expect(document.getElementById('numberSpan').innerHTML).to.equal('x');
        expect(document.getElementById('numberMessage').innerHTML).to.equal('Number must be between 10 and 100');
        expect(result).to.equal(false);

        //------------------------------------popravka
        document.getElementById("number").value = "100";
        var result = app.validateNumber();
        expect(document.getElementById('numberSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('numberMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
      });
  
      it("34 as input", function() {
          document.getElementById("number").value = "34";
          var result = app.validateNumber();
          expect(document.getElementById('numberSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('numberMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);

          //------------------------------------popravka
          document.getElementById("number").value = "10";
          var result = app.validateNumber();
          expect(document.getElementById('numberSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('numberMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);
      });

      //---------------- popravka
      it("No number", function() {
        document.getElementById("number").value = "";
        var result = app.validateNumber();
        expect(document.getElementById('numberSpan').innerHTML).to.equal('x');
        expect(document.getElementById('numberMessage').innerHTML).to.equal('Number must be between 10 and 100');
        expect(result).to.equal(false);
    });
  
  });

  describe('Time validation', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })
  
      it("Wrong time", function() {
        document.getElementById("time").value = "06:40";
        var result = app.validateTime();
        expect(document.getElementById('timeSpan').innerHTML).to.equal('x');
        expect(document.getElementById('timeMessage').innerHTML).to.equal('Time should be from 08:00 to 20:00');
        expect(result).to.equal(false);
      });

      //-----------------removed
      /*it("No time", function() {
        document.getElementById("time").value = "";
        var result = app.validateTime();
        expect(document.getElementById('timeSpan').innerHTML).to.equal('x');
        expect(document.getElementById('timeMessage').innerHTML).to.equal('Time should be from 08:00 to 20:00');
        expect(result).to.equal(false);
      });*/
  
      it("Correct time", function() {
          document.getElementById("time").value = "16:40";
          var result = app.validateTime();
          expect(document.getElementById('timeSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('timeMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);
      });

      //-------------------------------------popravka
      it("08:00 and 20:00", function() {
        document.getElementById("time").value = "08:00";
        var result = app.validateTime();
        expect(document.getElementById('timeSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('timeMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);

        document.getElementById("time").value = "20:00";
        var result = app.validateTime();
        expect(document.getElementById('timeSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('timeMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
    });

    //-------------------------------------popravka
      it("Correct time 2", function() {
        document.getElementById("time").value = "21:10";
        var result = app.validateTime();
        expect(document.getElementById('timeSpan').innerHTML).to.equal('x');
        expect(document.getElementById('timeMessage').innerHTML).to.equal('Time should be from 08:00 to 20:00');
        expect(result).to.equal(false);
    });
  
  });

describe('Password validation', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })
  
      it("7 characters", function() {
        document.getElementById("password").value = "abcd123";
        app.validateTime();
        var result = app.validatePassword();
        expect(document.getElementById('passwordSpan').innerHTML).to.equal('x');
        expect(document.getElementById('passwordMessage').innerHTML).to.equal('Should be of length 6 OR 8 characters');
        expect(result).to.equal(false);
      });
  
      it("8 characters", function() {
          document.getElementById("password").value = "abcd1234";
          var result = app.validatePassword();
          expect(document.getElementById('passwordSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('passwordMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);
      });

      //------------------------------------------------popravka
      it("6 characters", function() {
        document.getElementById("password").value = "123456";
        var result = app.validatePassword();
        expect(document.getElementById('passwordSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('passwordMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
    });

      it("Reset password should be OK", function() {
        document.getElementById("password").value = "abcd1234";
        document.getElementById("rePassword").value = "abcd1234";
        var result = app.validatePassword();
        var repeat = app.validateRepeat();
        expect(result).to.equal(true);
        expect(repeat).to.equal(true);
    });

    it("Reset password should be NOT OK", function() {
        document.getElementById("password").value = "abcd1234";
        document.getElementById("rePassword").value = "abcd1235";
        var result = app.validatePassword();
        var repeat = app.validateRepeat();
        expect(result).to.equal(true);
        expect(repeat).to.equal(false);
        expect(document.getElementById('rePassword').value).to.equal('');
    });

    //---------------------------------------popravka
    it("Reset password should be NOT OK 2", function() {
      document.getElementById("password").value = "pass";
      document.getElementById("rePassword").value = "pass";
      var result = app.validatePassword();
      var repeat = app.validateRepeat();
      expect(result).to.equal(false);
      expect(repeat).to.equal(false);
  });
  
  });

  describe('Telephone validation', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })
  
      it("Should be invalid telephone", function() {
        document.getElementById("telephone").value = "387623456780";
        var result = app.validateTelephone();
        expect(document.getElementById('telSpan').innerHTML).to.equal('x');
        expect(document.getElementById('telMessage').innerHTML).to.equal('Notice that for a phone number user must input a '+' sign and digits');
        expect(result).to.equal(false);
      });

      it("Should be invalid telephone 2", function() {
        document.getElementById("telephone").value = "+387";
        var result = app.validateTelephone();
        expect(document.getElementById('telSpan').innerHTML).to.equal('x');
        expect(document.getElementById('telMessage').innerHTML).to.equal('Notice that for a phone number user must input more than 11 digits');
        expect(result).to.equal(false);
      });

      it("Should be invalid telephone 4", function() {
        document.getElementById("telephone").value = "+telephoneNumber";
        var result = app.validateTelephone();
        expect(document.getElementById('telSpan').innerHTML).to.equal('x');
        expect(document.getElementById('telMessage').innerHTML).to.equal('Notice that for a phone number user must input all numbers');
        expect(result).to.equal(false);
      });
      it("Should be invalid telephone 5", function() {
        document.getElementById("telephone").value = "+///////////////////////";
        var result = app.validateTelephone();
        expect(document.getElementById('telSpan').innerHTML).to.equal('x');
        expect(document.getElementById('telMessage').innerHTML).to.equal('Notice that for a phone number user must input all numbers');
        expect(result).to.equal(false);
      });
  
      it("Should be valid telephone", function() {
          document.getElementById("telephone").value = "+38762345678";
          app.validate();
          var result = app.validateTelephone();
          expect(document.getElementById('telSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('telMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);
      })
  
      it("Should be valid telephone", function() {
          document.getElementById("telephone").value = "+39762345678";
          app.validate();
          var result = app.validateTelephone();
          expect(document.getElementById('telSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('telMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);
      })
  
      it("Should be valid telephone", function() {
          document.getElementById("telephone").value = "+30762345678";
          app.validate();
          var result = app.validateTelephone();
          expect(document.getElementById('telSpan').innerHTML).to.equal('OK');
          expect(document.getElementById('telMessage').innerHTML).to.equal('Valid data');
          expect(result).to.equal(true);
      })
  
  });

  describe('Picture validation', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })
  
      it("No picture", function() {
        const fileInput = ''
        var result = app.validatePicture(fileInput);
        expect(document.getElementById('fileSpan').innerHTML).to.equal('x');
        expect(document.getElementById('fileMessage').innerHTML).to.equal('JPG, PNG and JPEG allowed');
        expect(result).to.equal(false);
      });
      it("Correct picture", function() {
        const fileInput = 'test_image.jpg'
        var result = app.validatePicture(fileInput);
        expect(document.getElementById('fileSpan').innerHTML).to.equal('OK');
        expect(document.getElementById('fileMessage').innerHTML).to.equal('Valid data');
        expect(result).to.equal(true);
      });
  
  });

  //--------------------------------popravka
  describe('Submit button', function () {
    before(function() {
      return JSDOM.fromFile("./src/index.html")
        .then((dom) => {
          global.window = dom.window;
          global.document = window.document;
        });
    })
  
      it("Submit 1", function() {
        document.getElementById("telephone").value = "387623456780";
        document.getElementById("name").value = "Mujo Hadzic";
        expect(app.validate()).to.equal('ERROR');
      });

      it("Submit 2", function() {
        document.getElementById("name").value = "Mujo Hadzic";
        document.getElementById("occupation").value = "Student";
        document.getElementById("number").value = "17";
        document.getElementById("time").value = "12:20";
        document.getElementById("password").value = "12345678";
        document.getElementById("rePassword").value = "12345678";
        document.getElementById("telephone").value = "+38761555555";
        expect(app.validate()).to.equal('OK');
      });

      it("Submit 3", function() {
        document.getElementById("name").value = "Mujo";
        document.getElementById("occupation").value = "Student";
        document.getElementById("number").value = "17";
        document.getElementById("time").value = "12:20";
        document.getElementById("password").value = "12345678";
        document.getElementById("rePassword").value = "12345678";
        document.getElementById("telephone").value = "+38761555555";
        expect(app.validate()).to.equal('ERROR');

        document.getElementById("name").value = "Mujo Hadzic";
        document.getElementById("occupation").value = "&!#";
        document.getElementById("number").value = "17";
        document.getElementById("time").value = "12:20";
        document.getElementById("password").value = "12345678";
        document.getElementById("rePassword").value = "12345678";
        document.getElementById("telephone").value = "+38761555555";
        expect(app.validate()).to.equal('ERROR');

        document.getElementById("name").value = "Mujo Hadzic";
        document.getElementById("occupation").value = "Student";
        document.getElementById("number").value = "147";
        document.getElementById("time").value = "12:20";
        document.getElementById("password").value = "12345678";
        document.getElementById("rePassword").value = "12345678";
        document.getElementById("telephone").value = "+38761555555";
        expect(app.validate()).to.equal('ERROR');

        document.getElementById("name").value = "Mujo Hadzic";
        document.getElementById("occupation").value = "Student";
        document.getElementById("number").value = "17";
        document.getElementById("time").value = "02:20";
        document.getElementById("password").value = "123456789";
        document.getElementById("rePassword").value = "123456789";
        document.getElementById("telephone").value = "+38761555555";
        expect(app.validate()).to.equal('ERROR');

        document.getElementById("name").value = "Mujo Hadzic";
        document.getElementById("occupation").value = "Student";
        document.getElementById("number").value = "17";
        document.getElementById("time").value = "12:20";
        document.getElementById("password").value = "12345678";
        document.getElementById("rePassword").value = "123456789";
        document.getElementById("telephone").value = "+38761555555";
        expect(app.validate()).to.equal('ERROR');

        document.getElementById("name").value = "Mujo Hadzic";
        document.getElementById("occupation").value = "Student";
        document.getElementById("number").value = "17";
        document.getElementById("time").value = "12:20";
        document.getElementById("password").value = "12345678";
        document.getElementById("rePassword").value = "12345678";
        document.getElementById("telephone").value = "38761555555";
        expect(app.validate()).to.equal('ERROR');
      });
  
  });

