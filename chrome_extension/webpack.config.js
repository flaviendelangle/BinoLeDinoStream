module.exports = [
    {
        entry: './src/background.js',
        output: {
            path: __dirname,
            filename: 'build/background.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        },
        devtool: 'source-map'
    },
    {
        entry: './src/app.js',
        output: {
            path: __dirname,
            filename: 'build/app.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        },
        devtool: 'source-map'
    }
];
