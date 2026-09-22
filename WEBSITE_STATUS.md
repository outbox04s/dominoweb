# DOMINO Website — Hiện trạng hệ thống

> Cập nhật: 22/09/2026
> Repository: `outbox04s/dominoweb`
> Stack chính: Next.js 15 + React 19 + TypeScript + Supabase + Vercel

## 1. Tổng quan

Website DOMINO hiện đang ở giai đoạn **đã có nền tảng public website + CMS/CRM cơ bản + kết nối Supabase thật**, nhưng chưa phải bản hoàn thiện cuối cùng để coi là production-ready về nội dung và UI/UX.

Hệ thống hiện đã có:

- Website public đa trang.
- Kết nối Supabase server-side.
- Dữ liệu dòng sản phẩm và bảo hành lấy từ database thật.
- Form lead public ghi vào CRM thông qua RPC.
- Khu vực admin có đăng nhập, dashboard lead, quản trị lead và quản lý bảo hành.
- RLS đang bật trên toàn bộ các bảng public chính.
- Homepage hiện đang được làm lại theo nhánh `feat/homepage-v2-final` trong PR #20.

Các phần vẫn chưa hoàn thiện:

- Media CMS chưa có dữ liệu thật.
- Project/công trình chưa có dữ liệu trong database.
- Tin tức/kiến thức chưa có dữ liệu trong database.
- Components/cấu tạo sản phẩm chưa có dữ liệu chi tiết.
- Header/Footer vẫn chưa dùng asset logo DOMINO chính thức.
- Homepage Production hiện vẫn là bản cũ; Homepage V2 đang ở PR #20 và chưa merge.
- Một số trang editorial vẫn đang dùng placeholder/demo visual thay vì ảnh DOMINO thật.
- Content CMS tổng quát chưa hoàn thiện; admin hiện mới mạnh ở CRM và Warranty.

---

## 2. Kiến trúc hiện tại

### Frontend / Full-stack app

- Next.js 15.5.x App Router
- React 19
- TypeScript 5.9
- CSS thuần + design tokens riêng
- Không dùng UI framework bên ngoài

`package.json` hiện có các dependency chính:

- `next`
- `react`
- `react-dom`
- `@supabase/supabase-js`
- `@supabase/ssr`

### Backend / Database

Supabase project: `dominoweb`

- Region: `ap-south-1`
- PostgreSQL: 17
- Trạng thái project: `ACTIVE_HEALTHY`

Website dùng Supabase cho:

- Product lines
- Warranty policies
- Components / cấu tạo
- Projects
- Posts / content
- Media metadata
- Contacts
- Leads
- Lead activities
- Homepage section configuration
- Profiles / roles

### Deployment

Luồng hiện tại:

```text
GitHub -> Vercel -> Supabase
```

- `main`: Production
- Feature branch: Preview
- PR #20 hiện dùng branch `feat/homepage-v2-final`

---

## 3. Trạng thái GitHub hiện tại

### Main branch

Production hiện đang ở `main`.

### Homepage V2

Hiện đang có PR:

- PR #20
- Title: `feat: homepage UI/UX v2 final`
- Branch: `feat/homepage-v2-final`
- Base: `main`
- Trạng thái: OPEN
- Mergeable: YES
- Chưa merge Production

Mục tiêu PR #20:

- Làm lại Homepage thành một phiên bản sạch, không tiếp tục vá CSS cũ.
- Cân bằng typography.
- Chuẩn hóa 4 product families.
- Làm lại Anatomy, Warranty, Process, Projects, Showroom, Knowledge, CTA.
- Dùng ảnh demo tạm thời cho tới khi Media CMS có ảnh DOMINO thật.

---

## 4. Public website hiện có

Các route chính đã tồn tại hoặc đã được triển khai:

```text
/
/san-pham
/san-pham/[slug]
/cong-trinh
/cong-trinh/[slug]
/tin-tuc
/tin-tuc/[slug]
/gioi-thieu
/showroom
/xuong-san-xuat
/bao-hanh
/faq
/lien-he
```

### Root layout

Root layout hiện gắn chung:

- Header
- Footer
- MobileShell

cho toàn bộ ứng dụng.

Điều này có nghĩa admin hiện vẫn nằm dưới cùng root layout kiến trúc tổng thể; về lâu dài nên tách route group website/admin để admin không phụ thuộc layout public.

---

## 5. Header / Navigation

Desktop header hiện có:

```text
Sản phẩm
Công trình
Tin tức
Về DOMINO
Liên hệ
```

Brand hiện vẫn render bằng text:

```text
DOMINO
GLASS KITCHEN
```

### Tồn tại cần xử lý

Logo chính thức DOMINO đã có asset riêng nhưng chưa được thay vào Header/Footer trong code Production.

Mục tiêu tiếp theo:

- Dùng logo thật.
- Không tự dựng lại wordmark bằng font.
- Giữ đúng tỷ lệ logo và phần `glass kitchen`.

---

## 6. Homepage — tình trạng hiện tại

### Production

Homepage trên `main` hiện là bản UI cũ đã được cải tiến nhiều vòng nhưng vẫn còn một số vấn đề:

- Typography từng quá lớn ở nhiều section.
- Flow trước đó hơi giống portfolio/concept site hơn digital showroom.
- Product Range từng hiển thị không đúng grouping mong muốn.
- Một số section dùng ảnh demo remote.
- Footer wordmark vẫn là text lớn.

### Homepage V2 — PR #20

Homepage V2 đang được rebuild với flow:

```text
Hero
-> One Specialty
-> Anatomy
-> Product Range
-> Warranty
-> Process / Workshop
-> Projects
-> Showroom
-> Knowledge
-> CTA
```

Hướng visual:

- BLACK / ARCHITECTURAL / MODERN LUXURY
- Không dùng gold làm nhận diện chính
- Luxury đến từ ảnh, tỷ lệ bố cục, khoảng trắng và typography
- Typography đã giảm scale so với bản cũ
- Desktop và mobile có composition riêng
- CSS V2 được isolate bằng namespace `.homeV2` / `.hv...`

### Product Range mong muốn

Public Homepage cần thể hiện 4 family:

```text
Basic
Signature
Premium
VIP
```

Trong khi database hiện có 6 product lines chi tiết.

Các biến thể sâu hơn sẽ được xử lý ở product detail / cấu trúc CMS thay vì làm Homepage rối.

---

## 7. Product system

### Database

`product_lines` hiện có:

- 6 records
- 6 published
- Có `parent_id`
- Có SEO fields
- Có `status`
- Có `sort_order`

Các field quan trọng:

```text
id
parent_id
name
slug
display_name
subtitle
short_description
description
positioning
status
sort_order
seo_title
seo_description
canonical_url
published_at
```

### Website query

Homepage hiện query các field:

```text
id
slug
display_name
subtitle
positioning
sort_order
parent_id
warranty_policies(...)
```

### Tình trạng

Product line data đã có thật, nhưng hệ cấu tạo chi tiết chưa hoàn chỉnh vì `components` hiện chưa có record nào.

---

## 8. Warranty system

Đây hiện là một trong những phần hoàn thiện nhất.

### Database

`warranty_policies`:

- 6 records
- 6 published
- Có liên kết tới `product_lines`
- Hỗ trợ:
  - bảo hành theo tháng
  - bảo hành theo năm
  - bảo hành trọn đời

Các field chính:

```text
product_line_id
frame_value
frame_unit
glass_value
glass_unit
maintenance_value
maintenance_unit
description
conditions
effective_from
effective_to
status
```

### Website

Warranty được dùng ở:

- Homepage
- Product pages
- `/bao-hanh`

### Admin Warranty CMS

Route:

```text
/admin/warranty
```

Admin có thể chỉnh:

- Khung / thùng
- Số năm hoặc trọn đời
- Cánh kính
- Bảo dưỡng
- Mô tả
- Điều kiện

Sau khi lưu sẽ revalidate:

```text
/
/san-pham
/bao-hanh
```

Nguyên tắc hiện tại: Warranty là **single source of truth**, không hard-code nhiều nơi.

---

## 9. Projects / Công trình

Schema đã có tương đối đầy đủ nhưng dữ liệu hiện đang trống.

### Database

`projects` hiện:

- 0 records
- 0 published

Có schema hỗ trợ:

```text
title
slug
project_type
kitchen_layout
product_line_id
location_text
completion_year
short_description
problem
value_delivered
featured
status
sort_order
show_project_value
project_value
SEO fields
```

### Public website

Đã có:

```text
/cong-trinh
/cong-trinh/[slug]
```

Nhưng do database chưa có data nên khả năng hiển thị thực tế vẫn chưa khai thác được.

### Việc còn thiếu

- Seed/import công trình thật.
- Ảnh thật.
- Gallery.
- Liên kết product line.
- Case-study content chuẩn.

---

## 10. Posts / Knowledge / News

### Database

`posts` hiện:

- 0 records
- 0 published

Post types hỗ trợ hiện tại:

```text
knowledge
project_news
company_news
```

Có các field:

```text
title
slug
excerpt
quick_answer
featured
status
seo_title
seo_description
canonical_url
published_at
content_updated_at
```

`post_blocks` đã có sẵn để phát triển block editor.

### Public website

Đã có:

```text
/tin-tuc
/tin-tuc/[slug]
```

Homepage cũng đã có query riêng lấy 3 bài `knowledge` mới nhất.

### Tình trạng

Backend schema đã sẵn sàng, nhưng content database hiện trống.

---

## 11. Components / cấu tạo sản phẩm

### Database

`component_categories`:

- 7 records

`components`:

- 0 records

`product_line_components`:

- 0 records

`project_components`:

- 0 records

Kiến trúc đã sẵn để biểu diễn:

- Cánh kính
- Khung / thùng tủ
- Bo cánh
- Bản lề
- Ray
- Phụ kiện
- Các cấu phần khác

Nhưng chưa có dữ liệu chi tiết.

### Tình trạng

UI Anatomy hiện vẫn chủ yếu là presentation layer; chưa được nối sâu vào components CMS thật.

---

## 12. Media system

### Database

`media` hiện:

- 0 records

Schema có:

```text
storage_path
original_filename
mime_type
width
height
file_size
alt_text
caption
credit
focal_x
focal_y
```

### Tình trạng

Đây là khoảng trống lớn hiện tại.

Website đang dùng một số ảnh remote/demo để định hình UI/UX.

Chưa có:

- Media Library hoàn chỉnh.
- Upload flow trong admin.
- Mapping ảnh từ media table vào Product / Project / Post / Homepage.
- Quy chuẩn crop/focal-point hoàn chỉnh.

---

## 13. CRM / Lead system

### Public lead form

API:

```text
POST /api/leads
```

Flow:

1. Validate name.
2. Normalize phone.
3. Validate phone Việt Nam.
4. Validate nhu cầu.
5. Gọi RPC `submit_public_lead`.
6. Lưu contact + lead ở backend.

Need hiện hỗ trợ:

```text
new_build
renovation
research
```

Form có honeypot qua field `company` để giảm spam đơn giản.

### Database hiện tại

- `contacts`: 0 records
- `leads`: 0 records
- `lead_activities`: 0 records

### Lead statuses

```text
new
contacted
consulting
appointment
converted
not_suitable
```

---

## 14. Admin dashboard

### Route

```text
/admin
```

Admin dashboard hiện có:

- Auth check qua Supabase Auth.
- Profile check.
- Tổng lead.
- Lead mới.
- Đang tư vấn.
- Đã chốt.
- Danh sách lead gần đây.
- Link vào CRM.

### Tình trạng Content CMS

Trong dashboard hiện hiển thị:

```text
Khách hàng / CRM -> đang hoạt động
Content CMS -> đang xây dựng
Website -> đang xây dựng
```

Điều này phản ánh đúng hiện trạng: Admin chưa phải full CMS hoàn chỉnh.

---

## 15. Auth / Roles

`profiles` hiện có:

- 1 record

Roles hỗ trợ:

```text
administrator
editor
sales
```

### Lưu ý kiến trúc

Role system đã có nền tảng nhưng quyền chi tiết giữa Content / CRM / Website vẫn cần siết lại ở giai đoạn sau.

---

## 16. Homepage Sections CMS

`homepage_sections` hiện:

- 2 records
- 2 visible

Schema:

```text
section_key
content jsonb
is_visible
sort_order
updated_at
```

### Tình trạng

Schema CMS cho Homepage đã có nhưng Homepage thực tế hiện chưa phụ thuộc hoàn toàn vào bảng này.

Một phần lớn copy/layout vẫn đang nằm trong source code.

Hướng tiếp theo nên là:

- Dùng CMS cho nội dung thay đổi thường xuyên.
- Không cho CMS điều khiển CSS/layout tùy ý.
- Giữ layout trong code.
- Content + media + visibility + ordering có thể quản trị qua admin.

---

## 17. RLS / Security

Toàn bộ các bảng public chính hiện đều đang bật RLS.

Ví dụ:

- product_lines
- warranty_policies
- projects
- posts
- media
- contacts
- leads
- lead_activities
- homepage_sections
- profiles

Đây là trạng thái đúng hướng về security.

Ngoài ra:

- Public lead không insert thẳng từ browser vào bảng leads.
- API server dùng RPC để tạo lead.
- Không expose service role trong frontend.

### Cần tiếp tục kiểm tra

- Policy theo từng role admin/editor/sales.
- Quyền sửa content của Sales.
- Media upload permissions.
- Audit log.
- Rate limiting / spam protection tốt hơn cho lead API.

---

## 18. Responsive / Mobile

Website đã có:

- Mobile bottom navigation.
- Full-screen mobile menu.
- Safe-area handling.
- Mobile-specific layout nhiều section.

Homepage V2 tiếp tục giữ nguyên định hướng:

```text
Home
Products
Projects
News
Menu
```

### Cần test thêm

- 360px
- 375px
- 390px
- 393px
- 412px
- 430px
- Tablet
- 1366px
- 1440px
- 1920px

---

## 19. SEO / GEO

Nền tảng đã có:

- Metadata root.
- SEO fields ở product/project/post.
- Canonical fields trong schema.
- `quick_answer` cho knowledge content.

### Cần hoàn thiện

- Metadata từng route đầy đủ.
- OG image thật.
- JSON-LD.
- Breadcrumb.
- LocalBusiness / Organization schema.
- FAQ schema.
- Article schema.
- Project/case-study structured data.
- Sitemap / robots review.
- Nội dung E-E-A-T thật.

---

## 20. Các vấn đề kỹ thuật đang tồn tại

### 20.1 CSS tích lũy nhiều lớp

`globals.css` đã trải qua nhiều vòng chỉnh Homepage.

Homepage V2 đã bắt đầu xử lý bằng cách isolate CSS qua namespace riêng, nhưng về lâu dài nên:

- Tách CSS theo page/feature.
- Giảm override nối tiếp.
- Giữ token dùng chung ở design system.

### 20.2 Admin và public cùng root layout

Nên tách route group:

```text
(website)
(admin)
```

để admin không bị phụ thuộc Header/Footer public.

### 20.3 Content còn hard-coded trong source

Một số copy public vẫn nằm trực tiếp trong JSX.

Cần xác định rõ:

- Nội dung nào nên ở CMS.
- Nội dung nào là structural UX và giữ trong code.

### 20.4 Demo imagery

Ảnh hiện tại chủ yếu phục vụ duyệt giao diện.

Không được coi các ảnh demo là:

- ảnh công trình DOMINO,
- ảnh showroom DOMINO,
- ảnh xưởng DOMINO.

Trước final launch cần thay bằng media thật.

---

## 21. Dữ liệu hiện tại trong Supabase

| Nhóm dữ liệu | Tổng | Published / Visible |
|---|---:|---:|
| Product lines | 6 | 6 |
| Warranty policies | 6 | 6 |
| Projects | 0 | 0 |
| Posts | 0 | 0 |
| Media | 0 | — |
| Contacts | 0 | — |
| Leads | 0 | — |
| Homepage sections | 2 | 2 |

Điều này cho thấy hiện website đã có **data model khá đầy đủ**, nhưng content thực tế mới tập trung vào **Product + Warranty**, còn Projects / Posts / Media / CRM data chưa được populate.

---

## 22. Đánh giá trạng thái theo module

| Module | Trạng thái |
|---|---|
| Core Next.js app | Hoạt động |
| Supabase connection | Hoạt động |
| Product schema | Hoạt động |
| Product content | Có dữ liệu |
| Warranty schema | Hoàn thiện tốt |
| Warranty CMS | Hoạt động |
| Project schema | Có |
| Project content | Chưa có |
| Post schema | Có |
| Post content | Chưa có |
| Media schema | Có |
| Media content/library | Chưa có |
| Public lead API | Hoạt động |
| CRM schema | Hoạt động |
| CRM data | Chưa có dữ liệu thực |
| Admin dashboard | Hoạt động |
| Full Content CMS | Chưa hoàn thiện |
| Homepage Production | Có, nhưng chưa final |
| Homepage V2 | Đang ở PR #20 |
| Logo official integration | Chưa hoàn thiện |
| Mobile navigation | Có |
| SEO foundation | Có nền tảng |
| GEO / structured data | Chưa hoàn thiện |

---

## 23. Ưu tiên tiếp theo

### P0 — trước khi coi Homepage là final

1. Hoàn thiện Homepage V2.
2. Merge PR #20 sau khi preview/build ổn.
3. Thay logo Header/Footer bằng asset chính thức.
4. Thay demo imagery bằng ảnh DOMINO thật.
5. Chốt đúng 4 family ở Homepage.
6. Test responsive toàn bộ breakpoint chính.

### P1 — Content & CMS

1. Populate Projects.
2. Populate Posts / Knowledge.
3. Populate Components.
4. Xây Media Library.
5. Liên kết media với Product / Project / Post / Homepage.
6. Xây admin quản lý content thực tế.

### P2 — CRM & vận hành

1. Nâng cấp lead filters/search.
2. Lead assignment.
3. Activity timeline rõ hơn.
4. Phân quyền admin/editor/sales cụ thể.
5. Reporting/KPI.
6. UTM tracking đầy đủ.

### P3 — SEO/GEO/Performance

1. Structured data.
2. Sitemap / robots.
3. OG image management.
4. Image optimization AVIF/WebP.
5. LCP / INP / CLS monitoring.
6. Audit accessibility.

---

## 24. Kết luận

Website DOMINO hiện đã vượt qua giai đoạn prototype kỹ thuật đơn giản và đang ở mức **MVP có backend thật + CMS/CRM foundation + public routes tương đối đầy đủ**.

Phần backend architecture hiện khá tốt để tiếp tục phát triển vì các entity chính đã được tách rõ:

```text
Products
Components
Warranty
Projects
Posts
Media
Contacts
Leads
Homepage Sections
Profiles
```

Điểm yếu lớn nhất hiện tại không phải thiếu schema, mà là:

- thiếu dữ liệu nội dung thật,
- thiếu media thật,
- Homepage UI/UX chưa chốt Production,
- CMS tổng quát chưa hoàn thiện,
- chưa hoàn thiện logo/media/SEO production assets.

Nếu hoàn thành Homepage V2 + Media CMS + populate Projects/Posts/Components, website sẽ chuyển từ trạng thái **MVP kỹ thuật** sang một **digital showroom thực sự cho DOMINO**.
