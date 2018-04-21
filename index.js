#! /usr/bin/env node
let fs = require("fs");

let userArgs = process.argv.splice(2).join('');
if (typeof (userArgs) == 'undefined') {
	console.log('page 参数不能为空！');
  return;
}

let path = process.cwd() + '/dist/app.json';
let isExist = fs.existsSync(path);
if (!isExist) {
  path = process.cwd() + '/app.json';
}
isExist = fs.existsSync(path);

if (!isExist) {
  console.log('当前项目目录找不到app.json文件');
  return;
}

setpage(path);
function setpage(path) {
  let data = fs.readFileSync(path);
  let page = JSON.parse(data.toString());
  let regx = new RegExp(userArgs,'i');

  let pos = page.pages.findIndex((element) => {
      return element != null && element.match(regx) !== null;
  });

  let findItem = page.pages[pos];
  page.pages.splice(pos, 1);
  if (pos !== -1) {
    console.log('find page:', findItem);
    page.pages.unshift(findItem);
    fs.writeFile(path, JSON.stringify(page), err => err && console.error(err));
  }else{
    console.log('not found page:', userArgs);
  }
}