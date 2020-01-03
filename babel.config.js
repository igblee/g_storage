module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6.10'
        }
      }
    ]
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining'
  ]
}