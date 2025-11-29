'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserAddress = () => {
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 min-h-screen">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                    My Addresses
                </h1>
                <p className="text-gray-600 mb-4">
                    Address saved successfully! You can now use it for orders.
                </p>
                <button
                    onClick={() => router.push('/cart')}
                    className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
                >
                    Go to Cart
                </button>
            </div>
            <Footer />
        </>
    );
};

export default UserAddress;
