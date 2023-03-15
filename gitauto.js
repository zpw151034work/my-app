const readline = require("readline").createInterface({//引入模块以便在命令行获取输入内容
  input: process.stdin,
  output: process.stdout,
});
const exec = require("child_process").exec;//引入子线程模块

exec("git add .", (error) => {
  if (!error) {
    readline.question("提交内容简介: ", (input) => {//接收输入内容
      input = input || "1";
      exec(`git commit -m ${input}`, (error) => {//将输入的内容作为提交注释
        if (!error) {
          exec(`git rev-parse --abbrev-ref HEAD`, (error, stdout) => {//获取到当前分支的名称
            if (!error) {
              exec(`git push origin ${stdout}`, (error) => {//提交到当前分支
                if (!error) {
                  readline.close();//关闭对话
                }
              });
            }
          });
        }
      });
    });
  } else {
    throw error;
  }
});

