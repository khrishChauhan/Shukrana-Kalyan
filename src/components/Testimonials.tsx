import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Rahul Sharma",
    role: "School Teacher",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Sikh_pilgrim_at_the_Golden_Temple_%28Harmandir_Sahib%29_in_Amritsar%2C_India.jpg",
    review: "The education support program completely transformed our village school. We now have proper tech classrooms, and our students are dreaming bigger."
  },
  {
    id: "test-2",
    name: "Meera Deshmukh",
    role: "Social Worker",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Young_muslim_woman_in_the_Thar_desert_near_Jaisalmer%2C_India.jpg",
    review: "Working alongside the foundation on healthcare initiatives has been incredible. The wellness camps reach people who've never seen a doctor before."
  },
  {
    id: "test-3",
    name: "Ankit Gupta",
    role: "Small Business Owner",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/India_-_Delhi_portrait_of_a_man_-_4780.jpg",
    review: "Thanks to the micro-capital credits, my small retail shop expanded significantly. It gave my family the financial stability we desperately needed."
  },
  {
    id: "test-4",
    name: "Neha Singh",
    role: "Volunteer",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Portrait_of_a_Bhil_community_woman_in_traditional_attire%2C_Jhabua%2C_Madhya_Pradesh%2C_India_%282%29.jpg",
    review: "Being a volunteer has opened my eyes. The transparency and efficiency of how funds are converted into real help is truly commendable."
  },
  {
    id: "test-5",
    name: "Vikram Mehta",
    role: "Community Leader",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Man_with_a_white_moustache%2C_Morena_district%2C_India.jpg",
    review: "When the clinic opened in our district, it saved lives. Every donor should know their contribution actually makes it to the ground."
  },
  {
    id: "test-6",
    name: "Pooja Kapoor",
    role: "Healthcare Professional",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Lady_in_Bundi%2C_Rajasthan.JPG",
    review: "The medical provisions and the support staff form a lifeline for these remote regions. I highly recommend supporting their critical relief."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#FFF8F2] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_75%)] pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        {/* Title / Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#ED8C32]/25 eyebrow text-[#ED8C32] shadow-[0_2px_8px_rgba(35,47,70,0.04)]">
              <Quote className="h-3.5 w-3.5" />
              Voices Of Impact
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-[#232F46] tracking-[-0.035em] mb-5 font-display leading-[1.05]"
          >
            What People Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#232F46]/60 text-[17px] sm:text-[19px] leading-[1.7] max-w-xl mx-auto font-normal"
          >
            Hear directly from the community members, volunteers, and professionals who have experienced our impact.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {TESTIMONIALS.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-[#232F46]/[0.07] p-8 rounded-[24px] shadow-[0_1px_2px_rgba(35,47,70,0.04),0_4px_16px_rgba(35,47,70,0.04)] hover:shadow-[0_2px_4px_rgba(35,47,70,0.04),0_16px_40px_rgba(35,47,70,0.09)] hover:border-[#ED8C32]/30 transform hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-start text-left"
              >
                {/* Quote Icon */}
                <div className="mb-6 text-[#ED8C32]/30 group-hover:text-[#ED8C32]/60 transition-colors duration-500">
                  <Quote className="h-9 w-9 fill-current" />
                </div>

                {/* Review Text */}
                <p className="text-[#232F46]/75 leading-[1.75] mb-8 flex-grow text-[15.5px] font-normal">
                  "{item.review}"
                </p>

                {/* Profile Section */}
                <div className="flex items-center gap-3.5 mt-auto pt-6 border-t border-[#232F46]/[0.07] w-full">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#ED8C32]/30 ring-offset-2 ring-offset-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#232F46] text-[15px] font-display tracking-[-0.01em]">
                      {item.name}
                    </h4>
                    <span className="text-[#ED8C32] text-[11px] font-bold tracking-[0.1em] uppercase">
                      {item.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
