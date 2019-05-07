module.exports = {
    MobileNumberValidation:{
        standardiseNumber(number){
            number = number.replace(/ /g,'');
            number = number.replace('-','');
            number = number.replace('+46','0');
            if(number.substr(0,4)=="0046"){
            number = '0' + number.substr(4,number.length-4);
            }
            return number;
        },
        isValidSwedishMobileNumber(number){
            number = this.standardiseNumber(number)
            var pattern = new RegExp(/^(070|072|073|076|079)\d*$/g);
            return pattern.test(number + "")
        } 
    } 
}