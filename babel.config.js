module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@vue/babel-preset-jsx',
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
  ];

  return {
    presets,
    plugins,
  };
};
