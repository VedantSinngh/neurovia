// app/models/page.jsx
'use client';

import HealthcareCards from '@/components/healthcare/Cards';

export default function ModelsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-blue-950">
            <div className="container mx-auto flex justify-center items-center h-full p-4">
                <HealthcareCards currentPath="Models" />
            </div>
        </main>
    );
}
