// Eleventy plugins
const EleventyPluginPostCSS = require("./plugins/postcss")

// PostCSS plugins
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyPluginPostCSS, {
    input: "./styles/",
    output: "./_site/styles/",
    plugins: [tailwindcss(), autoprefixer()],
  })

  // [Disabling `domdiff` allows CSS to reload]:

  // eleventyConfig.setServerOptions({ domdiff: false })
}
