const validateName = () => {
    var name = document.getElementById("name").value;
    if(name.includes(' ')) {
        var words = name.split(' ');
        if(words[1]==''){
            document.getElementById("nameSpan").innerHTML = 'x';
            document.getElementById("nameMessage").innerHTML = 'Name must be at least 2 words';
            return false;
        }
        document.getElementById("nameSpan").innerHTML = 'OK';
        document.getElementById("nameMessage").innerHTML = 'Valid data';
        return true;
    } else {
        document.getElementById("nameSpan").innerHTML = 'x';
        document.getElementById("nameMessage").innerHTML = 'Name must be at least 2 words';
        return false;
    }
}

const validateOccupation = () => {
    var occupation = document.getElementById("occupation").value;
    if(occupation == "" || (occupation.length >= 5 && occupation.length <= 15)) {
        document.getElementById("occupationSpan").innerHTML = 'OK';
        document.getElementById("occupationMessage").innerHTML = 'Valid data';
        return true;
    } 
    document.getElementById("occupationSpan").innerHTML = 'x';
    document.getElementById("occupationMessage").innerHTML = 'Minimum 5 chars, maximum 15';
    return false;
}

const validateNumber = () => {
    var number = document.getElementById("number").value;
    if(parseInt(number) < 10 || parseInt(number) > 100 || number == '') {
        document.getElementById("numberSpan").innerHTML = 'x';
        document.getElementById("numberMessage").innerHTML = 'Number must be between 10 and 100';
        return false;
    }
        document.getElementById("numberSpan").innerHTML = 'OK';
        document.getElementById("numberMessage").innerHTML = 'Valid data';
        return true;
}

const validateTime = () => {
    var time = document.getElementById("time").value;
    var begin = "08:00";
    var end = "20:00";
    if(time < begin || time > end) {
        document.getElementById("timeSpan").innerHTML = 'x';
        document.getElementById("timeMessage").innerHTML = 'Time should be from 08:00 to 20:00';
        return false;
    }
    document.getElementById("timeSpan").innerHTML = 'OK';
    document.getElementById("timeMessage").innerHTML = 'Valid data';
    return true;
}

const validatePassword = () => {
    var password = document.getElementById("password").value;
    if(password.length == 6 || password.length == 8) {
        document.getElementById("passwordSpan").innerHTML = 'OK';
        document.getElementById("passwordMessage").innerHTML = 'Valid data';
        return true;
    }
    document.getElementById("passwordSpan").innerHTML = 'x';
        document.getElementById("passwordMessage").innerHTML = 'Should be of length 6 OR 8 characters';
        return false;
}

const validateRepeat = () => {
    if(!validatePassword()) return false;
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    if(password != rePassword) {
        document.getElementById("rePassword").value = "";
        return false;
    }
    return true;
}

const validateTelephone = () => {
    var telephone = document.getElementById("telephone").value;
    if(telephone.length < 12) {
        document.getElementById("telSpan").innerHTML = 'x';
        document.getElementById("telMessage").innerHTML = 'Notice that for a phone number user must input more than 11 digits';
        return false;
    }else{
        if(telephone[0] == '+') {
            for(var i = 0; i < telephone.length; i++) {
                if(i != 0) {
                    if(!(telephone[i] >= '0' && telephone[i] <= '9')) {
                        document.getElementById("telSpan").innerHTML = 'x';
                        document.getElementById("telMessage").innerHTML = 'Notice that for a phone number user must input all numbers';
                        return false;
                    }
                }
            }
            document.getElementById("telSpan").innerHTML = 'OK';
            document.getElementById("telMessage").innerHTML = 'Valid data';
            return true;
        }else{
            document.getElementById("telSpan").innerHTML = 'x';
            document.getElementById("telMessage").innerHTML = 'Notice that for a phone number user must input a '+' sign and digits';
            return false;
        }
}
}
const validatePicture = (fileInput) => {
    var fileType = fileInput.split('.').pop();
    var supportedTypes = ['JPG','JPEG','PNG']
    if(!supportedTypes.includes(fileType.toUpperCase())) {
        document.getElementById("fileSpan").innerHTML = 'x';
        document.getElementById("fileMessage").innerHTML = 'JPG, PNG and JPEG allowed';
        return false;
    }
    document.getElementById("fileSpan").innerHTML = 'OK';
    document.getElementById("fileMessage").innerHTML = 'Valid data';
    return true;
}

const validate = () => {
    var res1 = validateName();
    var res2 = validateOccupation();
    var res3 = validateNumber();
    var res4 = validateTime();
    var res5 = validatePassword();
    var res6 = validateRepeat();
    var res7 = validateTelephone();
    var res8 = validatePicture(document.getElementById("picture").value);
    if(res1 && res2 && res3 && res4 && res5 && res6 && res7) return 'OK';
    return 'ERROR';
}

module.exports = {
    validateName,
    validateOccupation,
    validateNumber,
    validateTime,
    validatePassword,
    validateRepeat,
    validateTelephone,
    validatePicture,
    validate
}