import AdminNavbar from "./AdminNavbar";
import CreateProduct from "./CreateProduct";
import ShowMyProdcuts from "./ShowMyProdcuts";

const AdminDashboardPage = () => {
  return (
    <div className="bg-black admin-dashboard">
      <AdminNavbar />
      <CreateProduct />
      <ShowMyProdcuts />
    </div>
  );
};

export default AdminDashboardPage;
