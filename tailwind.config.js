/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          bg: '#F4ECD8',      // Màu nền be giấy cũ
          card: '#FAF6EB',    // Màu nền thẻ sản phẩm sáng hơn chút
          primary: '#8B5A2B', // Màu gỗ sồi / cà phê
          secondary: '#C19A6B',// Màu da bò
          text: '#3E2723',    // Màu chữ nâu đen (không dùng đen thui)
          accent: '#D32F2F',  // Đỏ gạch làm điểm nhấn (nút mua hàng)
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Font chữ có chân cổ điển
        sans: ['"Lora"', 'serif'],              // Font phụ cho văn bản dễ đọc
      }
    },
  },
  plugins: [],
}