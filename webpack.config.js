// Import thư viện path để xử lý và biến đổi đường dẫn file
const path = require('path');

// Import thư viện webpack để đóng gói các module
const webpack = require('webpack');

// Nạp biến môi trường từ file .env
require('dotenv').config();

module.exports = {
  // Điểm bắt đầu (entry point) của ứng dụng
  entry: './src/client/index.js',

  // Cấu hình đầu ra (output)
  output: {
    // Tên file đầu ra
    filename: 'bundle.js',
    // Đường dẫn thư mục đầu ra, dùng thư viện path để xác định
    path: path.resolve(__dirname, 'public')
  },

  // Sử dụng sourcemap để dễ dàng debug code
  devtool: 'eval-source-map',

  // Định nghĩa các quy tắc xử lý file
  module: {
    rules: [
      {
        // Quy tắc áp dụng cho file .js
        test: /\.js$/,
        // Loại trừ các thư viện như node_modules và bower_components
        exclude: /(node_modules|bower_components)/,
        use: {
          // Sử dụng babel-loader để transpile mã JavaScript
          loader: 'babel-loader',
          options: {
            // Preset hỗ trợ ES6+
            presets: [ 'env' ],
            // Plugin hỗ trợ JSX và Rest/Spread
            plugins: [
              // Chuyển JSX thành HTML thông qua pragma
              [ 'transform-react-jsx', {
                pragma: 'html'
              } ],
              // Plugin cho Object Rest/Spread
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      }
    ]
  },

  // Plugin định nghĩa biến môi trường
  plugins: [
    new webpack.DefinePlugin({
      // Định nghĩa biến môi trường REACT_APP_BACKEND_URL cho frontend
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL)
    })
  ],

  // Cấu hình server phát triển (development server)
  devServer: {
    // Thư mục nội dung tĩnh
    contentBase: path.join(__dirname, 'public'),
    // Bật tính năng nén (compression) cho nội dung tĩnh
    compress: true,
    // Cổng mà server sẽ chạy trên
    port: 8080,
    // Proxy cho các API để chuyển tiếp yêu cầu đến backend
    proxy: { '/api': process.env.REACT_APP_BACKEND_URL }
  }
}
