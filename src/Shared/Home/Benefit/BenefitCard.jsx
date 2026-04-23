
const BenefitCard = ({ benefit }) => {

    const { title, description, image } = benefit

    return (
        <div className="mt-5">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 rounded-3xl bg-base-100 p-6 md:p-8 shadow-sm transition duration-300 hover:shadow-md">
        
        <div className="w-full md:w-[160px] flex justify-center shrink-0">
          <img
            src={image}
            alt={title}
            className="w-[110px] md:w-[140px] object-contain"
          />
        </div>

        <div className="hidden md:block self-stretch border-l border-dashed border-[#0B3B40]/30"></div>
        <div className="block md:hidden w-full border-t border-dashed border-[#0B3B40]/30"></div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3B40]">
            {title}
          </h2>
          <p className="mt-3 text-sm md:text-base leading-7 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
    );
};

export default BenefitCard;