"use client"

import type React from "react"

import { useState, useTransition } from "react"
import type { Customer } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { arSA } from "date-fns/locale"
import { cairo } from "../app/fonts"
import { getCustomers, updateCustomer } from "../app/actions"
import { CalendarIcon } from "lucide-react"

interface CustomerListProps {
  initialCustomers: Customer[]
  initialCurrentPage: number
  initialTotalPages: number
}

export default function CustomerList({ initialCustomers, initialCurrentPage, initialTotalPages }: CustomerListProps) {
  const [customers, setCustomers] = useState(initialCustomers)
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await getCustomers(1, 10, searchQuery)
      setCustomers(result.customers)
      setCurrentPage(result.currentPage)
      setTotalPages(result.totalPages)
    })
  }

  const handlePageChange = (page: number) => {
    startTransition(async () => {
      const result = await getCustomers(page, 10, searchQuery)
      setCustomers(result.customers)
      setCurrentPage(result.currentPage)
      setTotalPages(result.totalPages)
    })
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
  }

  const handleCancelEdit = () => {
    setEditingCustomer(null)
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCustomer) {
      startTransition(async () => {
        await updateCustomer(editingCustomer.id, editingCustomer)
        const result = await getCustomers(currentPage, 10, searchQuery)
        setCustomers(result.customers)
        setEditingCustomer(null)
      })
    }
  }

  const renderCustomerCard = (customer: Customer) => (
    <Card key={customer.id}>
      <CardContent className="p-4">
        {editingCustomer && editingCustomer.id === customer.id ? (
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                value={editingCustomer.name}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={editingCustomer.phone}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>النوع</Label>
              <RadioGroup
                value={editingCustomer.type}
                onValueChange={(value) => setEditingCustomer({ ...editingCustomer, type: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sale" id="edit-sale" />
                  <Label htmlFor="edit-sale">بيع</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="payment" id="edit-payment" />
                  <Label htmlFor="edit-payment">دفع</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="edit-custom" />
                  <Label htmlFor="edit-custom">آخر</Label>
                </div>
              </RadioGroup>
              {editingCustomer.type === "custom" && (
                <Input
                  value={editingCustomer.type}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, type: e.target.value })}
                  placeholder="أدخل النوع المخصص"
                  required
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">ملاحظات</Label>
              <Textarea
                id="note"
                value={editingCustomer.note}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, note: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>التاريخ والوقت</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={`w-full justify-start text-right font-normal`}>
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {format(new Date(editingCustomer.time), "PPP HH:mm", { locale: arSA })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(editingCustomer.time)}
                    onSelect={(date) =>
                      setEditingCustomer({ ...editingCustomer, time: date?.toISOString() || editingCustomer.time })
                    }
                    initialFocus
                    locale={arSA}
                  />
                  <div className="p-2">
                    <Input
                      type="time"
                      value={format(new Date(editingCustomer.time), "HH:mm")}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(":")
                        const newTime = new Date(editingCustomer.time)
                        newTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))
                        setEditingCustomer({ ...editingCustomer, time: newTime.toISOString() })
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comFrom">مصدر المشتري</Label>
              <Input
                id="comFrom"
                value={editingCustomer.com_from}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, com_from: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                إلغاء
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
                <p className="text-sm text-muted-foreground">{customer.com_from}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(customer.time), "PPP HH:mm", { locale: arSA })}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">
                {customer.type === "sale" ? "بيع" : customer.type === "payment" ? "دفع" : customer.type}
              </p>
              <p className="text-sm">{customer.note}</p>
            </div>
            <div className="mt-4">
              <Button onClick={() => handleEdit(customer)}>تعديل</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )

  const renderCustomerList = (type: "all" | "sale" | "payment") => (
    <div className="space-y-4">
      {customers.filter((customer) => (type === "all" ? true : customer.type === type)).map(renderCustomerCard)}
    </div>
  )

  return (
    <Card className={cairo.className}>
      <CardHeader>
        <CardTitle>قائمة المشترين</CardTitle>
        <form onSubmit={handleSearch} className="mt-2">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" disabled={isPending}>
              بحث
            </Button>
          </div>
        </form>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as "all" | "sale" | "payment")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="sale">المبيعات</TabsTrigger>
            <TabsTrigger value="payment">المدفوعات</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{isPending ? <p>جاري التحميل...</p> : renderCustomerList("all")}</TabsContent>
          <TabsContent value="sale">{isPending ? <p>جاري التحميل...</p> : renderCustomerList("sale")}</TabsContent>
          <TabsContent value="payment">
            {isPending ? <p>جاري التحميل...</p> : renderCustomerList("payment")}
          </TabsContent>
        </Tabs>
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isPending}>
            السابق
          </Button>
          <span>
            الصفحة {currentPage} من {totalPages}
          </span>
          <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || isPending}>
            التالي
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

