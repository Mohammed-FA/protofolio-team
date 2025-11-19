import React from 'react'

export default function page() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 bg-white shadow rounded text-center">
                <h1 className="text-2xl font-bold mb-3 text-green-600">✔ Email Sent</h1>
                <p className="text-gray-700">
                    A confirmation email has been sent to your inbox. Please check your email to continue.
                </p>
            </div>
        </div>
    )
}
