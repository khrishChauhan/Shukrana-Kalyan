import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

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
    <section id="testimonials" className="py-24 bg-[#FFFFFF] relative">
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035] mix-blend-overlay pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title / Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#232F46]/5 shadow-sm rounded-full text-[#ED8C32] text-xs font-semibold uppercase tracking-wider mb-4 cursor-pointer">
            <Quote className="h-3.5 w-3.5" />
            <span>Voices Of Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#232F46] tracking-tight mb-4 font-display">
            What People Say
          </h2>
          <p className="text-[#232F46]/70 text-base sm:text-lg">
            Hear directly from the community members, volunteers, and professionals who have experienced our impact.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-white border border-[#232F46]/5 p-8 rounded-[24px] shadow-[0_4px_12px_rgba(27,39,63,0.04)] hover:shadow-[0_12px_32px_rgba(27,39,63,0.08)] transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left"
              >
                {/* Quote Icon */}
                <div className="mb-6 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Quote className="h-8 w-8 text-[#232F46] fill-current" />
                </div>
                
                {/* Review Text */}
                <p className="text-[#232F46]/80 leading-relaxed mb-8 flex-grow text-sm sm:text-base italic">
                  "{item.review}"
                </p>

                {/* Profile Section */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#ED8C32] p-0.5">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#232F46] text-base font-display">
                      {item.name}
                    </h4>
                    <span className="text-[#ED8C32] text-xs font-semibold tracking-wide uppercase">
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
