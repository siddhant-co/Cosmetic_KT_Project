import { getWhyChooseUs } from "@/api/fetchWhyChooseUs";


export default async function WhyChooseUs () {
  const items = await getWhyChooseUs();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold mb-2">{item.heading}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


