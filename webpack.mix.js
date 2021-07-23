const mix = require('laravel-mix');
require("@pp-spaces/laravel-mix-graphql");
require('laravel-mix-alias');
let CompressionPlugin = require("compression-webpack-plugin");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .react('resources/js/admin.js', 'public/js')
    .sass('resources/sass/admin.scss', 'public/css')
    .alias({
        '@loc': '/resources/js/application/config/loc',
        '@localStorage': '/resources/js/application/config/localStorage',
        '@paths': '/resources/js/application/config/paths',
        '@app': '/resources/js/application/config/app',
        '@routes': '/resources/js/application/config/routes',
        '@modules': '/resources/js/application/modules',
        '@components': '/resources/js/application/components',
        '@containers': '/resources/js/application/containers',
        '@pages': '/resources/js/application/pages',
        '@common': '/resources/js/application/common',
        '@mutations': '/resources/js/application/graphql/mutations',
        '@queries': '/resources/js/application/graphql/queries',
        '@hooks': '/resources/js/application/hooks',
        '@material': '@material-ui/core',
        '@icons': '@material-ui/icons',

        '@locAdmin': '/resources/js/admin/config/loc',
        '@localStorageAdmin': '/resources/js/admin/config/localStorage',
        '@pathsAdmin': '/resources/js/admin/config/paths',
        '@appAdmin': '/resources/js/admin/config/app',
        '@routesAdmin': '/resources/js/admin/config/routes',
        '@modulesAdmin': '/resources/js/admin/modules',
        '@componentsAdmin': '/resources/js/admin/components',
        '@containersAdmin': '/resources/js/admin/containers',
        '@pagesAdmin': '/resources/js/admin/pages',
        '@commonAdmin': '/resources/js/admin/common',
        '@mutationsAdmin': '/resources/js/admin/graphql/mutations',
        '@queriesAdmin': '/resources/js/admin/graphql/queries',
        '@hooksAdmin': '/resources/js/admin/hooks',
        '@storeAdmin': '/resources/js/admin/store',

        '~': '/resources/sass',
    })
    .version()
    .graphql();


if (process.env.NODE_ENV === "production") {


    mix.webpackConfig({
        plugins: [
            new CompressionPlugin()
        ],

    });


}


