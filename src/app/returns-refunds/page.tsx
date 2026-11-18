import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CircleHelp,
  ClipboardList,
  Clock3,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918962531603?text=" +
  encodeURIComponent(
    "Hello Rashid Mega Mart, I need help with a damaged, incorrect or missing item. I can share my order details and photos.",
  );

export const metadata = {
  title: "Returns & Refunds",
  description:
    "Learn how Rashid Mega Mart reviews damaged, incorrect or missing item requests and how to contact the store team.",
};

const returnSteps = [
  {
    number: "01",
    title: "Contact the store",
    description: "Message our team as soon as possible after delivery.",
    icon: RotateCcw,
  },
  {
    number: "02",
    title: "Share the details",
    description: "Send your order information and clear item or package photos.",
    icon: Camera,
  },
  {
    number: "03",
    title: "Team review",
    description: "We review the product, its condition and the order details.",
    icon: ClipboardList,
  },
  {
    number: "04",
    title: "Next steps confirmed",
    description: "Our team explains the available resolution directly with you.",
    icon: PackageCheck,
  },
];

const reviewPoints = [
  "Damaged product or package",
  "Incorrect item received",
  "An item missing from the order",
];

const faqItems = [
  {
    question: "How soon should I report an issue?",
    answer:
      "Please contact Rashid Mega Mart as soon as possible after delivery so our team can review the issue.",
  },
  {
    question: "What information should I share?",
    answer:
      "Share your order details and clear photos of the item or package. This helps our team understand what happened.",
  },
  {
    question: "Is every return or refund request automatically accepted?",
    answer:
      "No. Requests are reviewed based on the product, its condition and the order details. A request by itself does not guarantee a return or refund.",
  },
  {
    question: "How will I know the available resolution?",
    answer:
      "After reviewing the details, our store team will contact you directly and explain the applicable next steps.",
  },
];

export default function ReturnsRefundsPage() {
  return (
    <main className="min-h-[70vh] bg-[#FAF8F5] px-3 py-6 pb-28 sm:px-5 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E8E2D7] bg-white px-3.5 text-xs font-bold text-[#315F35] transition hover:border-[#C9D8C5] hover:bg-[#F8FBF5]"
        >
          <ArrowLeft size={14} />
          Back to store
        </Link>

        <header className="mx-auto mt-6 max-w-2xl text-center sm:mt-8">
          <span className="mx-auto inline-flex size-11 items-center justify-center rounded-2xl border border-[#DDE8D7] bg-[#EDF4E9] text-[#315F35]">
            <RotateCcw size={20} />
          </span>
          <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#52764B] sm:text-[11px]">
            Rashid Mega Mart · Customer care
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-[#29231F] sm:text-4xl">
            Returns & Refunds
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-[#716B62] sm:mt-3 sm:text-sm sm:leading-6">
            Something not right with your grocery delivery? Contact our team
            and we will review the details with you.
          </p>
        </header>

        <section
          aria-labelledby="report-window-title"
          className="relative mt-6 overflow-hidden rounded-2xl border border-[#DCE7D6] bg-[linear-gradient(120deg,#F2F7ED_0%,#FFFFFF_58%,#F9F4E9_100%)] p-4 shadow-[0_8px_26px_rgba(38,65,35,0.055)] sm:mt-8 sm:rounded-3xl sm:p-6"
        >
          <div className="pointer-events-none absolute -right-8 -top-12 size-36 rounded-full bg-[#DCEBD4]/60 blur-3xl" />
          <div className="relative flex items-start gap-3 sm:gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#315F35] shadow-sm sm:size-12">
              <Clock3 size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#52764B]">
                Important
              </p>
              <h2
                id="report-window-title"
                className="mt-1 text-base font-extrabold tracking-tight text-[#292F27] sm:text-lg"
              >
                Report delivery issues as soon as possible
              </h2>
              <p className="mt-1 text-xs leading-5 text-[#687264] sm:text-sm sm:leading-6">
                Please message us soon after delivery with your order details
                and clear photos. Our team will review the request before
                confirming the next steps.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="process-title" className="mt-7 sm:mt-10">
          <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8A7442]">
                Simple process
              </p>
              <h2
                id="process-title"
                className="mt-1 text-lg font-black tracking-tight text-[#29231F] sm:text-2xl"
              >
                How a request is reviewed
              </h2>
            </div>
            <span className="hidden rounded-full border border-[#E8E2D7] bg-white px-3 py-1 text-[10px] font-bold text-[#777064] sm:inline-flex">
              4 steps
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 min-[520px]:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {returnSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="relative flex min-w-0 items-start gap-3 rounded-2xl border border-[#EAE5DC] bg-white p-3.5 shadow-[0_3px_14px_rgba(39,31,22,0.035)] sm:min-h-[156px] sm:flex-col sm:gap-3 sm:p-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EDF4E9] text-[#315F35]">
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black tracking-[0.12em] text-[#8A7442]">
                        STEP {step.number}
                      </span>
                      {index < returnSteps.length - 1 && (
                        <ArrowRight
                          size={12}
                          className="ml-auto text-[#B8B0A3] lg:hidden"
                        />
                      )}
                    </div>
                    <h3 className="mt-1 text-sm font-extrabold text-[#302A24]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-[18px] text-[#777064] sm:text-xs sm:leading-5">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-label="Return review information"
          className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2"
        >
          <article className="rounded-2xl border border-[#EAE5DC] bg-white p-4 shadow-[0_3px_14px_rgba(39,31,22,0.035)] sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#EDF4E9] text-[#315F35]">
                <Check size={16} />
              </span>
              <h2 className="text-sm font-extrabold text-[#302A24]">
                Issues you can report
              </h2>
            </div>
            <ul className="mt-4 space-y-3">
              {reviewPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-xs leading-5 text-[#625D54]"
                >
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0 text-[#39814A]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#EAE5DC] bg-white p-4 shadow-[0_3px_14px_rgba(39,31,22,0.035)] sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#F8F1DF] text-[#8A6A2B]">
                <ShieldCheck size={16} />
              </span>
              <h2 className="text-sm font-extrabold text-[#302A24]">
                What our team reviews
              </h2>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                "The product and its condition",
                "Your order details",
                "The photos you share",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-xs leading-5 text-[#625D54]"
                >
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0 text-[#39814A]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section aria-labelledby="faq-title" className="mt-7 sm:mt-10">
          <div className="mb-3 flex items-center gap-2">
            <CircleHelp size={18} className="text-[#52764B]" />
            <h2
              id="faq-title"
              className="text-lg font-black tracking-tight text-[#29231F] sm:text-2xl"
            >
              Refunds & exchange questions
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#EAE5DC] bg-white">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                name="returns-faq"
                className="group border-b border-[#F0ECE5] px-4 last:border-b-0 sm:px-5"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 text-left text-xs font-bold text-[#302A24] marker:hidden sm:text-sm [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F2F5EF] text-[#52764B] transition-transform group-open:rotate-45">
                    <span className="text-base leading-none">+</span>
                  </span>
                </summary>
                <p className="max-w-3xl pb-4 pr-8 text-xs leading-5 text-[#746E64] sm:text-sm sm:leading-6">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl bg-[#155F36] px-4 py-5 text-white shadow-[0_10px_30px_rgba(21,95,54,0.16)] sm:mt-8 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/12">
              <Image
                src="/Whatsapp-3d.svg"
                alt=""
                width={25}
                height={25}
                unoptimized
              />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold sm:text-base">
                Need help with a delivery?
              </h2>
              <p className="mt-1 text-[11px] leading-5 text-white/75 sm:text-xs">
                Our store team can guide you through the review.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white px-4 text-xs font-extrabold text-[#155F36] transition hover:bg-[#F1F7EE] sm:mt-0 sm:w-auto"
          >
            Contact on WhatsApp
            <ArrowRight size={14} />
          </a>
        </section>

        <p className="mt-4 flex items-start gap-2 px-1 text-[10px] leading-4 text-[#8A8379]">
          <ShieldCheck size={13} className="mt-0.5 shrink-0" />
          A return or refund is not automatic. The store confirms the available
          resolution after reviewing the product and order details. Never share
          passwords, OTPs or payment PINs.
        </p>
      </div>
    </main>
  );
}
