const webpack = require("webpack");

const config = require("./webpack.config");

const compiler = webpack(config);

compiler.run((error, stats) => {
  if (error) {
    // ошибка конфига
    console.error(error.stack || error);

    if (error.details) {
      console.error(error.details);
    }

    return null;
  }

  const info = stats.toString({
    hash: true,
    colors: true,
    modules: false,
  });

  console.log("Build completed");
  console.log(info);

  if (stats.hasErrors()) {
    // ошибка компиляции
    console.log("ERROR");
    console.error(info);
  }

  if (stats.hasWarnings()) {
    // ошибка компиляции
    console.log("WARNING");
    console.warn(info);
  }
});
