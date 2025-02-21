"use server"

import prisma from "@/lib/prisma"

export async function getCustomers(page = 1, limit = 10, search = "") {
  const skip = (page - 1) * limit

  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { phone: { contains: search } },
          { type: { contains: search } },
          { note: { contains: search } },
          { com_from: { contains: search } },
        ],
      }
    : {}

  const [customers, totalCount] = await Promise.all([
    prisma.cRM_Customer.findMany({
      where,
      skip,
      take: limit,
      orderBy: { time: "desc" },
    }),
    prisma.cRM_Customer.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / limit)

  return {
    customers,
    currentPage: page,
    totalPages,
    totalCount,
  }
}

export async function addCustomer(data: {
  name: string
  phone: string
  type: string
  note: string
  time: string
  com_from: string
}) {
  const newCustomer = await prisma.cRM_Customer.create({
    data: {
      ...data,
      time: new Date(data.time),
    },
  })
  return newCustomer
}

export async function updateCustomer(
  id: string,
  data: {
    name: string
    phone: string
    type: string
    note: string
    time: string
    com_from: string
  },
) {
  const updatedCustomer = await prisma.cRM_Customer.update({
    where: { id },
    data: {
      ...data,
      time: new Date(data.time),
    },
  })
  return updatedCustomer
}

