


// generate.js
const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function generateModel(modelName) {
  const modelsDirectory = path.join(__dirname, 'models');
  ensureDirectoryExists(modelsDirectory);

const newModelName = `${getName(modelName)}Schema`;

const modelContent = `
const mongoose = require('mongoose');
const ${newModelName} = new mongoose.Schema({
    // please write yooy attribute here
});

module.exports = mongoose.model('${modelName}', ${newModelName});`;
  fs.writeFileSync(path.join(modelsDirectory, `${modelName}.js`), modelContent);
  console.log(`Model ${modelName} created successfully.`);
}




function generateController(controllerName) {
    const modelsDirectory = path.join(__dirname, 'controllers');
    ensureDirectoryExists(modelsDirectory);
    const controllerContent = `// ${controllerName}.js
const ${controllerName} = {
  // Your controller logic here
};

module.exports = ${controllerName};`;

    fs.writeFileSync(path.join(__dirname, 'controllers', `${controllerName}.js`), controllerContent);
    console.log(`Controller ${controllerName} created successfully.`);
}

function generateRouter(routerName) {
    const modelsDirectory = path.join(__dirname, 'routers');
    ensureDirectoryExists(modelsDirectory);
    const routerContent = `// ${routerName}.js
const express = require('express');
const router = express.Router();
const ${controllerName} = require('../controllers/${controllerName}');

// Define your routes here

module.exports = router;`;

    fs.writeFileSync(path.join(__dirname, 'routers', `${routerName}.js`), routerContent);
    console.log(`Router ${routerName} created successfully.`);
}


function getName(str){
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toLowerCase() + str.slice(1);
}

const modelName = process.argv[2];
const controllerName = process.argv[3];
const routerName = process.argv[4];

generateModel(modelName);
generateController(controllerName);
generateRouter(routerName);