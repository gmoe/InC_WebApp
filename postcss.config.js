module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('doiuse')({
      ignore: ['multicolumn']
    })
  ]
};
