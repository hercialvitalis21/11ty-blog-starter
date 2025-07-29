const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const { minify } = require("html-minifier");
const esbuild = require("esbuild");
const path = require("path");

// Image optimization shortcode
async function imageShortcode(src, alt, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  // Performance: Copy assets with caching
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Enable caching for better build performance
  eleventyConfig.setDataDeepMerge(true);
  
  // Add plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // Image optimization
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
  
  // CSS minification
  eleventyConfig.addFilter("cssmin", function(code) {
    if (process.env.NODE_ENV === "production") {
      return new CleanCSS({}).minify(code).styles;
    }
    return code;
  });
  
  // JavaScript bundling and minification with esbuild
  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async function(inputContent, inputPath) {
      if (inputPath.endsWith(".11ty.js")) {
        return;
      }
      
      return async (data) => {
        if (process.env.NODE_ENV === "production") {
          let result = await esbuild.build({
            entryPoints: [inputPath],
            bundle: true,
            minify: true,
            sourcemap: false,
            target: ['es2020'],
            format: 'iife',
            write: false,
            treeShaking: true
          });
          return result.outputFiles[0].text;
        }
        return inputContent;
      };
    }
  });
  
  // HTML minification in production
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (process.env.NODE_ENV === "production" && outputPath && outputPath.endsWith(".html")) {
      let minified = minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      });
      return minified;
    }
    return content;
  });
  
  // Critical CSS extraction helper
  eleventyConfig.addFilter("criticalCSS", function(content) {
    // This would integrate with a critical CSS extraction tool
    return content;
  });
  
  // Performance: Set up watch targets for better dev experience
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");
  
  // Collections for better organization
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });
  
  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};