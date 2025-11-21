import React from 'react'

export default function AuthHeader({ text }: { text: string }) {
    return (
        <h2 className="text-sm text-center font-normal my-4 text-gray-700 mb-6">
            {text}
        </h2>
    )
}
