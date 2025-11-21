import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import Link from 'next/link'
import { UserModel } from '@/api/type/models/user'

export default function MenuUser({ children, user, logout }: { children: React.ReactNode, user: UserModel, logout: () => void }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    {children}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-semibold text-base">{user.fullName}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/dashboard"
                            className="px-2 py-1 hover:bg-gray-100 rounded-md"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/settings"
                            className="px-2 py-1 hover:bg-gray-100 rounded-md"
                        >
                            Settings
                        </Link>
                        <button
                            className="text-left px-2 py-1 text-red-600 hover:bg-red-50 rounded-md"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
