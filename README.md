<<<<<<< HEAD
# Make a Weblog with Django

یک پروژه وبلاگ پیشرفته با **Django** که شامل مدیریت کاربران، پست‌ها، دسته‌بندی‌ها و رسانه‌ها است. این پروژه با استفاده از Django REST Framework و JWT امکان ارائه API امن برای فرانت‌اند را فراهم می‌کند.

---

## ویژگی‌ها

- **مدیریت کاربران با سه نقش:**
  - **Admin:** دسترسی کامل به مدیریت سایت
  - **Author:** ثبت، ویرایش و حذف پست‌ها
  - **Reader:** مشاهده پست‌ها
- **پست‌ها شامل:**
  - عنوان، متن و محتوا
  - دسته‌بندی (Category)
  - تصویر، ویدیو و فایل صوتی
  - نویسنده و تاریخ انتشار
- **پنل ادمین سفارشی** برای مدیریت کاربران، پست‌ها و دسته‌بندی‌ها
- **API امن با JWT** برای احراز هویت و عملیات CRUD
- **امکان استفاده از Axios** برای فراخوانی API از فرانت‌اند
- ساختار **Multi-Page Application (MPA)**

---

## پیش‌نیازها

- Python 3.10+
- Django 5.x
- Django REST Framework
- djangorestframework-simplejwt

---

## ساختار کلی پروژه

```bash
weblog_project/
├── api/                 # اپلیکیشن API و سرویس‌های جانبی
│   ├── migrations/      # فایل‌های مهاجرت دیتابیس
│   │   └── __pycache__  
│   └── __pycache__      # فایل‌های کش پایتون
├── blog/                # اپلیکیشن مدیریت بلاگ
│   ├── migrations/
│   │   └── __pycache__
│   └── __pycache__
├── media/               # فایل‌های رسانه‌ای آپلود شده
│   ├── audio/
│   ├── images/
│   └── video/
├── user/                # اپلیکیشن مدیریت کاربران
│   ├── migrations/
│   │   └── __pycache__
│   └── __pycache__
└── weblog/              # تنظیمات پروژه و فایل‌های اصلی
    └── __pycache__
#################################


git clone https://github.com/AmirrezaHasanlKhamse15/make--a--weblog-with-django-.git
cd weblog_project

=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 26c4df0 (first)
