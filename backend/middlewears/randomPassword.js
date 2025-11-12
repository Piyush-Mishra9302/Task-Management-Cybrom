const myPassword = () => {
    let password = "";
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let strLen= str.length;

    for(let i = 0; i <= 7; i++){
        let mynum = Math.floor(Math.random()*strLen);
        password += str.charAt(mynum);
    }
    return password;
}

module.exports = {
    myPassword
}