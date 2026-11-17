"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Languages, ChevronDown } from "lucide-react";

type Language = "en" | "hi";

const STORAGE_KEY = "rmm-language";

const translations: Record<string, string> = {
  "Home": "होम",
  "Kits": "किट्स",
  "Cart": "कार्ट",
  "Contact": "संपर्क",
  "SMART GROCERY KITS": "स्मार्ट किराना किट्स",
  "Welcome to": "स्वागत है",
  "Thoughtfully packed grocery kits for your home, at great value.": "आपके घर के लिए सोच-समझकर तैयार की गई किफायती किराना किट्स।",
  "Explore Grocery Kits": "किराना किट्स देखें",
  "Value-packed combos": "किफायती कॉम्बो",
  "Delivery on confirmation": "पुष्टि के बाद डिलीवरी",
  "Grocery kits starting at": "किराना किट्स की शुरुआती कीमत",
  "kits to explore": "किट्स देखें",
  "View kits": "किट्स देखें",
  "Smart shopping combos": "स्मार्ट शॉपिंग कॉम्बो",
  "Our Grocery Kits": "हमारी किराना किट्स",
  "View All": "सभी देखें",
  "Grocery kits will be available soon.": "किराना किट्स जल्द उपलब्ध होंगी।",
  "Grocery Shopping, Made Easier": "किराने की खरीदारी अब आसान",
  "Why Choose Us?": "हमें क्यों चुनें?",
  "Market ke chakkar aur fixed grocery combos ki tension chhodiye. Apni zaroorat batayein, humse ghar baithe baat karein.": "बाज़ार के चक्कर और तय किराना कॉम्बो की चिंता छोड़ें। अपनी ज़रूरत बताएं और घर बैठे हमसे बात करें।",
  "Market Jaane Ka Time Nahi?": "बाज़ार जाने का समय नहीं है?",
  "Ghar baithe WhatsApp par apni grocery list bhej dijiye.": "घर बैठे WhatsApp पर अपनी किराने की लिस्ट भेजें।",
  "Ready Kit Ke Baare Mein Jankari Chahiye?": "रेडी किट की जानकारी चाहिए?",
  "Available grocery kits ke products aur details WhatsApp par poochhein.": "उपलब्ध किराना किट्स के सामान और जानकारी WhatsApp पर पूछें।",
  "Budget Ka Rakhna Hai Dhyan?": "बजट का ध्यान रखना है?",
  "Apne budget ke hisaab se available ready-made kits dekhein.": "अपने बजट के अनुसार उपलब्ध रेडीमेड किट्स देखें।",
  "Monthly Grocery Manage Karna Mushkil?": "महीने भर का किराना संभालना मुश्किल है?",
  "Monthly needs ke liye available kits dekhein aur order details confirm karein.": "महीने भर की ज़रूरत के लिए किट्स देखें और ऑर्डर की जानकारी पक्की करें।",
  "Apni Zaroorat Ki Kit Khud Banayein": "अपनी ज़रूरत की किट खुद बनाएं",
  "Ready-made kit ke items badlein, quantity set karein aur apni pasand ke grocery items add karein.": "रेडीमेड किट के सामान बदलें, मात्रा तय करें और अपनी पसंद का किराना जोड़ें।",
  "WhatsApp Par Poochhein": "WhatsApp पर पूछें",
  "Ready Kits Dekhein": "रेडी किट्स देखें",
  "YOUR NEIGHBOURHOOD GROCERY STORE": "आपकी नज़दीकी किराना दुकान",
  "Grocery": "किराना",
  "Smart combos for every home": "हर घर के लिए स्मार्ट कॉम्बो",
  "Special grocery combos. More essentials, one simple price.": "खास किराना कॉम्बो। ज़रूरी सामान, एक आसान कीमत में।",
  "Search grocery kits...": "किराना किट्स खोजें...",
  "Clear search": "खोज हटाएं",
  "Shop Best-Value Kits": "सबसे किफायती किट्स खरीदें",
  "Availability": "उपलब्धता",
  "All Kits": "सभी किट्स",
  "In Stock": "स्टॉक में उपलब्ध",
  "Out of Stock": "स्टॉक में नहीं",
  "Reset": "रीसेट",
  "Kits Found": "किट्स मिलीं",
  "Choose a kit that fits your family": "अपने परिवार के लिए सही किट चुनें",
  "Sort:": "क्रम:",
  "Featured": "चुनिंदा",
  "Price: Low to High": "कीमत: कम से ज़्यादा",
  "Price: High to Low": "कीमत: ज़्यादा से कम",
  "Name: A to Z": "नाम: A से Z",
  "No kits found": "कोई किट नहीं मिली",
  "Try another search or change the filters.": "दूसरी चीज़ खोजें या फ़िल्टर बदलें।",
  "Reset Filters": "फ़िल्टर रीसेट करें",
  "Your suggestion matters": "आपकी राय हमारे लिए ज़रूरी है",
  "Apni Grocery Kit Suggest Karein": "अपनी किराना किट सुझाएं",
  "Koi item ya kit chahiye jo yahan nahi mili? Humein batayein — hum aapki suggestion dekhenge.": "कोई सामान या किट यहां नहीं मिली? हमें बताएं — हम आपके सुझाव पर ध्यान देंगे।",
  "Aapka naam (optional)": "आपका नाम (ज़रूरी नहीं)",
  "Your name": "आपका नाम",
  "Kaun si kit ya grocery items chahiye? Quantity bhi likh sakte hain...": "कौन-सी किट या किराने का सामान चाहिए? मात्रा भी लिखें...",
  "Kit suggestion": "किट का सुझाव",
  "WhatsApp Par Suggest Karein": "WhatsApp पर सुझाव भेजें",
  "Suggestion WhatsApp par store ko bheji jayegi. Order ya price confirmation nahi hai.": "सुझाव WhatsApp पर दुकान को भेजा जाएगा। यह ऑर्डर या कीमत की पुष्टि नहीं है।",
  "Back to Kits": "किट्स पर वापस जाएं",
  "Grocery Kits": "किराना किट्स",
  "Products in this kit": "इस किट में शामिल सामान",
  "Edit quantities, remove items or add your own": "मात्रा बदलें, सामान हटाएं या अपना सामान जोड़ें",
  "Items": "सामान",
  "Currently Unavailable": "फिलहाल उपलब्ध नहीं",
  "Out of Stock": "स्टॉक में नहीं",
  "Special Kit Price": "खास किट कीमत",
  "You save": "आपकी बचत",
  "Add this kit to your cart to continue shopping.": "खरीदारी जारी रखने के लिए इस किट को कार्ट में जोड़ें।",
  "Looking for more options?": "और विकल्प देखना चाहते हैं?",
  "Explore more grocery combos from Rashid Mega Mart.": "Rashid Mega Mart के और किराना कॉम्बो देखें।",
  "Explore More Kits": "और किट्स देखें",
  "Apni Kit Customize Karein": "अपनी किट कस्टमाइज़ करें",
  "Jo chahiye rakhein, quantity badlein ya item hata dein.": "जो चाहिए रखें, मात्रा बदलें या सामान हटा दें।",
  "Kit mein shamil": "किट में शामिल",
  "Kit ke sabhi original items remove ho gaye. Neeche naye items add kar sakte hain.": "किट के सभी पुराने सामान हटा दिए गए हैं। नीचे नया सामान जोड़ सकते हैं।",
  "Aur grocery add karein": "और किराना जोड़ें",
  "Store ke doosre listed items ya apni zaroorat ka koi item likhein.": "दुकान की लिस्ट से या अपनी ज़रूरत का कोई सामान लिखें।",
  "Jaise: Aata, chini, detergent...": "जैसे: आटा, चीनी, डिटर्जेंट...",
  "Add grocery item": "किराने का सामान जोड़ें",
  "New item quantity": "नए सामान की मात्रा",
  "Qty": "मात्रा",
  "Add item": "सामान जोड़ें",
  "Item ka naam likhein.": "सामान का नाम लिखें।",
  "Item ya quantity bahut lambi hai.": "सामान या मात्रा का नाम बहुत लंबा है।",
  "Ye item pehle se add hai.": "यह सामान पहले से जोड़ा गया है।",
  "Added items — price confirmation pending": "जोड़ा गया सामान — कीमत की पुष्टि बाकी",
  "Remove": "हटाएं",
  "Cart mein abhi listed base kit price dikhega. Customized contents, extra-item rates aur final amount store WhatsApp par confirm karega.": "कार्ट में अभी किट की लिस्टेड कीमत दिखेगी। बदले हुए सामान, अतिरिक्त सामान की कीमत और अंतिम राशि दुकान WhatsApp पर बताएगी।",
  "Update Customized Kit in Cart": "कार्ट में कस्टमाइज़ की गई किट अपडेट करें",
  "Customized Kit Cart Mein Add Karein": "कस्टमाइज़ किट कार्ट में जोड़ें",
  "Your cart is empty": "आपका कार्ट खाली है",
  "Abhi aapke cart mein koi product nahi hai. Apni pasand ki grocery kits dekhein aur shopping shuru karein.": "अभी आपके कार्ट में कोई सामान नहीं है। अपनी पसंद की किराना किट्स देखें और खरीदारी शुरू करें।",
  "Back to Home": "होम पर वापस जाएं",
  "My Shopping Cart": "मेरा शॉपिंग कार्ट",
  "item": "सामान",
  "items": "सामान",
  "ready for": "तैयार हैं",
  "checkout": "ऑर्डर करने के लिए",
  "Explore Kits": "किट्स देखें",
  "Your Items": "आपके सामान",
  "Review your selected products": "चुने हुए सामान की जांच करें",
  "Clear Cart": "कार्ट खाली करें",
  "Remove all items from your cart?": "क्या कार्ट से सभी सामान हटाना चाहते हैं?",
  "Your cart is empty. Please add products first.": "आपका कार्ट खाली है। पहले सामान जोड़ें।",
  "Please enter your valid full name.": "कृपया अपना पूरा सही नाम लिखें।",
  "Please enter a valid 10-digit mobile number.": "कृपया 10 अंकों का सही मोबाइल नंबर लिखें।",
  "Please enter a complete delivery address.": "कृपया डिलीवरी का पूरा पता लिखें।",
  "Please keep your order to 30 different items or fewer.": "कृपया ऑर्डर में 30 या उससे कम अलग-अलग सामान रखें।",
  "Cash on Delivery": "डिलीवरी पर नकद भुगतान",
  "Payment preference": "भुगतान का तरीका",
  "Delivery Address": "डिलीवरी का पता",
  "Customer Details": "ग्राहक की जानकारी",
  "Order Items": "ऑर्डर का सामान",
  "Delivery charges: Please confirm": "डिलीवरी शुल्क: कृपया पुष्टि करें",
  "Please confirm customized kit contents, extra-item prices, item availability, delivery charges and final payable amount.": "कृपया कस्टमाइज़ किट का सामान, अतिरिक्त सामान की कीमत, उपलब्धता, डिलीवरी शुल्क और अंतिम भुगतान राशि की पुष्टि करें।",
  "Name": "नाम",
  "Mobile": "मोबाइल",
  "Payment": "भुगतान",
  "Order note": "ऑर्डर नोट",
  "Special instructions (optional)": "खास निर्देश (ज़रूरी नहीं)",
  "Enter your name": "अपना नाम लिखें",
  "10-digit mobile number": "10 अंकों का मोबाइल नंबर",
  "Full delivery address": "डिलीवरी का पूरा पता",
  "Cash on Delivery (COD)": "डिलीवरी पर नकद (COD)",
  "UPI": "UPI",
  "Place Order on WhatsApp": "WhatsApp पर ऑर्डर भेजें",
  "Continue Shopping": "खरीदारी जारी रखें",
  "Subtotal": "कुल राशि",
  "Total": "कुल",
  "Confirm on WhatsApp": "WhatsApp पर पुष्टि करें",
  "Price confirmation pending": "कीमत की पुष्टि बाकी",
  "Customized contents": "कस्टमाइज़ किया गया सामान",
  "Extra items": "अतिरिक्त सामान",
  "Currently unavailable": "फिलहाल उपलब्ध नहीं",
  "Rashid Mega Mart": "Rashid Mega Mart",
  "Open cart": "कार्ट खोलें",
  "Contact us on WhatsApp": "WhatsApp पर संपर्क करें",
  "Customized kit ·": "कस्टमाइज़ किट ·",
  "selected items": "चुने हुए सामान",
  "Extra items · price confirmation pending": "अतिरिक्त सामान · कीमत की पुष्टि बाकी",
  "Removed": "हटाया गया",
  "Undo": "वापस लें",
  "Delivery details": "डिलीवरी की जानकारी",
  "Delivery availability and charges will be confirmed by the store after receiving your order.": "ऑर्डर मिलने के बाद दुकान डिलीवरी की उपलब्धता और शुल्क की पुष्टि करेगी।",
  "Order Summary": "ऑर्डर का सारांश",
  "Listed Kit Base Price": "किट की लिस्टेड कीमत",
  "Delivery Charge": "डिलीवरी शुल्क",
  "To be confirmed": "पुष्टि होना बाकी",
  "Current Base Total": "अभी का कुल बेस अमाउंट",
  "Customized price not confirmed": "कस्टमाइज़ कीमत की पुष्टि बाकी",
  "Final payable amount will be confirmed by the store after checking product availability and delivery charges.": "सामान की उपलब्धता और डिलीवरी शुल्क जांचने के बाद दुकान अंतिम भुगतान राशि बताएगी।",
  "Checkout Details": "ऑर्डर की जानकारी",
  "Apni details fill karein. Order WhatsApp par store ko bheja jayega.": "अपनी जानकारी भरें। ऑर्डर WhatsApp पर दुकान को भेजा जाएगा।",
  "Full Name *": "पूरा नाम *",
  "Enter your full name": "अपना पूरा नाम लिखें",
  "Mobile Number *": "मोबाइल नंबर *",
  "Delivery Address *": "डिलीवरी का पता *",
  "House no., street, area and landmark": "मकान नंबर, गली, इलाका और पहचान की जगह",
  "Order Note (Optional)": "ऑर्डर नोट (ज़रूरी नहीं)",
  "Any delivery instructions? (e.g. call before arrival)": "डिलीवरी के लिए कोई निर्देश? (जैसे आने से पहले कॉल करें)",
  "Payment Preference": "भुगतान का तरीका",
  "UPI Payment": "UPI से भुगतान",
  "Pay when delivered": "डिलीवरी के समय भुगतान करें",
  "Details after confirmation": "पुष्टि के बाद जानकारी",
  "Selected": "चुना गया",
  "Store order confirm karne ke baad verified UPI details share karega. Abhi payment mat karein.": "ऑर्डर की पुष्टि के बाद दुकान सही UPI जानकारी भेजेगी। अभी भुगतान न करें।",
  "Place Order on WhatsApp": "WhatsApp पर ऑर्डर भेजें",
  "Your details will be shared with the store for this order.": "इस ऑर्डर के लिए आपकी जानकारी दुकान के साथ साझा की जाएगी।",
  "Unable to prepare your WhatsApp order. Please try again.": "WhatsApp ऑर्डर तैयार नहीं हो पाया। कृपया फिर कोशिश करें।",
  "One of the cart quantities is invalid. Please update your cart.": "कार्ट में किसी सामान की मात्रा गलत है। कृपया कार्ट अपडेट करें।",
  "An item in your cart is no longer available. Please remove it and try again.": "कार्ट का एक सामान अब उपलब्ध नहीं है। कृपया उसे हटाकर फिर कोशिश करें।",
  "is currently unavailable.": "फिलहाल उपलब्ध नहीं है।",
  "The order total is outside the allowed range.": "ऑर्डर की कुल राशि मान्य सीमा से बाहर है।",
  "Language": "भाषा",
  "English": "अंग्रेज़ी",
  "Hindi": "हिंदी",
};

const phraseReplacements = Object.entries(translations)
  .filter(([source]) => source.length > 3)
  .sort(([a], [b]) => b.length - a.length);

function translateText(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const exact = translations[trimmed];
  if (exact) return value.replace(trimmed, exact);

  let result = value;
  for (const [source, target] of phraseReplacements) {
    if (result.includes(source)) result = result.replaceAll(source, target);
  }
  result = result.replace(/(\d+) of (\d+) kits found/gi, "$1 में से $2 किट्स मिलीं");
  result = result.replace(/(\d+) Kits Found/gi, "$1 किट्स मिलीं");
  result = result.replace(/(\d+) items ready for checkout/gi, "$1 सामान ऑर्डर के लिए तैयार");
  result = result.replace(/(\d+) items?/gi, "$1 सामान");
  result = result.replace(/(\d+) Items/gi, "$1 सामान");
  return result;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textOriginals = useRef(new WeakMap<Text, { original: string; translated: string }>());
  const attrOriginals = useRef(new WeakMap<Element, Map<string, { original: string; translated: string }>>());

  const applyLanguage = useCallback((nextLanguage: Language) => {
    const root = document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      if (!node.parentElement?.closest("script,style,noscript,svg,[data-no-translate]")) textNodes.push(node);
    }

    for (const node of textNodes) {
      const current = node.nodeValue ?? "";
      const record = textOriginals.current.get(node);
      const original = record && current === record.translated ? record.original : current;
      const translated = nextLanguage === "hi" ? translateText(original) : original;
      textOriginals.current.set(node, { original, translated });
      if (current !== translated) node.nodeValue = translated;
    }

    const elements = root.querySelectorAll<HTMLElement>("input,textarea,button,a,[aria-label],[title],[placeholder]");
    for (const element of elements) {
      for (const attribute of ["placeholder", "aria-label", "title", "alt"]) {
        if (!element.hasAttribute(attribute)) continue;
        const current = element.getAttribute(attribute) ?? "";
        let records = attrOriginals.current.get(element);
        if (!records) {
          records = new Map();
          attrOriginals.current.set(element, records);
        }
        const record = records.get(attribute);
        const original = record && current === record.translated ? record.original : current;
        const translated = nextLanguage === "hi" ? translateText(original) : original;
        records.set(attribute, { original, translated });
        if (current !== translated) element.setAttribute(attribute, translated);
      }
    }

    document.documentElement.lang = nextLanguage === "hi" ? "hi-IN" : "en-IN";
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "hi" || saved === "en") setLanguage(saved);
    } catch {
      // Keep English when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    applyLanguage(language);
    const observer = new MutationObserver((records) => {
      if (records.some((record) => record.type === "childList" || record.type === "characterData" || record.type === "attributes")) {
        observer.disconnect();
        applyLanguage(language);
        observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title", "alt"] });
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title", "alt"] });
    return () => observer.disconnect();
  }, [language, applyLanguage]);

  const chooseLanguage = (next: Language) => {
    setLanguage(next);
    setExpanded(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Language still works for this session.
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const previousY = lastScrollY.current;
      const movingDown = currentY > previousY;
      lastScrollY.current = currentY;
      if (currentY < 40 || (!movingDown && currentY < previousY)) {
        setVisible(true);
      } else if (movingDown && currentY > 80 && !expanded) {
        setVisible(false);
        setExpanded(false);
      }
    };
    const onActivity = () => {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        if (window.scrollY > 80 && !expanded) setVisible(false);
      }, 2600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onActivity, { passive: true });
    window.addEventListener("touchstart", onActivity, { passive: true });
    onActivity();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("touchstart", onActivity);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [expanded]);

  return (
    <>
      {children}
      <div
        className={`fixed bottom-[calc(104px+env(safe-area-inset-bottom))] right-3 z-[70] transition-all duration-300 sm:right-5 lg:bottom-6 lg:right-6 ${visible || expanded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        onMouseEnter={() => setVisible(true)}
      >
        {expanded ? (
          <div className="flex items-center gap-1 rounded-full border border-white/80 bg-white/90 p-1.5 shadow-[0_10px_35px_rgba(30,20,25,0.18)] backdrop-blur-2xl">
            <button type="button" onClick={() => chooseLanguage("en")} aria-pressed={language === "en"} className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition ${language === "en" ? "bg-[#A83250] text-white shadow-sm" : "text-[#6F6267] hover:bg-[#F8E8ED]"}`}>EN</button>
            <button type="button" onClick={() => chooseLanguage("hi")} aria-pressed={language === "hi"} className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition ${language === "hi" ? "bg-[#A83250] text-white shadow-sm" : "text-[#6F6267] hover:bg-[#F8E8ED]"}`}>हिंदी</button>
            <button type="button" onClick={() => setExpanded(false)} aria-label="Close language selector" className="ml-0.5 flex size-8 items-center justify-center rounded-full text-[#766D72] hover:bg-[#F5F1EF]"><ChevronDown size={15} /></button>
          </div>
        ) : (
          <button type="button" onClick={() => { setExpanded(true); setVisible(true); }} aria-label={language === "hi" ? "भाषा बदलें" : "Change language"} className="flex h-11 items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 text-xs font-extrabold text-[#A83250] shadow-[0_8px_28px_rgba(40,25,30,0.16)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white active:scale-95">
            <Languages size={16} />
            {language === "hi" ? "हिंदी" : "EN / HI"}
          </button>
        )}
      </div>
    </>
  );
}
