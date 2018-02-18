/*
 1. Вывести список всех вложенных файлов
 2. Проверить созданы ли новые директории согласно первым буквам в именах файлов
 3. Проверить находяться ли в директориях файлы которые начинаются на соответсвующую букву
 4. Удалена ли исходная директория
*/

const expect = require('chai').expect;
const task1 = require('../tasks/task1');
const fs = require('fs');
const path = require('path');
const files = [];
const dirs = [];

function read (currentPath, type) {
  fs.readdir(currentPath, (err, items) => {
    if (err) throw new Error(err);
    items.forEach(item => {
      var itemPath = path.join(currentPath, item);
      var state = fs.statSync(itemPath);
      if (state.isDirectory()) {
        if (type === 'dir') {
          dirs.push(itemPath);
        }
        read(itemPath, type);
      } else {
        if (type === 'file') {
          files.push(path.parse(itemPath).base);
        }
      }
    });
  });
}

function arrayContainsArray (superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function deleteDir (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

describe('test initial data', () => {
  it('should the initial directory exist and not be empty', (done) => {
    expect(task1.initialDir).to.be.a('string');
    fs.readdir(task1.initialDir, (err, items) => {
      if (err) {
        throw new Error('Unable to read initial dir');
      }
      expect(items).to.be.a('array');
      expect(items.length).to.not.be.null;
      done();
    });
  });
});

describe('test resortData function', () => {
  before(function () {
    read(task1.initialDir, 'file');
    task1.resortData(task1.initialDir, task1.resultDir);
    read(task1.resultDir, 'dir');
  });

  after(function () {
    deleteDir(task1.resultDir);
  });

  it('should the output directory created', (done) => {
    fs.readdir(task1.resultDir, (err, res) => {
      expect(err).to.equal(null);
      done();
    });
  });

  it('should subset directories created according to initial file names', () => {
    const superset = files.map(item => item[0].toUpperCase());
    const subset = dirs.map(item => item.split('/').pop().toUpperCase());
    expect(arrayContainsArray(superset, subset)).to.be.true;
  });

  it('should subset directories contains right files', (done) => {
    const result = [];
    const promises = [];
    dirs.forEach(dir => {
      let pr = new Promise((resolve, reject) => {
        fs.readdir(dir, (err, items) => {
          if (err) {
            console.log('error');
            reject(err);
          }
          const filtered = items.filter(item => item[0].toUpperCase() !== dir.split('/').pop().toUpperCase());
          filtered.length === 0 ? result.push(true) : result.push(false);
          resolve();
        });
      }).catch(err => {
        console.log(err);
      });
      promises.push(pr);
    });
    Promise.all(promises).then(() => {
      expect(result.findIndex((elem) => elem === false)).to.equal(-1);
    }).then(done, done);
  });

  it('should the initial directory deleted', (done) => {
    fs.readdir(task1.initialDir, (err, res) => {
      expect(err).to.not.equal(null);
      done();
    });
  });
});
