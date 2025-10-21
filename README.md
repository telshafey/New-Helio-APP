#  Helio APP - الدليل الشامل لمدينة هليوبوليس الجديدة

![Helio Logo](https://i.ibb.co/7v49zC6/helio-logo.png)

مرحباً بك في المستودع الرسمي لتطبيق Helio، البوابة الرقمية المتكاملة لسكان وزوار مدينة هليوبوليس الجديدة.

---

## 📜 جدول المحتويات

- [وصف المشروع](#-وصف-المشروع)
- [هيكل المشروع (Monorepo)](#-هيكل-المشروع-monorepo)
- [تعليمات التشغيل](#-تعليمات-التشغيل)
  - [تشغيل تطبيق الويب](#-تشغيل-تطبيق-الويب)
  - [تشغيل تطبيق الموبايل](#-تشغيل-تطبيق-الموبايل)
- [دليل مهندس الواجهة الخلفية (Backend)](#-دليل-مهندس-الواجهة-الخلفية-backend)
  - [العقد (The Contract): `packages/shared-logic/types.ts`](#-العقد-the-contract-packagesshared-logictypests)
  - [آلية المصادقة (JWT)](#-آلية-المصادقة-jwt)
  - [قائمة نقاط النهاية المطلوبة (API Endpoints)](#-قائمة-نقاط-النهاية-المطلوبة-api-endpoints)
  - [اعتبارات تنفيذية إضافية](#-اعتبارات-تنفيذية-إضافية)
  - [معالجة الأخطاء (Error Handling)](#-معالجة-الأخطاء-error-handling)
  - [استبدال البيانات الوهمية (Mock Data)](#-استبدال-البيانات-الوهمية-mock-data)

---

## 🎯 وصف المشروع

**Helio App** هو تطبيق شامل يهدف إلى أن يكون الرفيق اليومي لكل ساكن في مدينة هليوبوليس الجديدة. يوفر التطبيق منصة موحدة تجمع بين:

- **دليل خدمات شامل**: من مطاعم ومستشفيات إلى خدمات الصيانة والتعليم.
- **أخبار وإعلانات**: لإبقاء السكان على اطلاع دائم بآخر المستجدات.
- **مجتمع تفاعلي**: منتديات للنقاش، سوق للبيع والشراء، قسم للوظائف، وآخر للمفقودات.
- **خدمات المدينة**: معلومات عن خدمات جهاز المدينة، أرقام الطوارئ، وجداول المواصلات.

## 🏗️ هيكل المشروع (Monorepo)

تم بناء هذا المشروع باستخدام هيكل **Monorepo** لإدارة تطبيقات الويب والموبايل بكفاءة ومشاركة المنطق البرمجي بينها.

- `apps/web`: يحتوي على تطبيق الويب المبني باستخدام **React**. هذا هو التطبيق العام الذي يتصفحه المستخدمون عبر المتصفح.
- `apps/mobile`: (قيد التطوير) يحتوي على تطبيق الموبايل المبني باستخدام **React Native**.
- `packages/shared-logic`: هذا هو قلب المشروع، حيث يتم وضع كل الأكواد المشتركة بين تطبيقي الويب والموبايل.
  - `context/`: مزودات الحالة العامة (Context Providers) لإدارة البيانات مثل المستخدمين، الخدمات، الأخبار، إلخ.
  - `data/`: يحتوي على البيانات الوهمية (Mock Data) المستخدمة حالياً لتشغيل التطبيق.
  - `types.ts`: **ملف العقد** الذي يحدد أنواع وهياكل البيانات المستخدمة في المشروع بأكمله.

---

## 🚀 تعليمات التشغيل

لتشغيل المشروع محلياً، تأكد من وجود `Node.js` و `npm` (أو `yarn`) على جهازك.

1.  **تثبيت الحزم:** في المجلد الرئيسي للمشروع، قم بتشغيل:
    ```bash
    npm install
    ```

### 🌐 تشغيل تطبيق الويب

1.  انتقل إلى مجلد تطبيق الويب:
    ```bash
    cd apps/web
    ```
2.  قم بتشغيل خادم التطوير:
    ```bash
    npm start
    ```
3.  سيتم فتح التطبيق تلقائياً في متصفحك على العنوان `http://localhost:3000`.

### 📱 تشغيل تطبيق الموبايل

1.  تأكد من إعداد بيئة React Native على جهازك (Android Studio / Xcode).
2.  انتقل إلى مجلد تطبيق الموبايل:
    ```bash
    cd apps/mobile
    ```
3.  قم بتشغيل التطبيق على المحاكي أو الجهاز:
    ```bash
    # For Android
    npm run android

    # For iOS
    npm run ios
    ```

---

## 👨‍💻 دليل مهندس الواجهة الخلفية (Backend)

مرحباً بك! هذا القسم مخصص لك لمساعدتك في بناء الواجهة الخلفية (Backend) التي ستخدم هذا التطبيق. الهدف هو استبدال البيانات الوهمية الحالية بطلبات شبكة حقيقية (API Calls).

### 📝 العقد (The Contract): `packages/shared-logic/types.ts`

**هذا هو أهم ملف في المشروع بالنسبة لنا.**

يعتبر ملف `types.ts` بمثابة **العقد الملزم** بين الواجهة الأمامية (Frontend) والواجهة الخلفية (Backend). أي بيانات يتم إرسالها أو استقبالها يجب أن تتطابق تماماً مع الهياكل (Interfaces & Types) المحددة في هذا الملف.

- **لماذا هو مهم؟**: يضمن هذا الملف الاتساق ويمنع الأخطاء، ويوفر مصدراً واحداً للحقيقة (Single Source of Truth) لهيكل البيانات.
- **آلية العمل**: عند بناء أي Endpoint، ارجع إلى هذا الملف لمعرفة شكل البيانات المتوقع في الطلب (Request Payload) والاستجابة (Response Body). أي تعديل مستقبلي على شكل البيانات يجب أن يتم أولاً في هذا الملف بالاتفاق بين الفريقين.

### 🔐 آلية المصادقة (JWT)

نقترح استخدام **JSON Web Tokens (JWTs)** للمصادقة. التدفق المقترح كالتالي:

1.  **تسجيل الدخول (`/auth/login`):** يرسل المستخدم البريد الإلكتروني وكلمة المرور. عند التحقق بنجاح، يقوم الخادم بإنشاء وإرجاع:
    - `accessToken`: توكن قصير الأجل (e.g., 15 minutes) يتم إرساله مع كل طلب مصادق عليه.
    - `refreshToken`: توكن طويل الأجل (e.g., 7 days) يستخدم لتجديد `accessToken`.
2.  **التخزين**: يقوم الـ Frontend بتخزين `accessToken` في ذاكرة التطبيق (In-memory) و `refreshToken` في `HttpOnly cookie` لزيادة الأمان.
3.  **الطلبات المصادق عليها**: يتم إرسال `accessToken` في هيدر `Authorization` مع كل طلب يتطلب مصادقة:
    `Authorization: Bearer <accessToken>`
4.  **انتهاء صلاحية التوكن**: إذا انتهت صلاحية `accessToken`، سيرجع الخادم استجابة `401 Unauthorized`.
5.  **تجديد التوكن (`/auth/refresh`):** يقوم الـ Frontend بإرسال طلب إلى هذا الـ Endpoint (مع `refreshToken` في الـ cookie) للحصول على `accessToken` جديد ومواصلة الجلسة دون مقاطعة المستخدم.

### 🔚 قائمة نقاط النهاية المطلوبة (API Endpoints)

بناءً على الميزات الحالية في التطبيق، هذه هي قائمة الـ Endpoints المقترحة.

**المصادقة (Auth)**

- `POST /auth/register`: إنشاء حساب مستخدم جديد.
- `POST /auth/login`: تسجيل دخول المستخدم.
- `POST /auth/logout`: تسجيل خروج المستخدم (اختياري، يمكن التعامل معه من جانب الخادم).
- `POST /auth/refresh`: تجديد `accessToken`.
- `POST /auth/admin/login`: تسجيل دخول المسؤولين.

**المستخدمون (Users)**

- `GET /users`: الحصول على قائمة جميع المستخدمين.
- `GET /users/:id`: الحصول على بيانات مستخدم معين.
- `PUT /users/:id`: تحديث بيانات مستخدم (من قبل المستخدم نفسه أو الأدمن).
- `DELETE /users/:id`: حذف مستخدم (من قبل الأدمن).
- `POST /users/:id/request-deletion`: طلب حذف الحساب (من قبل المستخدم).
- `PUT /users/:id/role`: تحديث دور المستخدم (من قبل الأدمن).

**الخدمات (Services) & التقييمات (Reviews)**

- `GET /services`: الحصول على قائمة جميع الخدمات (مع دعم للفلترة والترتيب).
- `GET /services/:id`: الحصول على تفاصيل خدمة معينة.
- `POST /services`: إضافة خدمة جديدة (للأدمن).
- `PUT /services/:id`: تحديث خدمة (للأدمن).
- `DELETE /services/:id`: حذف خدمة (للأدمن).
- `POST /services/:id/reviews`: إضافة تقييم جديد لخدمة.
- `PUT /services/:serviceId/reviews/:reviewId`: تحديث تقييم (للأدمن أو صاحب التقييم).
- `DELETE /services/:serviceId/reviews/:reviewId`: حذف تقييم.
- `POST /services/:serviceId/reviews/:reviewId/reply`: إضافة رد من الأدمن على تقييم.

**العقارات (Properties)**

- `GET /properties`: الحصول على قائمة العقارات.
- `POST /properties`: إضافة عقار جديد.
- `PUT /properties/:id`: تحديث عقار.
- `DELETE /properties/:id`: حذف عقار.

**المجتمع (Community)**

- `GET /posts`: الحصول على جميع المنشورات (مع دعم للفلترة حسب الدائرة والنوع).
- `POST /posts`: إنشاء منشور جديد.
- `PUT /posts/:id`: تعديل منشور.
- `DELETE /posts/:id`: حذف منشور.
- `POST /posts/:id/like`: الإعجاب بمنشور أو إلغاء الإعجاب.
- `POST /posts/:id/pin`: تثبيت منشور أو إلغاء التثبيت.
- `POST /posts/:id/poll/:optionIndex`: التصويت في استطلاع رأي.
- `POST /posts/:id/comments`: إضافة تعليق جديد.
- `DELETE /posts/:postId/comments/:commentId`: حذف تعليق.

**السوق، الوظائف، المفقودات (Marketplace, Jobs, Lost & Found)**

- `GET /marketplace`, `POST /marketplace`, `PUT /marketplace/:id`, `DELETE /marketplace/:id`
- `GET /jobs`, `POST /jobs`, `PUT /jobs/:id`, `DELETE /jobs/:id`
- `GET /lost-and-found`, `POST /lost-and-found`, `PUT /lost-and-found/:id`, `DELETE /lost-and-found/:id`
- `PUT /<feature>/:id/status`: لتغيير حالة الإعلان (pending, approved, rejected).

**العروض (Offers)**

- `GET /offers`: الحصول على العروض المعتمدة والنشطة.
- `POST /offers`: إنشاء عرض جديد (من قبل مقدم الخدمة).
- `PUT /offers/:id`: تحديث عرض.
- `DELETE /offers/:id`: حذف عرض.
- `PUT /offers/:id/status`: تحديث حالة العرض (للأدمن).
- `POST /offers/:id/claim`: حصول المستخدم على كود للعرض.
- `POST /offers/redeem`: استخدام الكود من قبل مقدم الخدمة.

**الأخبار، الإعلانات، الإشعارات (News, Ads, Notifications)**

- `GET /news`, `POST /news`, `PUT /news/:id`, `DELETE /news/:id`
- `GET /advertisements`, `POST /advertisements`, `PUT /advertisements/:id`, `DELETE /advertisements/:id`
- `GET /notifications`, `POST /notifications`, `PUT /notifications/:id`, `DELETE /notifications/:id`

**بيانات أخرى (Other Data)**

- `GET /emergency-contacts`, `PUT /emergency-contacts`
- `GET /transportation`, `PUT /transportation`
- `GET /service-guides`, `PUT /service-guides`
- `GET /public-content`, `PUT /public-content`

### 💡 اعتبارات تنفيذية إضافية

لضمان بناء نظام قوي وقابل للتطوير، إليك بعض الاعتبارات الهامة التي يجب أخذها في الحسبان عند بناء الـ API.

#### 1. ترقيم الصفحات (Pagination)

لجميع الـ Endpoints التي تُرجع قوائم طويلة (مثل `GET /services`, `GET /posts`)، يجب دعم ترقيم الصفحات (Pagination) لتجنب تحميل كميات كبيرة من البيانات مرة واحدة.

**اقتراح:** استخدم `limit` و `offset` (أو `page` و `pageSize`).

-   **الطلب:** `GET /api/posts?page=1&pageSize=10`
-   **الاستجابة:** يجب أن يكون شكل الاستجابة موحداً كالتالي:

```json
{
  "data": [ /* ...items... */ ],
  "pagination": {
    "totalItems": 123,
    "totalPages": 13,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

#### 2. الفرز والتصفية (Sorting & Filtering)

يجب أن تدعم الـ Endpoints التي تُرجع قوائم إمكانية الفرز والتصفية عبر Query Parameters.

-   **مثال:** `GET /api/properties?sortBy=price&order=asc&type=sale&minPrice=1000000`
-   هذا يوفر مرونة كبيرة للواجهة الأمامية لعرض البيانات بالطريقة التي يختارها المستخدم.

#### 3. رفع الملفات (File Uploads)

التطبيق يحتوي على ميزات لرفع الصور (صور الخدمات، صور المستخدمين، إلخ).

-   **آلية الرفع**: يجب أن تستقبل الـ Endpoints المسؤولة عن ذلك الطلبات من نوع `multipart/form-data`.
-   **التخزين**: يُفضل بشدة تخزين الملفات على خدمة تخزين سحابية (مثل **AWS S3** أو **Cloudinary**) بدلاً من نظام ملفات الخادم مباشرة. هذا يضمن قابلية التوسع (Scalability) ويفصل بين منطق التطبيق وملفاته.
-   **الاستجابة**: بعد نجاح الرفع، يجب أن يُرجع الـ Endpoint رابط (URL) الملف الذي تم تخزينه ليتم حفظه في قاعدة البيانات.

#### 4. متغيرات البيئة (Environment Variables)

يجب استخدام ملف `.env` لتخزين جميع الإعدادات الحساسة والمتغيرات الخاصة ببيئة التشغيل.

-   **مثال للمتغيرات**:
    -   `DATABASE_URL`: رابط الاتصال بقاعدة البيانات.
    -   `JWT_SECRET`: المفتاح السري لتوقيع توكنات JWT.
    -   `REFRESH_TOKEN_SECRET`: مفتاح سري منفصل لـ Refresh Tokens.
    -   `PORT`: رقم المنفذ الذي يعمل عليه الخادم.
    -   `S3_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`: بيانات خدمة تخزين الملفات.
-   يجب إضافة ملف `.env.example` إلى المستودع يحتوي على أسماء المتغيرات المطلوبة بدون قيمها الفعلية.

```
# .env.example
DATABASE_URL=
JWT_SECRET=
REFRESH_TOKEN_SECRET=
PORT=5000
```

### 🚨 معالجة الأخطاء (Error Handling)

لضمان تجربة مستخدم سلسة وموثوقة، يجب اتباع نهج موحد لمعالجة الأخطاء بين الواجهة الأمامية والخلفية.

#### 1. الواجهة الخلفية: توحيد شكل استجابة الخطأ

يجب أن تعيد جميع استجابات الخطأ من الـ API (أكواد 4xx و 5xx) كائن JSON بالشكل الموحد التالي:

```json
{
  "message": "رسالة خطأ واضحة ومفهومة للمستخدم.",
  "error": "UNIQUE_ERROR_CODE",
  "details": { /* (اختياري) تفاصيل إضافية للمطورين */ }
}
```

هذا يسهل على الواجهة الأمامية عرض رسائل مناسبة للمستخدم.

#### 2. الواجهة الأمامية: التعامل الاستباقي مع الأخطاء

يجب أن تكون جميع طلبات الشبكة (API calls) داخل `try...catch` block.

-   **عند الفشل (في `catch` block):**
    1.  قراءة رسالة الخطأ من استجابة الـ API (e.g., `error.response.data.message`).
    2.  استخدام مكون `Toast` لعرض رسالة الخطأ للمستخدم بشكل واضح وغير مزعج.
    3.  يمكن اتخاذ إجراءات إضافية بناءً على `error.response.data.error` (مثل إعادة التوجيه عند انتهاء الجلسة).

#### 3. أخطاء التحقق من المدخلات (Validation Errors)

عندما يرسل المستخدم بيانات غير صالحة (e.g., بريد إلكتروني بدون `@`)، يجب أن يعيد الـ API استجابة `422 Unprocessable Entity` مع تفاصيل الأخطاء لكل حقل:

```json
{
  "message": "البيانات المدخلة غير صالحة.",
  "errors": {
    "email": "صيغة البريد الإلكتروني غير صحيحة.",
    "password": "كلمة المرور يجب أن لا تقل عن 8 أحرف."
  }
}
```

الواجهة الأمامية ستقوم بقراءة كائن `errors` وعرض كل رسالة خطأ تحت الحقل المناسب لها في الفورم.

#### 4. التعامل المركزي مع الأخطاء (Global Error Handling)

يمكن استخدام "interceptors" (في مكتبة مثل Axios) للتعامل مع الأخطاء الشائعة على مستوى التطبيق بأكمله، مثل:

-   **خطأ `401 Unauthorized`:** محاولة تجديد `accessToken` أو تسجيل خروج المستخدم تلقائياً.
-   **أخطاء الشبكة (Network Errors):** عرض رسالة عامة تفيد بوجود مشكلة في الاتصال بالإنترنت.

### 🔄 استبدال البيانات الوهمية (Mock Data)

البيانات الحالية يتم استدعاؤها من `packages/shared-logic/data/mock-data.ts` وتُدار حالتها عبر React Context في `packages/shared-logic/context/`.

**مهمتك**: استبدال المنطق الحالي بطلبات API حقيقية.

**مثال: استبدال بيانات الخدمات في `ServicesContext.tsx`**

**الوضع الحالي (Before):**

```tsx
import { mockServices } from '../data/mock-data';

// ...
const [services, setServices] = useState<Service[]>(mockServices);
// ...
```

**الوضع المطلوب (After):**

```tsx
import axios from 'axios'; // or fetch

// ...
const [services, setServices] = useState<Service[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);

// Then, update handler functions (e.g., handleSaveService) to make POST/PUT requests instead of just updating state.
// ...
```

يجب تطبيق هذا النمط على جميع الـ Contexts الأخرى (`PropertiesContext`, `NewsContext`, `CommunityContext`, إلخ).

---

نتطلع للعمل معك لجعل تطبيق Helio حقيقة واقعة!
