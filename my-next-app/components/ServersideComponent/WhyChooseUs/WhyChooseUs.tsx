import { getWhyChooseUs } from "@/api/fetchWhyChooseUs";
import SectionHeader from "@/components/common/SectionHeader";


export default async function WhyChooseUs () {
  const items = await getWhyChooseUs();

  return (
    <div className="w-full  py-12 px-[40px]">
     
<SectionHeader 
  title="Why Choose Us" 
  subtitle="Trusted by Thousands, Loved for a Reason." 
/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-[#f9fafb] p-4 rounded-xl shadow px-1">
            <div className="p-4">

            <h4 className="text-lg font-semibold mb-2">{item.heading}</h4>
            <p className="text-gray-600 ">{item.description}</p>
            </div>
      
          </div>
        ))}
      </div>
    </div>
  );
};


