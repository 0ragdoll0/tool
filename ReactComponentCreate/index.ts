
const readline = require('readline')
const path = require('path')
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const dir = process.cwd()

const templateDir = __dirname + '/template'

function mkdirSync(dir, cb) {
  let paths = dir.split('/');
  let index = 1;
  function next(index) {
    //递归结束判断
    if (index > paths.length) return cb();
    let newPath = paths.slice(0, index).join('/');
    fs.access(newPath, function (err) {
      if (err) {//如果文件不存在，就创建这个文件
        fs.mkdir(newPath, function (err) {
          next(index + 1);
        });
      } else {
        //如果这个文件已经存在，就进入下一个循环
        next(index + 1);
      }
    })
  }
  next(index);
}

function createIndex(name) {
  const indexTemplate = templateDir + '/' + 'index.ts'
  fs.readFile(indexTemplate, function (error, data) {
    if (error) {
      console.log(error);
      return false;
    }
    // 根据模板内容填充组件内容
    const indexFileName = 'index.ts'
    const indexDir = name + '/' + indexFileName
    const indexContent = data.toString().replace(/ComponentName/g, name)

    fs.writeFile(indexDir, indexContent, function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('index成功');
    })
  })
}
function createTsx(name) {
  const vueTemplate = templateDir + '/' + 'componentName.tsx'
  fs.readFile(vueTemplate, function (error, data) {
    if (error) {
      console.log(error);
      return false;
    }
    // 根据模板内容填充组件内容
    const vueFileName = name + '.tsx'
    const vueDir = name + '/' + vueFileName
    const vueContent = data.toString().replace(/ComponentName/g, name)

    fs.writeFile(vueDir, vueContent, function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('tsx成功');
    })
  })
}

// function createVueComponent(name) {
//   const vueComponentTemplate = templateDir + '/' + 'componentName.comp.ts'
//   fs.readFile(vueComponentTemplate, function (error, data) {
//     if (error) {
//       console.log(error);
//       return false;
//     }
//     // 根据模板内容填充组件内容
//     const vueComponentFileName = name + '.comp.ts'
//     const vueComponentDir = name + '/' + vueComponentFileName
//     const vueComponentContent = data.toString().replace(/ComponentName/g, name)

//     fs.writeFile(vueComponentDir, vueComponentContent, function (error) {
//       if (error) {
//         console.log(error);
//         return false;
//       }
//       console.log('vueComponent成功');
//     })
//   })
// }

function createScss(name) {
  const styleTemplate = templateDir + '/' + 'componentName.module.scss'
  fs.readFile(styleTemplate, function (error, data) {
    if (error) {
      console.log(error);
      return false;
    }
    // 根据模板内容填充组件内容
    const styleFileName = name + '.module.scss'
    const styleDir = name + '/' + styleFileName
    const styleContent = data.toString().replace(/ComponentName/g, name)

    fs.writeFile(styleDir, styleContent, function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('scss成功');
    })
  })
}

rl.question('请输入新建组件的名称', (name) => {

  mkdirSync(name, function (err) {
    if (err) {
      console.log(err)
      return false
    } else {
      // 创建vue文件
      createTsx(name)
      createIndex(name)
      // createVueComponent(name)
      createScss(name)
    }


  })



  rl.close()
});