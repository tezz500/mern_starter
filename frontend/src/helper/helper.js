const CryptoJS = require('crypto-js');
let secretKey = "your_secret_key";
const encryptData = (data)=>{
    let originalData = data;
    let encryptedData = CryptoJS.AES.encrypt(originalData, secretKey).toString();
    return encryptedData;
}
const decryptData = (data)=>{
    let storedEncryptedData = data;
    let decryptedData = CryptoJS.AES.decrypt(storedEncryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

const checkAuth = ()=>{
    try {
        let data = localStorage.getItem('app_info');
        data = decryptData(data);
        data = JSON.parse(data);   
        if(data){
            return true
        }else{
            return false;
        }
    } catch (error) {
        return false;
    }
}

const userInfo = ()=>{
    try {
        let data = localStorage.getItem('app_info');
        data = decryptData(data);
        data = JSON.parse(data);  
        if(data) {
            return data.user;
        }
        return data;
    } catch (error) {
        return [];
    }
}
export {encryptData, decryptData, checkAuth, userInfo}