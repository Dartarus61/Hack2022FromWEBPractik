import express from "express";
import Sequelize, { DataTypes, Model } from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import CryptoJS from "crypto-js";
dotenv.config();
let __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = new Sequelize("pasdat", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
  freezeTableName: true,
});
class User extends Model {}
class Role extends Model {}
class Secret extends Model {}
class Folder extends Model {}
class Permission extends Model {}
try {
  await sequelize.authenticate();
  console.log("Соединение с БД было успешно установлено");
} catch (e) {
  console.log("Невозможно выполнить подключение к БД: ", e);
}

User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    modelName: "User",
    timestamps: false,
  }
);
Role.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    modelName: "Role",
    timestamps: false,
  }
);
Permission.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    roleid: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    modelName: "Permission",
    timestamps: false,
  }
);
Folder.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    parent: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    modelName: "Folder",
    timestamps: false,
  }
);
Secret.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    folder_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.INTEGER, allowNull: false }, // ssh - 1, pas - 0
    content: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    modelName: "Secret",
    timestamps: false,
  }
);
await sequelize.sync({ alter: true });

const Folder_User_Role = sequelize.define("Folder_User_Role", {
  userId: { type: DataTypes.INTEGER },
  folderId: { type: DataTypes.INTEGER },
  roleid: { type: DataTypes.INTEGER },
});
User.hasMany(Folder_User_Role);
Folder_User_Role.belongsTo(User, {
  foreignKey: "userId",
});
Role.hasMany(Folder_User_Role);
Folder_User_Role.belongsTo(Role, {
  foreignKey: "roleid",
});
Folder.hasMany(Folder_User_Role);
Folder_User_Role.belongsTo(Folder, {
  foreignKey: "folderId",
});
Role.hasMany(Permission);
Permission.belongsTo(Role, {
  foreignKey: "roleid",
});
Folder.hasMany(Secret);
Secret.belongsTo(Folder, {
  foreignKey: "folder_id",
});

app.get("/api", (req, res) => {
  res.send("ok");
});
app.get("/register", (req, res) => {
  res.send("ok");
});
app.get("/api", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});

const { generateKeyPairSync } = await import("crypto");

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});
// подтягиваем дату с базы
let data = "сюда приходит данные с формы сайта";
let encrypt = (data) => {
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encryptedData;
};
data = encrypt(data);

async function add_user(data) {
  const user = await serv.create(
    {
      login: data.login,
      pass: encrypt(data.pas).toString,
    },
    { fields: ["login", "pass"] }
  );
}
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
function add_der() {}
