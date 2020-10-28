let convertSvgLib = {

  convertFileString(fileString, fileTitle) {
    fileString = this.removeDefs(fileString);
    fileString = this.replaceSymbolTag(fileString);
    fileString = this.replaceIdTag(fileString);
    fileString = this.setTitles(fileString);
    fileString = this.wrapIntoContainer(fileString, fileTitle);
    return fileString;
  },

  removeDefs(fileString) {
    const firstPos = fileString.lastIndexOf('<defs>') + 6;
    const lastPos = fileString.lastIndexOf('</defs>');
    return fileString.slice(firstPos, lastPos);
  },

  replaceSymbolTag(fileString) {
    return fileString.replace(/symbol/g, 'use');
  },

  replaceIdTag(fileString) {
    return fileString.replace(/id="/g, 'xlink:href="#');
  },

  setTitles(fileString) {
    let result = [];
    let svgSymbols = fileString.split('</use>');
    for (let i = 0; i < svgSymbols.length; i++) {

      if (svgSymbols[i] === '') {
        svgSymbols.splice(i, 1);
      } else {
        let svgIcon = svgSymbols[i].split('<use')[1];
        if (svgIcon) {
          let svgIconTitle = svgSymbols[i].split('use xlink:href="#')[1].split('"')[0];
          svgIcon = '<use' + svgIcon + '</use>';
          let svgWrapper = `<div class="svg-wrapper"><div class="svg-title">${svgIconTitle}</div><svg class="svg-icon">${svgIcon}</svg></div>`
          result.push(svgWrapper);
        }
      }
    }
    return result.join('');
  },

  wrapIntoContainer(fileString, fileTitle) {
    return `<div class="svgs-container"><div class="svg-defs-title-wrapper">${fileTitle}</div>${fileString}</div>`;
  }

};
module.exports = convertSvgLib;
