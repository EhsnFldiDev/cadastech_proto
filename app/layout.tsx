import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { TenantProvider } from '@/lib/tenant-context';
import { StoreProvider } from '@/lib/store-context';
import { ToastContainer } from '@/components/common/Toast';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'کاداستک | CadasTech - سامانه جامع دپارتمان‌های املاک و پلتفرم هوشمند تطابق ملکی',
  description: 'پلتفرم B2B چندمستأجره (Multi-Tenant) و White-Label برای مدیریت کمیسیون، پایپ‌لاین معاملات و موتور انطباق هوشمند فایل و متقاضی'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
        <TenantProvider>
          <StoreProvider>
            {children}
            <ToastContainer />
          </StoreProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
