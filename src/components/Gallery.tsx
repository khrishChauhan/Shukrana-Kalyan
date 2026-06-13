import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Activity, BookOpen, User, Leaf, Camera } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Primary English Schooling', category: 'education', url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/India_-_Faces_-_rural_kids_on_their_way_to_school_%282832084021%29.jpg' },
  { id: 2, title: 'Critical Medicine Relief', category: 'healthcare', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Doctor_examining_a_child_in_a_medical_camp%2C_organised_by_the_DFP%2C_during_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Hilli_Block%2C_Dakshin_Dinajpur%2C_West_Bengal_on_February_06%2C_2012.jpg' },
  { id: 3, title: 'Sewing Machinery Guild', category: 'women', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/These_Mising_tribe_women_are_involved_in_the_traditional_craft_of_handloom_weaving.jpg' },
  { id: 4, title: 'Child Vaccination Camp', category: 'healthcare', url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/A_Doctor_is_checking_a_baby_at_a_Healthy_Baby_Show_by_Directorate_of_Field_Publicity_at_a_function_on_National_Rural_Health_Mission_organised_by_PIB_Guwahati_on_the_occasion_of_the_Public_information_Campaign_on%22_Bharat.jpg' },
  { id: 5, title: 'Rural Community Library', category: 'education', url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Rural_Village_Children_School_in_Solan_Himachal_Pradesh_India.jpg' },
  { id: 6, title: 'Handloom Training Center', category: 'women', url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empowering_Rural_Women_through_the_Lakhpati_Didi_Initiative.jpg' },
];

const CategoryIcon = ({ category }: { category: string }) => {
  if (category === 'education') return <BookOpen className="h-4 w-4" />;
  if (category === 'healthcare') return <Activity className="h-4 w-4" />;
  if (category === 'women') return <User className="h-4 w-4" />;
  return <Leaf className="h-4 w-4" />;
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredGallery.length - 1 : lightboxIndex - 1);
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredGallery.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white relative overflow-hidden text-left">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FFF8F2] border border-[#ED8C32]/25 eyebrow text-[#ED8C32]">
              <Camera className="h-3.5 w-3.5" />
              Field Photography
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-[#232F46] tracking-[-0.035em] mb-5 font-display leading-[1.05]"
          >
            Transparency in Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#232F46]/60 text-[17px] sm:text-[19px] leading-[1.7] max-w-xl mx-auto font-normal"
          >
            A real-world view into our project sites, distribution lines, and development progress.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
             initial={{ opacity: 0, y: 14 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              "Real Field Photography",
              "Actual Program Locations",
              "Verified Initiatives"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full border border-[#232F46]/[0.08] shadow-[0_2px_8px_rgba(35,47,70,0.04)]">
                <div className="w-4 h-4 rounded-full bg-[#FFF8F2] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ED8C32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[12px] font-medium text-[#232F46]/75">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-wrap justify-center gap-1.5 mt-10 p-1.5 bg-[#FFF8F2] border border-[#232F46]/[0.06] rounded-full"
          >
            {['all', 'education', 'healthcare', 'women'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-5 py-2 rounded-full text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer ${
                  activeFilter === category
                    ? 'text-[#232F46] bg-[#ED8C32] shadow-[0_4px_12px_rgba(237,140,50,0.3)]'
                    : 'text-[#232F46]/60 hover:text-[#232F46] hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Layout of photos */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-7 space-y-6 lg:space-y-7">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-[22px] overflow-hidden bg-[#232F46]/5 border border-[#232F46]/[0.06] cursor-zoom-in break-inside-avoid shadow-[0_4px_16px_rgba(35,47,70,0.06)] hover:shadow-[0_16px_40px_rgba(35,47,70,0.13)] transform hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />

                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#232F46]/90 via-[#232F46]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-7 text-left z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 mb-3">
                      <CategoryIcon category={item.category} />
                      <span className="text-[10px] font-bold text-white uppercase tracking-[0.14em]">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold font-display text-[19px] leading-tight tracking-[-0.01em]">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#232F46]/95 backdrop-blur-md p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white transition-colors cursor-pointer hidden sm:block"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white transition-colors cursor-pointer hidden sm:block"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Image View */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-[22px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)] bg-[#232F46]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredGallery[lightboxIndex].url}
                alt={filteredGallery[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[85vh]"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-[#232F46]/85 to-transparent pointer-events-none text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full border border-white/10 mb-3">
                  <span className="text-[11px] font-bold text-white uppercase tracking-[0.14em]">
                    {filteredGallery[lightboxIndex].category}
                  </span>
                </div>
                <h4 className="text-white font-semibold font-display text-2xl sm:text-3xl tracking-[-0.01em]">
                  {filteredGallery[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
