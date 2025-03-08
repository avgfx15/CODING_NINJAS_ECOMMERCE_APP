// | import chalk
import chalk from "chalk";

// @ success Log
export const successLog = async (message) => {
  console.log();
  console.log(chalk.red.bold.bgHex("#00e64d")(message));
};

// ! Error Log
export const errorLog = async (message) => {
  console.log();
  console.log(chalk.yellow.bold.bgHex("#ff0000")(message));
};

// @ Informative Log
export const infoLog = async (message) => {
  console.log();
  console.log(chalk.red.bold.bgHex("#00ffff")(message));
};
