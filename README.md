# JSON Formatter

![JSON Formatter](https://img.shields.io/badge/JSON-Formatter-blue?style=for-the-badge&logo=json)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen?style=for-the-badge)

Một công cụ web miễn phí để format, validate và minify JSON với giao diện đẹp và dễ sử dụng.

## 🌟 Tính năng

- ✨ **Format JSON** - Chuyển đổi JSON từ minified sang pretty-printed
- 🔍 **Validate JSON** - Kiểm tra tính hợp lệ của JSON
- 📦 **Minify JSON** - Nén JSON để tiết kiệm dung lượng
- 🎨 **Syntax Highlighting** - Tô màu cú pháp JSON
- 📋 **Copy/Paste** - Hỗ trợ copy từ clipboard và paste
- 💾 **Download** - Tải xuống kết quả dưới dạng file .json
- 📱 **Responsive** - Tương thích với mọi thiết bị
- ⌨️ **Keyboard Shortcuts** - Phím tắt tiện lợi

## 🚀 Demo

Truy cập: [https://your-username.github.io/json-formatter](https://your-username.github.io/json-formatter)

## 🛠️ Cách sử dụng

### Format JSON
1. Nhập JSON vào ô input
2. Nhấn nút "Format JSON" hoặc `Ctrl+Enter`
3. Kết quả sẽ hiển thị ở ô output với syntax highlighting

### Validate JSON
1. Nhập JSON cần kiểm tra
2. Nhấn nút "Validate"
3. Hệ thống sẽ báo lỗi nếu JSON không hợp lệ

### Minify JSON
1. Nhập JSON đã format
2. Nhấn nút "Minify"
3. Nhận được JSON đã được nén

### Tùy chọn
- **Sắp xếp keys**: Tự động sắp xếp các key theo thứ tự alphabet
- **Xóa comments**: Loại bỏ các comment trong JSON

## ⌨️ Keyboard Shortcuts

| Phím tắt | Chức năng |
|----------|-----------|
| `Ctrl+Enter` | Format JSON |
| `Ctrl+K` | Xóa tất cả |
| `Ctrl+Shift+C` | Copy kết quả |

## 📁 Cấu trúc project

```
json-formatter/
├── index.html          # File HTML chính
├── styles.css          # CSS styling
├── script.js           # JavaScript logic
└── README.md           # Tài liệu hướng dẫn
```

## 🚀 Deploy lên GitHub Pages

### Bước 1: Tạo repository trên GitHub
1. Tạo repository mới trên GitHub
2. Clone repository về máy local

### Bước 2: Upload code
```bash
git clone https://github.com/your-username/json-formatter.git
cd json-formatter
# Copy các file đã tạo vào thư mục này
git add .
git commit -m "Initial commit: JSON Formatter"
git push origin main
```

### Bước 3: Enable GitHub Pages
1. Vào repository trên GitHub
2. Vào tab **Settings**
3. Cuộn xuống phần **Pages**
4. Chọn **Source**: Deploy from a branch
5. Chọn **Branch**: main
6. Nhấn **Save**

### Bước 4: Truy cập website
Sau vài phút, website sẽ có sẵn tại:
`https://your-username.github.io/json-formatter`

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc trang web
- **CSS3** - Styling và responsive design
- **Vanilla JavaScript** - Logic xử lý JSON
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📱 Responsive Design

Website được thiết kế responsive, tương thích với:
- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🔧 Tùy chỉnh

Bạn có thể tùy chỉnh giao diện bằng cách chỉnh sửa file `styles.css`:

```css
/* Thay đổi màu chủ đạo */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}
```

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

Mọi đóng góp đều được chào đón! Hãy:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Liên hệ

Nếu có vấn đề hoặc góp ý, hãy tạo [Issue](https://github.com/your-username/json-formatter/issues) trên GitHub.

---

⭐ Nếu project này hữu ích, hãy cho một star nhé!
