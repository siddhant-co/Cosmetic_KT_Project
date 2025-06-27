import Image from "next/image";
import { getFeatures } from "@/api/getFeaturesBanner";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaPinterestP,
} from "react-icons/fa6";

interface Feature {
  src: string;
  title: string;
  desc: string;
}

const staticFeatures: Feature[] = [
  {
    src: "/shipping.png",
    title: "Free Shipping",
    desc: "On Orders Above ₹499",
  },
  {
    src: "/return.png",
    title: "Easy Returns",
    desc: "15-Day Return Policy",
  },
  {
    src: "/authenticate.png",
    title: "100% Authentic",
    desc: "Products Sourced Directly",
  },
];

const FeaturesBanner = async () => {
  const apiData = await getFeatures();

  // Map API structure to expected feature format
  const features: Feature[] =
    Array.isArray(apiData) && apiData.length > 0
      ? apiData.map((item: any) => ({
          src: item.icon || item.src || "/default.png",
          title: item.title || "No Title",
          desc: item.desc || item.description || "",
        }))
      : staticFeatures;

  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-400 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 w-full md:w-auto"
          >
            <div className="bg-white rounded-full p-2">
              <Image src={item.src} alt={item.title} width={30} height={30} />
            </div>
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm">{item.desc}</p>
            </div>
          </div>
        ))}

        {/* Social Section */}
        <div className="text-center mt-4 md:mt-0 md:text-left">
          <p className="font-semibold mb-2">Follow us on social media</p>
          <div className="flex justify-center md:justify-start gap-3 text-black">
            <div className="bg-white rounded-full p-2">
              <FaFacebookF size={14} />
            </div>
            <div className="bg-white rounded-full p-2">
              <FaInstagram size={14} />
            </div>
            <div className="bg-white rounded-full p-2">
              <FaXTwitter size={14} />
            </div>
            <div className="bg-white rounded-full p-2">
              <FaPinterestP size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBanner;
