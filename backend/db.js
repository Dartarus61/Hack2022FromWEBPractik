import crypto from "crypto";
import CryptoJS from "crypto-js";
import Sequelize, { DataTypes, Model, where } from "sequelize";
import { serv } from "./index.js";

let encrypt = (data) => {
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encryptedData;
};
data = encrypt(data);

const user = await serv.create(
  {
    login: "login",
    pass: data.toString(),
  },
  { fields: ["login", "pass"] }
);

var encrypted = CryptoJS.AES.encrypt(privateKey, "secretkey");

console.log(encrypted.toString());
var bytes = CryptoJS.AES.decrypt(encrypted, "secretkey");
var decrypted = bytes.toString(CryptoJS.enc.Utf8);

let decrypt = (data) => {
  const decryptedData = crypto.privateDecrypt(decrypted, data);
  console.log("decrypted data: ", decryptedData.toString());
  return decryptedData;
};

decrypt(data);
