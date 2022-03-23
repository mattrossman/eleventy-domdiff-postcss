const fs = require("fs")
const path = require("path")
const postcss = require("postcss")

module.exports = function (eleventyConfig, options = { input: "", output: "", plugins: [] }) {
  // Create output directory if needed
  fs.mkdirSync(options.output, { recursive: true })

  eleventyConfig.on("eleventy.before", async () => {
    // Locate all .css files within provided input directory
    const entries = fs
      .readdirSync(options.input, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.match(/.(css)$/))

    for (const entry of entries) {
      const inputPath = path.join(options.input, entry.name)
      const outputPath = path.join(options.output, entry.name)
      const css = fs.readFileSync(inputPath)

      const result = await postcss(options.plugins).process(css, { from: inputPath, to: outputPath })
      fs.writeFileSync(outputPath, result.css)

      console.log("[PostCSS] Compiled", outputPath)
    }
  })
}
