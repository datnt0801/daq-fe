import { ChefHat } from "lucide-react"

function MenuCart() {
  return (
    <div className="flex gap-2 bg-gray-100 w-[calc(33.33%-10px)] h-[calc(33.33%-10px)] shadow-lg rounded-lg border
     hover:bg-gray-200 cursor-pointer">
      <div className="w-3/4">
        <img src="https://brand-pcms.ggg.systems/media/catalog/product/cache/fccf9bc1c56510f6f2e84ded9c30a375/6/0/60001584-ba-chi-heo-iberico_2_1.jpg" 
        className="w-full h-full object-cover" alt="" />
      </div>
      <div className="w-1/4 flex flex-col gap-2 mr-2 justify-around">
        <div className="flex flex-col gap-2">
          <h1>Ten Set</h1>
          <p>100.000 </p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-500 text-white rounded">Edit</button>
          <button className="bg-red-500 text-white rounded">Delete</button>
        </div>
      </div>
      
    </div>
  )
}

function SetMenu() {
  return (
    <div className="flex flex-col bg-white h-full w-full shadow-lg">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center p-2"> 
          <ChefHat></ChefHat>
          <h1><b>Menu Management</b></h1>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded w-28">+ Thêm</button>
         <div className="flex">
          <button className="p-2 rounded-lg border bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-28">All</button>
          <button className="p-2 rounded-lg border bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-28">Buffet</button>
          <button className="p-2 rounded-lg border bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-28">Set</button>
         </div>
         <div className="flex justify-start">
          <input type="text" placeholder="Search" className="p-2 rounded-lg border" />
         </div>
      </div>
      <div className="flex flex-wrap flex-1 overflow-y-auto border-t border-gray-200 gap-2">
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
         <MenuCart />
      </div>
    </div>
  )
}

export default SetMenu
