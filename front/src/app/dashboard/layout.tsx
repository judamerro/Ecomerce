import Link from "next/link";

export default function DashboardLayout ({children}: {children: React.ReactNode}){
    return(
        <>
            <nav className="bg-blue-800 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
    
        <div className="flex space-x-4">
          <Link href="/dashboard" className="text-white hover:text-gray-300 transition duration-200">Dashboard</Link>
          <Link href="/dashboard/orders" className="text-white hover:text-gray-300 transition duration-200">Orders</Link>
        </div>
      </div>
    </nav>
 

            <main>
                {children}
            </main>
        </>
    )
}