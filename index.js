#! /usr/bin/env node
var fs = require("fs")

var userArgs = process.argv.splice(2).join('');
if (userArgs === undefined || userArgs === null || userArgs===''){
	console.log('page 参数不能为空！');
  return;
}
var path = process.cwd()+'/dist/app.json';
var isExist=fs.existsSync(path);
if(!isExist){
  path = process.cwd()+'/app.json';
}
isExist=fs.existsSync(path);
if(!isExist){
  console.log('当前项目目录找不到app.json文件');
  return;
}
setpage(path);

function setpage(path){
  var data = fs.readFileSync(path);
  var page=JSON.parse(data.toString());

  var regx = new RegExp(userArgs,'i');

  var pos = page.pages.findIndex((element)=>{
      return element!=null&&element.match(regx)!==null;
  });

  var findItem = page.pages[pos];
  page.pages.splice(pos, 1);
  if (pos!==-1){
    console.log('find page:',findItem);
    page.pages.unshift(findItem);
    fs.writeFile(path, JSON.stringify(page), function (err) {
        if (err) {
            return console.error(err);
        }
    });
  }else{
    console.log('not found page:',userArgs);
  }
}