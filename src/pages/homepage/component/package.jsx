import { FiCheck } from "react-icons/fi";
import { usePackage } from "@/hooks/usePackage";

export default function EventPackage() {
 const { data: packageList = []} = usePackage(); 

  return (
    <section className="max-w-6xl mx-auto pt-20 px-6">
      <h1 className="text-4xl font-semibold text-gray-900 text-center mb-6">
        Event Packages
      </h1>
      <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-16">
        Choose the perfect package for your event. All packages can be
        customized to meet your specific needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packageList.map((pkg) => (
          <div
            key={pkg._id}
            className="border border-gray-300 rounded-lg bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-medium text-gray-800 mb-4 text-center">
              {pkg.pkg_name}
            </h2>

            <div className="mb-6 text-center">
              <span className="text-4xl font-bold text-gray-900">
                ₱
                {pkg.pkg_price === 0
                  ? 5000
                  : pkg.pkg_price.toLocaleString()}
              </span>

              <p className="text-gray-600 mt-2">{pkg.pkg_desc}</p>
            </div>

            {Array.isArray(pkg.features) && pkg.features.length > 0 && (
              <ul className="space-y-1 text-gray-700 text-sm">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FiCheck className="mt-1 text-green-600 w-5 h-5 flex-shrink-0" />
                    <span className="pt-1">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
