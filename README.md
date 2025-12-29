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









git clone https://github.com/AmirrezaHasanlKhamse15/make--a--weblog-with-django-.git
cd weblog_project

└── weblog/              # تنظیمات پروژه و فایل‌های اصلی
    └── __pycache__
