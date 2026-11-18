import type { Metadata } from "next";
import RewardsExperience from "@/components/RewardsExperience";

export const metadata: Metadata = {
  title: "Rewards & Referral",
  description:
    "Refer friends and request your Rashid Mega Mart rewards directly through WhatsApp.",
};

export default function RewardsPage() {
  return <RewardsExperience />;
}
