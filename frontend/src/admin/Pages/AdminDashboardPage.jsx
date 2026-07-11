import AdminNavbar from "./AdminNavbar";
import CreateProduct from "./CreateProduct";
import ShowMyProdcuts from "./ShowMyProdcuts";

const AdminDashboardPage = () => {

  
  return (
    

    <div className="bg-neutral-950 min-h-screen text-white antialiased flex flex-col">
      <AdminNavbar />
      
      <main className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-16">
        <CreateProduct />
        
        {/* Sleek, ambient divider line dividing actions from tracking table grids */}
        <hr className="border-neutral-900 w-full" />
        
        <ShowMyProdcuts />
      </main>
    </div>
  );
};

export default AdminDashboardPage;
