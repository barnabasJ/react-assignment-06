module.exports = {
  // eslint-disable-line no-undef
  entry: "./src/index.tsx",
  module: {
    rules: [
    { 
      test: /\.tsx?$/, 
      use: [{
          loader: "babel-loader" 
        },
        {
          loader: "ts-loader"
        }
      ],
    }
  ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
