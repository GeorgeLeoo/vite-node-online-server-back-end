const shell = require("shelljs");
const { resolve } = require("path");
// const mdres = shell.cat(resolve(__dirname, "a.md"));
// console.log(
//   "%c [ mdres ]-2",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   mdres.stdout
// );
// const res = shell.pwd();
// console.log(
//   "%c [ res ]-10",
//   "font-size:13px; background:pink; color:#bf2c9f;",
//   res.stdout
// );

// shell.exec(
//   `git clone git@code.aliyun.com:823615655/akx-finance-system.git`,
//   {
//     cwd: resolve(__dirname, "git-test"),
//   }
// );

// -it 报错误 the input device is not a TTY，改成 -i 即可
shell.exec(`chmod +x ${resolve(__dirname, "m.sh")}`);
const a = shell.exec(
  `${resolve(__dirname, "m.sh")} shtest1 shtest_admin admin123`
);
console.log(a);
