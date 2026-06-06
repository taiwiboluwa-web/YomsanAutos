import {
  ParallaxSection,
  MagneticButton,
  StaggerContainer,
  StaggerItem,
  CountUpNumber,
  LiquidCursor,
  RevealText,
  GradientFlowBackground,
  MorphingBlob,
  ScrollProgressBar,
  FloatingCard
} from "./ModernFlowEffects";

const BLUE = "#1E5EC2";
const POPPINS = "'Poppins', sans-serif";

export function FlowEffectsShowcase() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0b0f19] overflow-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Liquid Cursor */}
      <LiquidCursor />

      {/* Gradient Flow Background */}
      <GradientFlowBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-32">

        {/* Section 1: Parallax + Reveal Text */}
        <ParallaxSection speed={0.3}>
          <div className="text-center space-y-6">
            <div className="overflow-hidden">
              <RevealText
                className="text-6xl font-black text-gray-900 dark:text-white"
                delay={0}
              >
                Modern Flow Effects
              </RevealText>
            </div>
            <div className="overflow-hidden">
              <RevealText
                className="text-xl text-gray-600 dark:text-gray-400"
                delay={0.2}
              >
                Experience the future of web interactions
              </RevealText>
            </div>
          </div>
        </ParallaxSection>

        {/* Section 2: Stagger Animation */}
        <div className="space-y-8">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: POPPINS, color: BLUE }}
          >
            Stagger Fade-In Effect
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <StaggerItem key={i}>
                <div className="p-8 bg-white dark:bg-[#131c2e] border-2 border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: POPPINS }}>
                    Feature {i}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Each card animates in sequence with a smooth stagger effect
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Section 3: Count Up Numbers */}
        <div className="space-y-8">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: POPPINS, color: BLUE }}
          >
            Animated Counters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
              <CountUpNumber
                end={150}
                suffix="+"
                className="text-5xl font-black mb-2"
                style={{ fontFamily: POPPINS, color: BLUE }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
              <CountUpNumber
                end={98}
                suffix="%"
                className="text-5xl font-black mb-2"
                style={{ fontFamily: POPPINS, color: "#9333ea" }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl">
              <CountUpNumber
                end={500}
                suffix="+"
                className="text-5xl font-black mb-2"
                style={{ fontFamily: POPPINS, color: "#ec4899" }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">Projects Done</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
              <CountUpNumber
                end={24}
                suffix="/7"
                duration={1.5}
                className="text-5xl font-black mb-2"
                style={{ fontFamily: POPPINS, color: "#10b981" }}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">Support</p>
            </div>
          </div>
        </div>

        {/* Section 4: Magnetic Buttons */}
        <div className="space-y-8">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: POPPINS, color: BLUE }}
          >
            Magnetic Hover Effect
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
              Hover Me!
            </MagneticButton>
            <MagneticButton className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors">
              I Follow Mouse
            </MagneticButton>
            <MagneticButton className="px-8 py-4 bg-pink-600 text-white rounded-lg font-bold text-lg hover:bg-pink-700 transition-colors">
              Try This One
            </MagneticButton>
          </div>
        </div>

        {/* Section 5: Floating Cards with Parallax */}
        <div className="space-y-8">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ fontFamily: POPPINS, color: BLUE }}
          >
            Floating Cards Effect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { emoji: "🚀", title: "Fast Performance", desc: "Lightning-fast animations with smooth 60fps" },
              { emoji: "🎨", title: "Beautiful Design", desc: "Modern aesthetics that captivate users" },
              { emoji: "⚡", title: "Zero Config", desc: "Works out of the box with sensible defaults" },
              { emoji: "🔥", title: "Production Ready", desc: "Battle-tested in real-world applications" }
            ].map((item, i) => (
              <FloatingCard
                key={i}
                index={i}
                className="p-8 bg-white dark:bg-[#131c2e] border-2 border-gray-200 dark:border-gray-800 rounded-xl shadow-xl cursor-pointer"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: POPPINS }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </FloatingCard>
            ))}
          </div>
        </div>

        {/* Section 6: Morphing Blobs */}
        <ParallaxSection speed={0.2}>
          <div className="relative min-h-[400px] flex items-center justify-center">
            <MorphingBlob className="w-64 h-64 bg-blue-400/30 -top-20 -left-20" />
            <MorphingBlob className="w-80 h-80 bg-purple-400/20 -bottom-20 -right-20" />
            <div className="relative z-10 text-center space-y-4">
              <h2 className="text-4xl font-black" style={{ fontFamily: POPPINS }}>
                Morphing Background Blobs
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Organic, fluid shapes that create depth and visual interest in your designs
              </p>
            </div>
          </div>
        </ParallaxSection>

        {/* Final CTA Section */}
        <div className="text-center space-y-8 py-20">
          <div className="overflow-hidden">
            <RevealText
              className="text-5xl font-black"
              style={{ fontFamily: POPPINS }}
            >
              Ready to Elevate Your UI?
            </RevealText>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <MagneticButton
              className="px-10 py-5 text-white rounded-full font-bold text-lg shadow-2xl"
              style={{ backgroundColor: BLUE }}
            >
              Get Started
            </MagneticButton>
            <MagneticButton className="px-10 py-5 bg-gray-200 dark:bg-gray-800 rounded-full font-bold text-lg shadow-2xl">
              Learn More
            </MagneticButton>
          </div>
        </div>

      </div>
    </div>
  );
}
