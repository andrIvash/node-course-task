const expect = require('chai').expect;
const resortData = require('../tasks/task1');
const initialDir = './tasks/task1/from';
const resultDir = './tasks/task1/to';
const fs = require('fs');
const path = require('path');
const files = [];
// Есть сложная структура папок (обязательна вложенность папок) с музыкальными файлами
// (можно заменить файлами изображений). Необходимо разобрать нашу музыкальную коллекцию,
// расположив все файлы по новым папкам в алфавитном порядке, т.е. все файлы начинающиеся 
// на “a” должны быть в папке “A” и т.д. (для изображений можно отсортировать по 
// расширениям)
// Старая папка должна быть удалена.

function read (currentPath) {
  fs.readdir(currentPath, (err, items) => {
    if (err) throw new Error(err);
    items.forEach(item => {
      var itemPath = path.join(currentPath, item);
      var state = fs.statSync(itemPath);
      if (state.isDirectory()) {
        read(itemPath);
      } else {
        files.push(path.parse(itemPath).base)
      }
    });
  });
}

/*
 1. Вывести список всех вложенных файлов
 2. Проверить созданы ли новые директории согласно первым буквам в именах файлов
 3. Проверить находяться ли в директориях файлы которые начинаются на соответсвующую букву
 4. Удалена ли исходная директория
*/

describe('test resortData function', () => {
  before(function () {
    read(initialDir);
  });

  it('should return the initial directory name', () => {
    expect(initialDir).to.be.a('string');
    console.log(files);
  });
});
