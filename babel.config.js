module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@vue/babel-preset-jsx',
  ];

  const plugins = [
  ];

  return {
    presets,
    plugins,
  };
};
