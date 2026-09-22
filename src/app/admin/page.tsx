import Link from "next/link";import {redirect} from "next/navigation";import {createClient} from "@/lib/supabase/server";

const labels={new:"Mới",contacted:"Đã liên hệ",consulting:"Đang tư vấn",appointment:"Đã hẹn",converted:"Đã chốt",not_suitable:"Không phù hợp"} as const;

export default async function AdminPage(){
 const s=await createClient();const{data:{user}}=await s.auth.getUser();if(!user)redirect("/admin/login");
 const{data:profile}=await s.from("profiles").select("role,full_name").eq("id",user.id).maybeSingle();if(!profile)redirect("/");
 const{data:leads}=await s.from("leads").select("id,status,created_at,contacts(name,phone)").order("created_at",{ascending:false}).limit(5);
 const{data:all}=await s.from("leads").select("status");
 const counts=(all??[]).reduce<Record<string,number>>((a,l)=>(a[l.status]=(a[l.status]||0)+1,a),{});
 return <main className="adminDashboard">
  <header><div><p className="eyebrow">DOMINO / OVERVIEW</p><h1>CHÀO {profile.full_name?.split(" ")[0]?.toUpperCase()||"ADMIN"}.</h1><p>Tổng quan hoạt động website và CRM.</p></div><Link href="/admin/leads">MỞ CRM →</Link></header>
  <section className="adminMetrics"><article><span>TỔNG LEAD</span><strong>{all?.length??0}</strong><small>Khách hàng đã ghi nhận</small></article><article><span>LEAD MỚI</span><strong>{counts.new||0}</strong><small>Chưa bắt đầu chăm sóc</small></article><article><span>ĐANG TƯ VẤN</span><strong>{counts.consulting||0}</strong><small>Đang trong quá trình tư vấn</small></article><article><span>ĐÃ CHỐT</span><strong>{counts.converted||0}</strong><small>Lead chuyển đổi thành công</small></article></section>
  <section className="adminDashboardGrid"><div><div className="adminSectionTitle"><h2>LEAD GẦN ĐÂY</h2><Link href="/admin/leads">Xem tất cả</Link></div><div className="adminRecent">{(leads??[]).map(l=>{const c=Array.isArray(l.contacts)?l.contacts[0]:l.contacts;return <Link href={"/admin/leads/"+l.id} key={l.id}><span><strong>{c?.name||"Chưa có tên"}</strong><small>{c?.phone||"—"}</small></span><em>{labels[l.status]}</em></Link>})}{!leads?.length&&<p>Chưa có lead nào.</p>}</div></div>
  <div><div className="adminSectionTitle"><h2>QUẢN TRỊ</h2></div><div className="adminQuick"><Link href="/admin/leads"><span>01</span><strong>Khách hàng / CRM</strong><small>Quản lý lead và lịch sử chăm sóc →</small></Link><div><span>02</span><strong>Content CMS</strong><small>Đang xây dựng</small></div><div><span>03</span><strong>Website</strong><small>Đang xây dựng</small></div></div></div></section>
 </main>
}