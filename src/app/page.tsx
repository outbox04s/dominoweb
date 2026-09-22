import Link from "next/link";
import {getFeaturedProjects,getKnowledgePosts,getProductLines} from "@/features/home/data";
import {ScrollReveal} from "@/components/ui/ScrollReveal";

type Warranty={frame_value:number|null;frame_unit:string;glass_value:number|null;glass_unit:string|null;maintenance_value:number|null;maintenance_unit:string|null};
type Product=Awaited<ReturnType<typeof getProductLines>>[number];
function firstWarranty(w:Warranty[]|Warranty|null){return Array.isArray(w)?w[0]:w}
function warrantyText(w:Warranty[]|Warranty|null){const x=firstWarranty(w);if(!x)return "Xem chính sách";return x.frame_unit==="lifetime"?"Bảo hành khung / thùng trọn đời":`${x.frame_value} năm bảo hành khung / thùng`}
function pickFamily(products:Product[],rx:RegExp){return products.find(p=>rx.test(`${p.display_name} ${p.slug}`))}
export default async function HomePage(){
 const[products,projects,posts]=await Promise.all([getProductLines(),getFeaturedProjects(),getKnowledgePosts()]);
 const families=[pickFamily(products,/basic/i),pickFamily(products,/signature/i),pickFamily(products,/premium(?!.*nham|.*matte)/i),pickFamily(products,/vip/i)].filter((p):p is Product=>Boolean(p));
 const maxYear=Math.max(0,...products.map(p=>{const w=firstWarranty(p.warranty_policies);return w?.frame_unit==="year"?w.frame_value??0:0}));
 const maxGlass=Math.max(0,...products.map(p=>firstWarranty(p.warranty_policies)?.glass_value??0));
 const lifetime=products.some(p=>firstWarranty(p.warranty_policies)?.frame_unit==="lifetime");
 return <main className="homeV2">
  <ScrollReveal/>
  <section className="hvHero">
   <div className="hvHeroPhoto"/>
   <div className="hvHeroCopy"><p className="hvKicker">DOMINO / GLASS KITCHEN / SINCE 2015</p><h1>TỦ BẾP<br/>CHO NHỮNG NĂM THÁNG<br/>PHÍA TRƯỚC.</h1><p className="hvLead">Chuyên sâu tủ bếp cánh kính INOX — từ cấu tạo, sản xuất đến lắp đặt và bảo hành.</p><a href="#specialty">KHÁM PHÁ <span>↓</span></a></div>
   <div className="hvHeroMeta"><span>THÁI BÌNH / VIỆT NAM</span><span>DESIGN · PRODUCTION · INSTALLATION</span></div>
  </section>
  <section id="specialty" className="hvStatement"><div><p className="hvKicker">01 / ONE SPECIALTY</p><h2>CHỈ TẬP TRUNG<br/>VÀO TỦ BẾP.</h2></div><div><p>DOMINO lựa chọn đi sâu vào một sản phẩm. Mỗi chi tiết được phát triển để phục vụ trải nghiệm sử dụng lâu dài — không phải để chạy theo số lượng.</p><Link href="/gioi-thieu">VỀ DOMINO →</Link></div></section>
  <section className="hvAnatomy"><div className="hvPhoto hvAnatomyPhoto"><span>DEMO VISUAL</span></div><div className="hvAnatomyCopy"><p className="hvKicker">02 / CẤU TẠO</p><h2>BỀN BẮT ĐẦU<br/>TỪ BÊN TRONG.</h2><p className="hvIntro">Một căn bếp tốt không chỉ nằm ở bề mặt. DOMINO tập trung vào cấu tạo, chuyển động và khả năng sử dụng mỗi ngày.</p><div className="hvRows">{["Cánh kính","Khung & thùng tủ","Bo cánh","Bản lề & ray","Phụ kiện"].map((x,i)=><Link href="/san-pham" key={x}><span>0{i+1}</span><strong>{x}</strong><b>→</b></Link>)}</div></div></section>
  <section className="hvRange"><header><p className="hvKicker">03 / PRODUCT RANGE</p><h2>BỐN DÒNG.<br/>MỘT TIÊU CHUẨN.</h2><p>Mỗi cấu hình là một lựa chọn khác nhau về trải nghiệm và độ bền. Không công khai giá — tư vấn dựa trên nhu cầu thực tế của căn bếp.</p></header><div className="hvProductGrid">{families.map((p,i)=><Link className={`hvProduct hvProduct${i+1}`} href={`/san-pham/${p.slug}`} key={p.id}><span className="hvDemo">DEMO VISUAL</span><div><small>0{i+1}</small><h3>{p.display_name.replace(/DOMINO\s*/i,"")}</h3><p>{p.subtitle||p.positioning}</p></div><b>{warrantyText(p.warranty_policies)} ↗</b></Link>)}</div></section>
  <section className="hvWarranty"><div><p className="hvKicker">04 / BUILT TO LAST</p><h2>CAM KẾT<br/>ĐƯỢC ĐO BẰNG<br/>THỜI GIAN.</h2><Link href="/bao-hanh">CHÍNH SÁCH BẢO HÀNH →</Link></div><div className="hvWarrantyStats"><article><strong>{maxYear}</strong><span>NĂM</span><p>Khung / thùng ở các dòng áp dụng bảo hành theo năm.</p></article><article><strong>{lifetime?"∞":"—"}</strong><span>TRỌN ĐỜI</span><p>Khung / thùng ở cấu hình có chính sách bảo hành trọn đời.</p></article><article><strong>{maxGlass}</strong><span>NĂM</span><p>Bộ cánh kính tối đa, tùy theo từng dòng sản phẩm.</p></article></div></section>
  <section className="hvProcess"><div className="hvProcessCopy"><p className="hvKicker">05 / ONE CONTROLLED PROCESS</p><h2>TỪ BẢN VẼ<br/>ĐẾN CĂN BẾP.</h2><div className="hvSteps">{["Thiết kế","Sản xuất","Kiểm tra","Lắp đặt"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div><Link href="/xuong-san-xuat">KHÁM PHÁ XƯỞNG →</Link></div><div className="hvPhoto hvProcessPhoto"><span>DEMO VISUAL / WORKSHOP</span></div></section>
  <section className="hvProjects"><header><div><p className="hvKicker">06 / SELECTED PROJECTS</p><h2>KIỂM CHỨNG<br/>BẰNG CÔNG TRÌNH.</h2></div><Link href="/cong-trinh">XEM TẤT CẢ →</Link></header>{projects.length>0?<div className="hvProjectGrid">{projects.slice(0,3).map((p,i)=><Link href={`/cong-trinh/${p.slug}`} className={`hvProject hvProject${i+1}`} key={p.id}><span className="hvDemo">DEMO VISUAL</span><div><small>{p.location_text||"DOMINO"}</small><h3>{p.title}</h3><p>{p.value_delivered||p.short_description}</p></div></Link>)}</div>:<div className="hvProjectEmpty"><p>Thư viện công trình đang được cập nhật.</p></div>}</section>
  <section className="hvShowroom"><div className="hvPhoto hvShowroomPhoto"><span>DEMO VISUAL / SHOWROOM</span></div><div><p className="hvKicker">07 / SHOWROOM THÁI BÌNH</p><h2>CHẠM.<br/>MỞ.<br/>CẢM NHẬN.</h2><p>Nhìn trực tiếp bề mặt, thử chuyển động của cánh tủ và cảm nhận cách một căn bếp DOMINO được hoàn thiện.</p><Link href="/showroom">KHÁM PHÁ SHOWROOM →</Link></div></section>
  {posts.length>0&&<section className="hvKnowledge"><header><p className="hvKicker">08 / TRƯỚC KHI LÀM BẾP</p><h2>HIỂU ĐÚNG.<br/>QUYẾT ĐỊNH KỸ.</h2></header><div>{posts.slice(0,3).map((p,i)=><Link href={`/tin-tuc/${p.slug}`} key={p.id}><span>0{i+1}</span><h3>{p.title}</h3><p>{p.quick_answer||p.excerpt}</p><b>→</b></Link>)}</div></section>}
  <section className="hvCta"><p className="hvKicker">09 / START A CONVERSATION</p><h2>MỘT QUYẾT ĐỊNH<br/>CHO NHIỀU NĂM<br/>PHÍA TRƯỚC.</h2><p>Bắt đầu bằng nhu cầu thật của căn bếp. DOMINO sẽ cùng bạn đi từ cấu hình đến giải pháp phù hợp.</p><Link href="/lien-he">NHẬN TƯ VẤN <span>↗</span></Link></section>
 </main>
}