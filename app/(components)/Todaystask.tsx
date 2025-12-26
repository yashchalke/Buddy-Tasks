import React from 'react'

const Todaystask = () => {
  return (
    <div className=" mt-4 overflow-scroll h-80 scroll-smooth">
          <table className="w-full border-collapse table-fixed ">
            <thead className="sticky top-0 z-10 bg-blue-500">
              <tr className="text-left text-sm text-black border-b ">
                <th className="p-3">Task</th>
                <th className="p-3 w-24 text-center">Edit</th>
                <th className="p-3 w-24 text-center">Delete</th>
                <th className='p-3 w-24 text-center'>Mark</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="p-3">Finish Prisma schema design</td>
                <td className="text-center">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="p-3">Finish Prisma schema design</td>
                <td className="text-center">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="p-3">Finish Prisma schema design</td>
                <td className="text-center">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="p-3">Finish Prisma schema design</td>
                <td className="text-center">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="p-3">Finish Prisma schema design</td>
                <td className="text-center">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  )
}

export default Todaystask;