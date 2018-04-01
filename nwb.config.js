module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactTailor',
      externals: {
        react: 'React'
      }
    }
  }
}
