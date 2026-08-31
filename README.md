# CadasTech Prototype (کاداستک)

پلتفرم B2B چندمستأجره (Multi-Tenant) و White-Label برای دپارتمان‌ها و آژانس‌های املاک در ایران (`cadastech.ir`).

## تکنولوژی‌های استفاده‌شده
- **فریم‌ورک**: Next.js (App Router), TypeScript, Tailwind CSS, Lucide-react
- **طراحی**: راست‌چین کامل (RTL) با فونت استاندارد Vazirmatn، پشتیبانی از متغیرهای پویا برای White-Label
- **موتور انطباق هوشمند**: انطباق بلادرنگ فایل‌های ملکی با تقاضای خریداران
- **فرمول‌ساز کمیسیون**: سیستم پویا و ماشین‌حساب زنده برای تسهیم درصدی پورسانت
- **پایپ‌لاین ۴ مرحله‌ای**: کارشناسی، بازدید، نشست، قرارداد و تسویه

## راه‌اندازی و اجرا
```bash
npm install
npm run dev
```

آدرس مرورگر: [http://localhost:3000](http://localhost:3000)

## مسیرها (Routes)
- `/`: شبیه‌ساز همزمان دو نمایشگر (Desktop + Mobile)
- `/dashboard/manager`: داشبورد مدیریتی دسکتاپ
- `/dashboard/agent`: اپلیکیشن همراه مشاور (PWA Mobile)
