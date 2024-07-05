import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreateStoreForm from "../../../components/forms/CreateStoreForm";
import CreateUserFrom from "../../../components/forms/CreateUserFrom";
import { useAuth } from "../../../contexts/AuthContext";
import { useModal } from "../../../contexts/ModalContext";
import { getInitials } from "../../../utils";

const AdminDashboard = () => {
  const { user, handleLogout } = useAuth();
  const { toggleModal } = useModal();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("store");

  const handleCreateAdmin = () => {
    toggleModal(<CreateUserFrom role='admin' />);
  };
  const hadleCreatNormalUser = () => {
    toggleModal(<CreateUserFrom role='normal' />);
  };
  const handleCreateStore = () => {
    toggleModal(<CreateStoreForm />);
  };

  const handleLogOut = async () => {
    const response = await handleLogout();
    if (response?.success) {
      navigate("/sign-in");
      toast.success(response?.message);
    }
  };
  return (
    <div className='flex h-full'>
      <div className=' w-[14rem] flex flex-col items-start justify-between border-r border-gray-800'>
        <div className='p-4 w-full flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <span className='border border-gray-800 rounded-full flex  gap-2 items-center justify-center font-bold h-12 w-12'>
              {getInitials(user?.name)}
            </span>
            <span className='font-bold'>
              {user?.name
                .split(" ")
                .slice(0, 1)
                .map((name) => name)}
            </span>
          </div>
          <div className='flex flex-col gap-1 '>
            <div
              className='py-2 px-3 border border-black hover:border hover:border-gray-800'
              onClick={() => setActiveTab("store")}
            >
              List Store
            </div>
            <div
              className='py-2 px-3 border border-black hover:border hover:border-gray-800'
              onClick={() => setActiveTab("user")}
            >
              List User
            </div>
            <div
              className='py-2  px-3 border border-black hover:border hover:border-gray-800'
              onClick={() => setActiveTab("admin")}
            >
              List Admin
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center  p-4 w-full'>
          <div className='flex flex-col gap-4 w-full '>
            <div className='flex items-center justify-center border   border-gray-600 hover:border-gray-800 py-2'>
              <button onClick={hadleCreatNormalUser}>Normal User</button>
            </div>
            <div className='flex items-center justify-center border border-gray-600 hover:border-gray-800 py-2'>
              <button onClick={handleCreateAdmin}>Create Admin</button>
            </div>
            <div className='flex items-center justify-center border  border-gray-600 hover:border-gray-800 py-2'>
              <button onClick={handleCreateStore}> Create Store</button>
            </div>
            <div className='flex items-center justify-center border   border-gray-600 hover:border-gray-800 py-2'>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 '>
        <div className=' p-4 flex w-full h-fit items-center font-bold gap-4'>
          <div className='w-1/3 h-32 bg-slate-400 flex items-center justify-center'>
            00 Total User
          </div>
          <div className='w-1/3 h-32 bg-slate-500 flex items-center justify-center'>
            00 Total Store
          </div>
          <div className='w-1/3 h-32 bg-slate-600 flex items-center justify-center'>
            00 Total Rating
          </div>
        </div>
        <div className='p-4 flex justify-between  items-center w-full h-fit gap-6'>
          <p className='text-4xl font-bold pb-2'>
            {activeTab === "store" && "Store"}
            {activeTab === "user" && "User"}
            {activeTab === "admin" && "Admin"}
          </p>
          <div className='flex gap-4'>
            <div className='px-6 py-1 border border-gray-800 rounded '>
              Sort
            </div>
            <div className='px-6 py-1 border border-gray-800 rounded '>
              Filter
            </div>
          </div>
        </div>
        <div className=' h-full p-4 '>
          <table className='text-start  w-full space-y-2 '>
            <thead className='bg-slate-600/50 text-start '>
              <tr className=''>
                <th className=' text-start rounded-tl-md rounded-bl-md p-2'>
                  Name
                </th>
                <th className=' text-start p-2'>Email</th>
                <th className=' text-start p-2'>Address</th>
                <th className=' text-start rounded-tr-md rounded-br-md p-2'>
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4]?.map((quiz, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-700/40" : "bg-gray-800/30"
                  } p-2`}
                >
                  <td className='text-start rounded-tl-md rounded-bl-md p-2 '>
                    {index + 1}
                  </td>
                  <td className='text-start p-2'>{index + 1}</td>
                  <td className='text-start p-2 '>{index + 1}</td>
                  <td className='text-start rounded-tr-md rounded-br-md p-2 '>
                    {index + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
