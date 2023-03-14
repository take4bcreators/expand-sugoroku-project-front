import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  plugins: [
    `gatsby-plugin-typescript`,           // TypeScript使用用
    `gatsby-plugin-typescript-checker`,   // TypeScript使用用
    `gatsby-plugin-sass`,                 // Sass使用用
    {                                     // ファイル読み込み用
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,             // CSV使用用
    `gatsby-transformer-json`,            // JSON使用用
  ],
}

export default config;
