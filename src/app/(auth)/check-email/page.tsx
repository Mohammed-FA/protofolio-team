import Link from "next/link";

export default function page() {
    return (
        <div className="p-6  text-center">
            <h1 className="text-2xl font-bold mb-3 text-green-600">✔ Email Sent</h1>
            <p className="text-gray-700">
                A confirmation email has been sent to your inbox. Please check your email to continue.
            </p>
            <Link href="/signin" className="text-blue-500 hover:underline">
                Sign in
            </Link>
        </div>
    )
}
