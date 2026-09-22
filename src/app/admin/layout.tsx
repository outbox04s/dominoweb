import Link from "next/link";import {redirect} from "next/navigation";import {createClient} from "@/lib/supabase/server";

async function logout(){
  "use server";
  const s=await createClient();
  await s.auth.signOut();
  redirect("/admin/login");
}

export default async function AdminLayout({children}:{children:React.ReactNode}){
  const s=await createClient();
  const{data:{user}}=await s.auth.getUser();
  if(!user) return children;
  const{data:profile}=await s.from("profiles").select("role,full_name").eq("id",user.id).maybeSingle();
  if(!profile) return children;
  return <div className="adminShell">
    <aside className="adminSidebar">
      <Link className="adminBrand" href="/admin/leads"><strong>DOMINO</strong><span>ADMIN</span></Link>
      <nav>
        <p>KHÁCH HÀNG</p><Link href="/admin/leads">Leads</Link>
        <p>CONTENT</p><span>Sản phẩm</span><span>Công trình</span><span>Bài viết</span><span>Tuyển dụng</span>
        <p>WEBSITE</p><span>Trang chủ</span><span>Showroom</span><span>Bảo hành</span><span>FAQ</span>
        <p>HỆ THỐNG</p><span>Người dùng</span><span>Cài đặt</span>
      </nav>
      <div className="adminAccount"><small>{profile.full_name||user.email}</small><em>{profile.role}</em><form action={logout}><button>Đăng xuất</button></form></div>
    </aside>
    <div className="adminWorkspace"><header className="adminTopbar"><div><strong>DOMINO CMS</strong><span>{profile.full_name||"Administrator"}</span></div><Link href="/" target="_blank">Xem website ↗</Link></header>{children}</div>
  </div>
}