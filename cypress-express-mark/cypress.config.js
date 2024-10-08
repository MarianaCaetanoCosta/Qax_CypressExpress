const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  video: true, // Certifique-se de que está habilitado
  videoCompression: 32, // Opcional, ajusta a compressão do vídeo
  videosFolder: 'videos',
  screenshotsFolder: 'screenshots',
  defaultCommandTimeout: 60000,

  e2e: {
    baseUrl:'http://localhost:3000/',
    defaultCommandTimeout: 10000, // ajuste conforme necessário
    requestTimeout: 10000,
    
    env:{
      apiUrl: 'http://localhost:3333'
    },

    //Resolução Full-HD
    viewportWidth: 1920,
    viewportHeight: 1080,

    reporterOptions: {
      allureResultsPath: 'allure-results', // Caminho onde os resultados serão salvos
    },

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
      // implement node event listeners here

    },
  },
});
