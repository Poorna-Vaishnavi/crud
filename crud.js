const fs = require('fs');
const path = require('path');

const dataFolderPath = './'; 

function readFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error}`);
    return null;
  }
}

function writeFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log(`Data written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file ${filePath}: ${error}`);
  }
}

function createRecord(fileName, newRecord) {
  const filePath = path.join(dataFolderPath, fileName);
  const data = readFile(filePath) || [];
  data.push(newRecord);
  writeFile(filePath, data);
}


function getAllRecords(fileName) {
  const filePath = path.join(dataFolderPath, fileName);
  return readFile(filePath) || [];
}


function updateRecord(fileName, recordId, updatedData) {
  const filePath = path.join(dataFolderPath, fileName);
  let data = readFile(filePath) || [];

  data = data.map((record) => {
    if (record.id === recordId) {
      return { ...record, ...updatedData };
    }
    return record;
  });

  writeFile(filePath, data);
}

function deleteRecord(fileName, recordId) {
  const filePath = path.join(dataFolderPath, fileName);
  let data = readFile(filePath) || [];

  data = data.filter((record) => record.id !== recordId);

  writeFile(filePath, data);
}
const newRecord = { id: 1, name: 'John Doe', age: 30 };
createRecord('users.json', newRecord);


const allUsers = getAllRecords('users.json');
console.log(allUsers);


updateRecord('users.json', 1, { age: 31 });


deleteRecord('users.json', 1);
