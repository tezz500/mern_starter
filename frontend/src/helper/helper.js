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

const getToken = () =>{
    try {
        let data = localStorage.getItem('app_info');
        data = decryptData(data);
        data = JSON.parse(data);
        if(data){
            return data.token;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
 
}

const getPermissions = ()=>{
    try {
        let data = localStorage.getItem('app_info');
        data = decryptData(data);
        data = JSON.parse(data);
        if(data){
            return data.permissions;
        }else{
            return [];
        }
    } catch (error) {
        return [];
    }
}

const can = (permission)=>{
    const permissions = getPermissions();
    if(permissions.includes(permission)){
        return true;
    }else{
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

const logout = ()=>{
    localStorage.setItem('app_info', '');
}
export {encryptData, decryptData, checkAuth, userInfo, getToken, can, logout}