import CustomerForm from "@/components/CustomerForm"
import CustomerList from "@/components/CustomerList"
import { cairo } from "./fonts"
import { getCustomers } from "./actions"

export default async function Home() {
  const initialCustomersData = await getCustomers()

  return (
    <div className={`min-h-screen bg-gray-100 ${cairo.className}`}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">نظام إدارة علاقات المشترين  </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <CustomerForm  />
              </div>
              <div>
                <CustomerList
                  initialCustomers={initialCustomersData.customers.map(customer => ({
                    ...customer,
                    time: customer.time.toString(),
                    createdAt: customer.createdAt.toString(),
                    updatedAt: customer.updatedAt.toString()
                  }))}
                  initialCurrentPage={initialCustomersData.currentPage}
                  initialTotalPages={initialCustomersData.totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

