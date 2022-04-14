export default class Numbers {
  static generateCodeVerification() {
    //let code = Math.floor(Math.random() * 1000000).toString();
    let code = Math.floor(100000 + Math.random() * 900000).toString();

    if(code.length === 5) {
      code = '0' + code;
    }
    
    return code;
  }
}