import DeveloperAMA from "@/components/dashboard-admin/Home/DeveloperAMA";
import MenuCards from "@/components/dashboard-admin/Home/MenuCards";
import Orders from "@/components/dashboard-admin/Home/Orders";
import RecentOrders from "@/components/dashboard-admin/Home/RecentOrders";
import Revenue from "@/components/dashboard-admin/Home/Revenue";
import SocialMedia from "@/components/dashboard-admin/Home/SocialMedia";
import TasksOverview from "@/components/dashboard-admin/Home/TasksOverview";
import Transactions from "@/components/dashboard-admin/Home/Transactions";

const Admin = () => {
    return (
        <>
            <MenuCards />
            {/* second section */}
            <div className="my-4 flex gap-5">
                <Revenue/>
                <SocialMedia/>
            </div>
            {/* third section */}
            <div className="my-4 flex gap-5">
                <RecentOrders/>
                <Orders/>
            </div>
            <div className="my-4 flex gap-5">
                <TasksOverview/>
                <DeveloperAMA/>
                <Transactions/>
            </div>
        </>
    );
};

export default Admin;