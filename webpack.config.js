const HtmlwebpackPlugin = require('html-webpack-plugin');//通过npm安装
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack =require('webpack');//访问内置的插件
const path = require('path');
//定义一些文件夹的路径
const ROOT_PATH =path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH,'src/js');
const BUILD_PATH = path.resolve(ROOT_PATH,'dist');
//Template的文件夹路径
const TEM_PATH = path.resolve(ROOT_PATH,'templates');

const config ={
	entry:{
		//6个入口文件
		index:path.resolve(APP_PATH,'index'),
        editQuestionnaire: path.resolve(APP_PATH,'editQuestionnaire'),
        savedQuestionnaire:path.resolve(APP_PATH,'savedQuestionnaire'),
        fillQuestionnaire:path.resolve(APP_PATH,'fillQuestionnaire'),
        viewData:path.resolve(APP_PATH,'viewData'),
		vendors: ['jquery']
	},
	output:{
		path: BUILD_PATH,
		filename: '[name].[hash].js'
		//会根据entry的入口文件名称生成多个js文件，这里是（index.js,editQuestionnaire.js,和vendor.js）
	},
	devServer: {
		contentBase: ROOT_PATH,
		compress: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		port: 8888
	},
	module:{
		rules:[

			{
				test:/\.s?css$/,
				use:[
					'style-loader',
					'css-loader',
					'sass-loader'
				],
				/*
				include:[
					path.resolve(ROOT_PATH,'src/css')
				]
				*/
			},

			/*
			
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
                })
            },*/
            /*
			{
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.scss$/i,
                use: extractLESS.extract([ 'css-loader', 'sass-loader' ])
            },

            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader", "postcss-loader"]
                })
            },
            */
            {
            	test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				use: 'url-loader?limit=50000&name=[path][name].[ext]'
			},
			{
		        test: /\.(png|jpg)$/,
		        use:[
		          'url-loader?limit=40000'
		        ]
		    },
			{
				test:/\.jsx?$/,
				use:[
					{
						loader:'babel-loader',
						query:{
							presets:['es2015']
						}
					}
				],
				include:[
					path.resolve(ROOT_PATH,'src/js')
				]
			},
			{
				test:/\.(jsx|js)/,
				use:{
					loader:'jshint-loader',
					options:{
						esversion:6 //配置jshint的选项，支持es6的校验
					}
				},
				enforce:'pre',
				include:path.resolve(ROOT_PATH,'src/js'),
				exclude:/node_modules/
			}
		]
	},

	//添加插件，会自动生成5个HTML文件
	plugins :[
       /* extractCSS,
       extractLESS,
        */

		//创建了五个HtmlWebpackPlugin的实例，生成五个页面
		new HtmlwebpackPlugin({
            title:'问卷系统--首页',
            template: path.resolve(TEM_PATH,'index.html'),
            filename: 'index.html',
            //chunks这个参数告诉插件要引用entry里面的那几入口
            chunks:['vendors','index'],
            //要把script插入到标签里
            inject: 'body'
		}),
		new HtmlwebpackPlugin({
            title:'问卷系统--编辑页',
            template: path.resolve(TEM_PATH,'index.html'),
            filename: 'editQuestionnaire.html',
            //chunks这个参数告诉插件要引用entry里面的那几入口
            chunks:['editQuestionnaire','vendors'],
            //要把script插入到标签里
            inject: 'body'
		}),
        new HtmlwebpackPlugin({
            title:'问卷系统--修改保存页',
            template: path.resolve(TEM_PATH,'index.html'),
            filename: 'savedQuestionnaire.html',
            chunks:['vendors','savedQuestionnaire'],
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title:'问卷系统--填写问卷页',
            template: path.resolve(TEM_PATH,'index.html'),
            filename: 'fillQuestionnaire.html',
            chunks:['vendors','fillQuestionnaire'],
            inject: 'body'
        }),
        new HtmlwebpackPlugin({
            title:'问卷系统--查看数据页',
            template: path.resolve(TEM_PATH,'index.html'),
            filename: 'viewData.html',
            chunks:['vendors','viewData'],
            inject: 'body'
        }),
		new UglifyJSPlugin({
			//最紧凑的输出
			beautify:false,
			//删除所有的注释
			comments:false,
            compress:{
                //在UglifyJS删除没有用到的代码时不输出警告
                warnings:false,
                //删除所有的'console'语句
                //还可以兼容ie浏览器
                drop_console:true,
                //内嵌定义了但是只用到一次的变量
                collapse_vars:true,
                //提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars:true
            }
		}),
        //new ExtractTextPlugin("style.css"),

        //在每次构建前清理 /dist 文件夹
        //new CleanWebpackPlugin(['dist']),

	]
};

module.exports = config;