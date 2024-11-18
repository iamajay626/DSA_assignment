

import Link from 'next/link';

const CardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Vehicle Repair Services
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Components</h2>
          <p className="text-gray-600 mb-4">
            We provide professional engine repair services to get your vehicle running smoothly.
          </p>
          <Link
            href="/component"
            className="inline-block py-2 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            View Page
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Issues</h2>
          <p className="text-gray-600 mb-4">
            Get your brakes inspected and fixed with our reliable brake service.
          </p>
          <Link
            href="/issues"
            className="inline-block py-2 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            View Page
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Vehicles</h2>
          <p className="text-gray-600 mb-4">
            We offer tire replacement services to ensure your vehicle is safe and roadworthy.
          </p>
          <Link
            href="/vehicles"
            className="inline-block py-2 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            View Page
          </Link>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Payments</h2>
          <p className="text-gray-600 mb-4">
            Keep your engine in top condition with our fast and efficient oil change service.
          </p>
          <Link
            href="/payments"
            className="inline-block py-2 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            View Page
          </Link>
        </div>

        {/* Card 5 */}
      </div>
    </div>
  );
};

export default CardPage;
