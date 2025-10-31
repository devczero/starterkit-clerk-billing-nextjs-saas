"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Sparkles, ArrowRight, TrendingUp, Globe } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Hero() {
  return (
    <div className="bg-black relative overflow-hidden">


      {/* Hero Section */}
      <section className="relative pt-2 pb-4 lg:py-20">
        <div className="container mx-auto px-4">
        <div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-lime-500/25 to-blue-500/25 rounded-full blur-3xl"
        />
          <motion.div
            className="text-center max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Sale Banner */}
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500/20 to-emerald-500/20 border border-lime-400/30 rounded-full px-4 py-2 mb-6 backdrop-blur-xl"
              variants={fadeInUp}
            >
              <Sparkles className="w-4 h-4 text-lime-300" />
              <span className="text-sm font-medium text-lime-200">
                🎉 Limited Time: 50% OFF First 3 Months
              </span>
              <Sparkles className="w-4 h-4 text-lime-300" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Transform Your Business with AI Intelligence
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/70 text-balance mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              Unlock unprecedented growth with our cutting-edge AI platform. Automate workflows, gain insights, and
              scale your operations effortlessly.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
              variants={fadeInUp}
            >
              {/* Start Free Trial Button - Primary */}
              <button className="group bg-gradient-to-r from-lime-400/90 to-emerald-400/90 hover:from-lime-400 hover:to-emerald-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-lime-400/25 hover:shadow-lime-400/40 hover:scale-105 border border-lime-400/20">
                <span className="text-lg">Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              {/* Watch Demo Button - Secondary */}
              <button className="group backdrop-blur-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] hover:border-white/[0.25] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 hover:scale-105">
                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-current border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                </div>
                <span className="text-lg">Watch Demo</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-8 lg:py-24 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 lg:mb-20 px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500/10 to-emerald-500/10 border border-lime-400/20 rounded-full px-4 py-2 mb-4 lg:mb-6">
              <Zap className="w-4 h-4 text-lime-300" />
              <span className="text-sm font-medium text-lime-200">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 text-balance bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent px-2">
              How It Works
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/60 text-balance max-w-2xl mx-auto leading-relaxed px-2">
              Transform your business in three simple steps. Our streamlined process gets you up and running in minutes.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                step: "01",
                icon: <Globe className="w-8 h-8" />,
                title: "Connect Your Data",
                description: "Securely integrate your existing systems and data sources with our platform in just a few clicks",
              },
              {
                step: "02", 
                icon: <Brain className="w-8 h-8" />,
                title: "Configure AI Models",
                description: "Choose from pre-trained models or customize AI workflows tailored to your specific business needs",
              },
              {
                step: "03",
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Deploy & Scale",
                description: "Launch your AI-powered solutions instantly and scale automatically as your business grows",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={fadeInUp}
              >
                {/* Connection Line (hidden on mobile, visible on md+) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-lime-400/30 to-transparent -translate-y-0.5 z-0" />
                )}
                
                <div className="relative backdrop-blur-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-lime-400/20 rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-lime-400/5">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-lime-400/20 to-emerald-400/20 border border-lime-400/30 rounded-2xl flex items-center justify-center text-lime-300 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="text-6xl font-bold text-white/[0.03] group-hover:text-lime-400/10 transition-colors duration-300">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-lime-100 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-lg group-hover:text-white/70 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Hover Accent */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/[0.01] to-emerald-400/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white/70">© 2024 AI SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
