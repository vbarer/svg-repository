const ConvertOriginalSvg = require('./convert-original-svg');

const fs = require('fs');
const path = './src/app/components/svg-repo/';
const outputFile = './svg-preview/svg-preview.html';

const svgDefFiles = [
  {fileName: 'svg-repo.component.html', fileTitle: 'SVG Images'},
];

const fileStyles = new Promise((resolve, reject) => {
  fs.readFile('./svg-preview/svg-preview.css', 'utf8', function (err, styles) {
    if (err) {
      reject(err);
    }
    resolve(styles);
  });
});

/**
 * Convert single svg-def-file
 * @param fileName
 * @param fileTitle
 * @returns {Promise<any>}
 */
function processFile(fileName, fileTitle) {
  return new Promise((resolve, reject) => {
    fs.readFile(path + fileName, 'utf8', function (err, svgDefinitions) {
      if (err) {
        reject(err);
      }

      let svgTransformed = ConvertOriginalSvg.convertFileString(svgDefinitions, fileTitle);
      resolve(svgDefinitions + svgTransformed);
    });
  });
}

/**
 * Create the array of promises from different svg-def-files
 * @returns {Array}
 */
function createFilesArray() {
  let convertedFiles = [];
  for (let i = 0; i < svgDefFiles.length; i++) {
    convertedFiles.push(processFile(svgDefFiles[i].fileName, svgDefFiles[i].fileTitle));
  }
  return convertedFiles;
}

function createFinalFile(finalHtmlFile) {
  Promise.all([fileStyles, finalHtmlFile]).then(
    ([styles, html]) => {
      const result = `<style>${styles}</style>${html}`;
      fs.writeFile(outputFile, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    },
    error => {
      console.log(error);
    }
  );
}


(function svgPreview() {
  let filesArray = createFilesArray();
  Promise.all(filesArray).then((resolvedArray) => {
      createFinalFile(resolvedArray.join());
    }
  );
})();


