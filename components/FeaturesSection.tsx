"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Task Automation",
    description:
      "Automate repetitive tasks with AI-driven workflows that adapt to you.",
    image: "/task-automation-preview.png",
  },
  {
    title: "Finance Tracking & Insights",
    description:
      "Track spending, budgets, and financial progress in real time.",
    image: "/finance-tracker.png",
  },
  {
    title: "Performance Analytics",
    description:
      "Understand trends and improve productivity with beautiful visual reports.",
    image: "/smart-dashboard.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
        <p className="text-muted mt-2">
          Everything you need to manage your time and money — in one place.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            className="card-section feature-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <Image
              src={feat.image}
              width={400}
              height={280}
              alt={feat.title}
              className="feature-img mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {feat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}