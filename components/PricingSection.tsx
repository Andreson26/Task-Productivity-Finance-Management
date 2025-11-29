"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for personal productivity.",
    features: ["Task Manager", "Basic Finance Tracking", "Monthly Reports"],
  },
  {
    name: "Pro",
    price: "$12/mo",
    highlight: true,
    description: "Ideal for professionals and power users.",
    features: [
      "Everything in Starter",
      "AI Automations",
      "Advanced Finance Tools",
      "Priority Support",
    ],
  },
  {
    name: "Business",
    price: "$29/mo",
    description: "Best for teams and small businesses.",
    features: [
      "Everything in Pro",
      "Team Collaboration",
      "Shared Budgets",
      "Admin Dashboard",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="pricing-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Simple Pricing</h2>
        <p className="text-muted mt-2">
          Choose the plan that fits your workflow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            className={`pricing-card card-section ${
              tier.highlight ? "ring-2 ring-accent scale-[1.03]" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">{tier.name}</h3>
            <p className="text-muted text-sm mb-4">{tier.description}</p>

            <div className="text-4xl font-extrabold mb-6">{tier.price}</div>

            <ul className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="text-sm text-muted">
                  • {f}
                </li>
              ))}
            </ul>

            <Link href="/auth/signup" className="btn w-full">
              Get Started
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}