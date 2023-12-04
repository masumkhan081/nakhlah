import AdminLayout from "@/layout/AdminLayout"



export const metadata = {
    title: 'Admin DashBoard',
    description: 'Generated by create next app',
}
export default function AdminDashboardLayout({ children }) {
    return (
        <section className="">
            <AdminLayout  child={children}/>
        </section>

    )
}