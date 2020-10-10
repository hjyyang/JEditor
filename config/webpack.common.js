const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let config = {
	entry: path.resolve(__dirname, "../main.js"),
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "index.js",
		chunkFilename: "js/[name].js",
		library: "JEditor",
		libraryTarget: "umd",
		umdNamedDefine: true,
	},
	mode: process.env.NODE_ENV == "development" ? "development" : "production",
	plugins: [
		new VueLoaderPlugin(),
		// new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [{ from: "statc/", to: "assets/", noErrorOnMissing: true }],
		}),
	],
	module: {
		//文件处理loader
		rules: [
			{
				test: /(\.vue)$/, //正则表达式匹配规则
				exclude: /node_modules/, //排除项目依赖包目录
				use: [
					//使用vue-loader加载器
					"vue-loader",
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										node: "current",
										chrome: "52",
										ie: "9",
									},
								},
							],
						],
						plugins: ["@babel/plugin-transform-runtime"],
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|jpg|gif|jpeg|svg)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							esModule: false,
							name: "[path][name].[ext]",
						},
					},
				],
			},
			{
				test: /\.(woff|ttf|eot|svg)/,
				loader: "file-loader?name=font/[name].[ext]",
			},
		],
	},
};

module.exports = config;
