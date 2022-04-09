// vue.config.js
module.exports = {
    lintOnSave: false,
        //devServer:开发服务器配置项
        devServer: {
            // 小写的 procy
            proxy: {
                // 自定义代理名，请求时使用
                '/': {
                    //target:代表要跨域到哪（dy 要映射到 trget 的域名）
                    target: 'https://localhost:8081', //注意：结尾不要加 /
                    changeOrigin: true, //关键点：代表需要跨域
                    // 路径重写
                    pathRewrite: {
                        // ^:正则的字符串开头
                        // 把开头的 /bili 替换成 '',即删除开头的 /bili
                        // 如果不把 /bili 替换掉，那么请求地址中就会多一个 "/bili" ,请求路径就错了
                        '^/': ''
                    }
                }
                
            }
        }
    
}