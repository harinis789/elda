import { useState } from 'react';
import { MoreHorizontal, Mail, Shield } from 'lucide-react';

const INITIAL_USERS = [
    { id: 1, name: 'Alice Walker', email: 'alice@example.com', role: 'Admin', totalOrders: 15, date: '2023-11-01' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Customer', totalOrders: 3, date: '2023-12-04' },
    { id: 3, name: 'Emma Smith', email: 'emma@example.com', role: 'Customer', totalOrders: 8, date: '2023-11-20' },
    { id: 4, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', totalOrders: 1, date: '2023-12-05' },
];

const AdminUsers = () => {
    const [users] = useState(INITIAL_USERS);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Users</h2>
                <p className="text-gray-500">View registered customers</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">User</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Role</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Orders</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Joined Date</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900">{user.name}</span>
                                        <div className="flex items-center gap-1 text-sm text-gray-400">
                                            <Mail size={12} /> {user.email}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {user.role === 'Admin' && <Shield size={14} className="text-accent" />}
                                        <span className={user.role === 'Admin' ? 'text-accent font-medium' : 'text-gray-600'}>
                                            {user.role}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{user.totalOrders}</td>
                                <td className="px-6 py-4 text-gray-500">{user.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
