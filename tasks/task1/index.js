// Есть сложная структура папок (обязательна вложенность папок) с файлами.
// Необходимо разобрать коллекцию,расположив все файлы по новым папкам в алфавитном порядке,
// т.е. все файлы начинающиеся на “a” должны быть в папке “A” и т.д.
// расширениям). Старая папка должна быть удалена.
//
// Дополнительно:
//    - внутри папки можно отсортировать по расширениям
//    - путь к исходной и итоговой папкаим а также неоюходимость удаления исходной передавать в командной строке

const initialDir = './tasks/task1/from';
const resultDir = './tasks/task1/to';

const resortData = function (inititalDir, resultDir) {

  // ... input your code here

};

module.exports.resortData = resortData;
module.exports.initialDir = initialDir;
module.exports.resultDir = resultDir;
