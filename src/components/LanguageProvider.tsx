"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
type Language = "en" | "hinglish" | "hi";

const LanguageContext = createContext<Language>("en");
const LanguageToggleContext = createContext<() => void>(() => {});
export const useSiteLanguage = () => useContext(LanguageContext);
export const useToggleSiteLanguage = () => useContext(LanguageToggleContext);

const hindiCatalogueWords: Record<string, string> = {
  "बोरी किंकी चावल": "Kinki rice sack", "किनकी चावल": "Kinki rice", "चावल": "Rice", "सरसों तेल": "Mustard oil", "रिफाइंड तेल": "Refined oil", "तेल": "Oil", "टाटा नमक": "Tata salt", "नमक": "Salt", "ताज़ा मिर्च": "Fresh chilli", "मिर्च": "Chilli", "ताज़ा धनिया": "Fresh coriander", "धनिया": "Coriander", "ताज़ा हल्दी": "Fresh turmeric", "हल्दी": "Turmeric", "आटा": "Wheat flour", "दाल": "Lentils", "मिक्स दाल": "Mixed lentils", "जीरा": "Cumin", "कोलगेट मंजन": "Colgate toothpaste", "मंजन बड़ा": "Large toothpaste", "सर्फ एक्सेल / निरमा": "Surf Excel / Nirma detergent", "कपड़े वाली साबुन": "Laundry soap", "रिन साबुन": "Rin soap", "नहाने वाला साबुन लक्स": "Lux bathing soap", "नहाने वाला साबुन": "Bathing soap", "बर्तन वाला लिक्विड": "Dishwashing liquid", "बर्तन वाला विम जेल": "Vim dishwashing gel", "बर्तन वाला साबुन": "Dishwashing soap", "डेटॉल लिक्विड": "Dettol liquid", "डेटॉल हैंडवॉश": "Dettol handwash", "पास्ता मसाला": "Pasta masala", "पास्ता": "Pasta", "बेसन": "Gram flour", "पोहा": "Flattened rice", "काली मिर्च": "Black pepper", "शैम्पू": "Shampoo", "शक्कर": "Sugar", "चायपत्ती": "Tea leaves", "मैजिक मसाला": "Magic masala", "लौंग": "Cloves", "विनेगर": "Vinegar", "मखाना": "Fox nuts", "काजू": "Cashews", "बादाम": "Almonds", "सूजी": "Semolina", "देसी घी": "Desi ghee", "आंवला हेयर ऑयल": "Amla hair oil", "ऑल आउट मशीन सेट": "All Out machine set", "मैगी फैमिली पैक": "Maggi family pack", "मैगी मसाला": "Maggi masala", "मैगी": "Maggi", "सौंफ": "Fennel seeds", "छोटी इलायची": "Green cardamom", "जायफल": "Nutmeg", "मूंगफली": "Peanuts", "अगरबत्ती": "Incense sticks", "दालचीनी": "Cinnamon", "पत्ता": "Leaf", "वाघ बकरी चाय": "Wagh Bakri tea", "किराना": "Grocery", "रोज़मर्रा के सामान": "daily essentials", "ज़रूरी सामान": "essential items", "एक ही किट में": "in one kit", "रोज़मर्रा के उपयोग के": "everyday use"
};

export function toEnglishCatalogue(value: string) {
  let result = value;
  for (const [hindi, english] of Object.entries(hindiCatalogueWords).sort(([a], [b]) => b.length - a.length)) result = result.replaceAll(hindi, english);
  result = result.replace(/(\d+)\s*किलो/g, "$1 kg").replace(/(\d+)\s*लीटर/g, "$1 litres").replace(/(\d+)\s*ग्राम/g, "$1 g").replace(/(\d+)\s*पैकेट/g, "$1 packs").replace(/(\d+)\s*पीस/g, "$1 pcs").replace(/(\d+)\s*पाउच/g, "$1 pouches").replace(/(\d+)\s*सेट/g, "$1 sets").replace(/(\d+)\s*बोरी/g, "$1 sack");
  return result;
}

const hinglishCatalogueWords: Record<string, string> = {
  "बोरी किंकी चावल": "Bori Kinki Chawal", "किनकी चावल": "Kinki Chawal", "चावल": "Chawal",
  "सरसों तेल": "Sarson Tel", "रिफाइंड तेल": "Refined Tel", "तेल": "Tel", "टाटा नमक": "Tata Namak", "नमक": "Namak",
  "ताज़ा मिर्च": "Taaza Mirch", "मिर्च": "Mirch", "ताज़ा धनिया": "Taaza Dhaniya", "धनिया": "Dhaniya",
  "ताज़ा हल्दी": "Taazi Haldi", "हल्दी": "Haldi", "आटा": "Aata", "दाल": "Daal", "मिक्स दाल": "Mix Daal",
  "जीरा": "Jeera", "कोलगेट मंजन": "Colgate Manjan", "मंजन बड़ा": "Bada Manjan", "सर्फ एक्सेल / निरमा": "Surf Excel / Nirma",
  "कपड़े वाली साबुन": "Kapde wala sabun", "रिन साबुन": "Rin sabun", "नहाने वाला साबुन लक्स": "Lux nahane wala sabun",
  "नहाने वाला साबुन": "Nahane wala sabun", "बर्तन वाला लिक्विड": "Bartan wala liquid", "बर्तन वाला विम जेल": "Vim bartan gel",
  "बर्तन वाला साबुन": "Bartan wala sabun", "डेटॉल लिक्विड": "Dettol liquid", "डेटॉल हैंडवॉश": "Dettol handwash",
  "पास्ता मसाला": "Pasta masala", "पास्ता": "Pasta", "बेसन": "Besan", "पोहा": "Poha", "काली मिर्च": "Kali mirch",
  "शैम्पू": "Shampoo", "शक्कर": "Shakkar", "चायपत्ती": "Chai patti", "मैजिक मसाला": "Magic masala",
  "लौंग": "Laung", "विनेगर": "Vinegar", "मखाना": "Makhana", "काजू": "Kaju", "बादाम": "Badam",
  "सूजी": "Sooji", "देसी घी": "Desi ghee", "आंवला हेयर ऑयल": "Amla hair oil", "ऑल आउट मशीन सेट": "All Out machine set",
  "मैगी फैमिली पैक": "Maggi family pack", "मैगी मसाला": "Maggi masala", "मैगी": "Maggi", "सौंफ": "Saunf",
  "छोटी इलायची": "Chhoti elaichi", "जायफल": "Jaiphal", "मूंगफली": "Moongfali", "अगरबत्ती": "Agarbatti",
  "दालचीनी": "Dalchini", "पत्ता": "Patta", "वाघ बकरी चाय": "Wagh Bakri chai", "किराना": "Kirana",
  "रोज़मर्रा के सामान": "Rozmarra ka samaan", "ज़रूरी सामान": "Zaroori samaan", "एक ही किट में": "ek hi kit mein",
  "रोज़मर्रा के उपयोग के": "rozmarra ke istemal ke"
};

export function toHinglishCatalogue(value: string) {
  let result = value;
  for (const [hindi, roman] of Object.entries(hinglishCatalogueWords).sort(([a], [b]) => b.length - a.length)) {
    result = result.replaceAll(hindi, roman);
  }
  return result
    .replace(/(\d+)\s*किलो/g, "$1 kilo")
    .replace(/(\d+)\s*लीटर/g, "$1 litre")
    .replace(/(\d+)\s*ग्राम/g, "$1 gram")
    .replace(/(\d+)\s*पैकेट/g, "$1 packet")
    .replace(/(\d+)\s*पीस/g, "$1 piece")
    .replace(/(\d+)\s*पाउच/g, "$1 pouch")
    .replace(/(\d+)\s*सेट/g, "$1 set")
    .replace(/(\d+)\s*बोरी/g, "$1 bori");
}

const STORAGE_KEY = "rmm-language";

let currentLanguage: Language = "en";

function getLanguageSnapshot(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "hi" || saved === "hinglish" || saved === "en") return saved;
  } catch {
    // Fall back to the in-memory language when browser storage is unavailable.
  }
  return currentLanguage;
}

function getServerLanguageSnapshot(): Language {
  return "en";
}

function subscribeToLanguage(onStoreChange: () => void) {
  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener("rmm-language-change", handleChange);
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("rmm-language-change", handleChange);
  };
}

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
  "Your details will be shared with the store for this order.": "इस ऑर्डर के लिए आपकी जानकारी दुकान के साथ साझा की जाएगी।",
  "Unable to prepare your WhatsApp order. Please try again.": "WhatsApp ऑर्डर तैयार नहीं हो पाया। कृपया फिर कोशिश करें।",
  "One of the cart quantities is invalid. Please update your cart.": "कार्ट में किसी सामान की मात्रा गलत है। कृपया कार्ट अपडेट करें।",
  "An item in your cart is no longer available. Please remove it and try again.": "कार्ट का एक सामान अब उपलब्ध नहीं है। कृपया उसे हटाकर फिर कोशिश करें।",
  "is currently unavailable.": "फिलहाल उपलब्ध नहीं है।",
  "The order total is outside the allowed range.": "ऑर्डर की कुल राशि मान्य सीमा से बाहर है।",
  "Grocery Kits Made": "किराना किट्स, अब",
  "Simple & Fresh.": "आसान और ताज़ा।",
  "Your trusted neighbourhood destination for thoughtfully packed grocery kits and easy ordering.": "आपकी भरोसेमंद नज़दीकी दुकान, जहां किराना किट्स और आसान ऑर्डरिंग की सुविधा है।",
  "YOUR GROCERY KIT PARTNER": "आपकी किराना किट पार्टनर",
  "Explore": "देखें",
  "My Cart": "मेरा कार्ट",
  "Help & Policies": "सहायता और नीतियां",
  "Contact Us": "हमसे संपर्क करें",
  "Privacy Policy": "गोपनीयता नीति",
  "Terms & Conditions": "नियम और शर्तें",
  "Visit Our Store": "हमारी दुकान पर आएं",
  "Store Location": "दुकान का पता",
  "Address to be updated": "पता अपडेट किया जाएगा",
  "Call / WhatsApp": "कॉल / WhatsApp",
  "Opening Hours": "खुलने का समय",
  "Need help with your shopping?": "खरीदारी में मदद चाहिए?",
  "Connect with our team on WhatsApp.": "हमारी टीम से WhatsApp पर जुड़ें।",
  "Chat With Us": "हमसे चैट करें",
  "All rights reserved.": "सर्वाधिकार सुरक्षित।",
  "Made for your everyday needs": "आपकी रोज़मर्रा की ज़रूरतों के लिए",
  "Information you choose to share": "आपके द्वारा साझा की गई जानकारी",
  "How we use your information": "हम आपकी जानकारी का उपयोग कैसे करते हैं",
  "Third-party services": "थर्ड-पार्टी सेवाएं",
  "Keeping information safe": "जानकारी को सुरक्षित रखना",
  "Updates to this policy": "इस नीति में बदलाव",
  "Your privacy matters to us. This page explains, in simple terms, how we handle information you choose to share when you contact our store.": "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। इस पेज पर बताया गया है कि दुकान से संपर्क करते समय आपके द्वारा साझा की गई जानकारी को हम कैसे संभालते हैं।",
  "Questions or privacy requests?": "कोई सवाल या गोपनीयता संबंधी अनुरोध?",
  "Contact Rashid Mega Mart on WhatsApp at +91 89625 31603.": "+91 89625 31603 पर WhatsApp के ज़रिए Rashid Mega Mart से संपर्क करें।",
  "Using this website": "इस वेबसाइट का उपयोग",
  "Products, prices and availability": "सामान, कीमतें और उपलब्धता",
  "Orders and confirmation": "ऑर्डर और पुष्टि",
  "Payments, delivery and collection": "भुगतान, डिलीवरी और पिकअप",
  "Cancellations, returns and product concerns": "ऑर्डर रद्द करना, वापसी और सामान संबंधी समस्या",
  "Website content and updates": "वेबसाइट की सामग्री और अपडेट",
  "These terms explain the basic conditions for browsing our website and placing shopping enquiries with Rashid Mega Mart.": "इन नियमों में Rashid Mega Mart की वेबसाइट देखने और खरीदारी संबंधी पूछताछ करने की बुनियादी शर्तें दी गई हैं।",
  "Need help with an order?": "ऑर्डर में मदद चाहिए?",
  "Talk to our team before confirming your purchase.": "खरीदारी की पुष्टि से पहले हमारी टीम से बात करें।",
  "When you contact Rashid Mega Mart or place an enquiry through WhatsApp, you may choose to share details such as your name, phone number, delivery details and shopping requirements. Please share only the information needed to handle your enquiry or order.": "जब आप Rashid Mega Mart से संपर्क करते हैं या WhatsApp पर पूछताछ भेजते हैं, तो आप अपना नाम, फोन नंबर, डिलीवरी की जानकारी और खरीदारी की ज़रूरत साझा कर सकते हैं। केवल ज़रूरी जानकारी ही साझा करें।",
  "We use the details you provide to respond to questions, confirm product availability, coordinate orders and provide customer support. We do not ask you to send passwords, card PINs or one-time passwords over chat.": "आपकी दी गई जानकारी का उपयोग सवालों के जवाब देने, सामान की उपलब्धता बताने, ऑर्डर संभालने और ग्राहक सहायता के लिए किया जाता है। हम चैट पर पासवर्ड, कार्ड PIN या OTP नहीं मांगते।",
  "If you contact us through WhatsApp, that conversation is handled by WhatsApp and is also subject to its own privacy terms. Links to third-party services are outside our control.": "WhatsApp पर की गई बातचीत WhatsApp की अपनी गोपनीयता शर्तों के अधीन होती है। थर्ड-पार्टी सेवाओं के लिंक हमारे नियंत्रण से बाहर हैं।",
  "Please avoid sharing sensitive financial or identity information unless it is genuinely required. If you have a question about information you have shared with us, contact our team using the details below.": "जब तक ज़रूरी न हो, संवेदनशील वित्तीय या पहचान संबंधी जानकारी साझा न करें। साझा की गई जानकारी के बारे में सवाल हो तो नीचे दिए गए विवरण से हमारी टीम से संपर्क करें।",
  "We may update this page when our services or practices change. The latest version will be published here.": "सेवाओं या काम करने के तरीके में बदलाव होने पर हम इस पेज को अपडेट कर सकते हैं। नया संस्करण यहीं प्रकाशित होगा।",
  "You may browse our products, explore grocery kits and contact us for shopping enquiries. Please use the website lawfully and provide accurate information when contacting the store.": "आप हमारे सामान देख सकते हैं, किराना किट्स खोज सकते हैं और खरीदारी के लिए संपर्क कर सकते हैं। वेबसाइट का सही तरीके से उपयोग करें और दुकान से संपर्क करते समय सही जानकारी दें।",
  "Product listings, images, prices and availability are provided for general information and may change. Your order is subject to confirmation by Rashid Mega Mart, including the final price, quantity and availability.": "सामान की लिस्ट, तस्वीरें, कीमतें और उपलब्धता सामान्य जानकारी के लिए हैं और बदल सकती हैं। अंतिम कीमत, मात्रा और उपलब्धता सहित आपका ऑर्डर Rashid Mega Mart की पुष्टि के बाद ही तय होगा।",
  "Sending an enquiry or cart message does not by itself mean that an order has been accepted. We will confirm the order details with you before it is treated as confirmed.": "पूछताछ या कार्ट मैसेज भेजने का मतलब यह नहीं कि ऑर्डर स्वीकार हो गया है। ऑर्डर पक्का मानने से पहले हम आपसे विवरण की पुष्टि करेंगे।",
  "Please confirm the available payment method, delivery or collection arrangements, applicable charges and expected timing with the store before completing your purchase. Do not share an OTP, card PIN or banking password with anyone.": "खरीदारी पूरी करने से पहले दुकान से भुगतान का तरीका, डिलीवरी या पिकअप, लागू शुल्क और समय की पुष्टि करें। किसी के साथ OTP, कार्ड PIN या बैंकिंग पासवर्ड साझा न करें।",
  "If you need to change or cancel an order, or have a concern about a product, contact the store as soon as possible. Any return, replacement or refund request will be discussed with you based on the product and applicable requirements.": "ऑर्डर बदलना या रद्द करना हो, या सामान को लेकर कोई समस्या हो, तो जल्द दुकान से संपर्क करें। वापसी, बदलने या रिफंड के अनुरोध पर सामान और लागू शर्तों के अनुसार बात की जाएगी।",
  "We try to keep website information useful and up to date, but occasional errors or changes may occur. We may update products, content or these terms when needed.": "हम वेबसाइट की जानकारी सही और अपडेट रखने की कोशिश करते हैं, लेकिन कभी-कभी गलती या बदलाव हो सकता है। ज़रूरत पड़ने पर सामान, सामग्री या इन शर्तों को अपडेट किया जा सकता है।",
  "KIT DEAL": "किट ऑफर",
  "SAVE": "बचत",
  "Grocery Kit": "किराना किट",
  "Grocery Combo": "किराना कॉम्बो",
  "Products inside": "अंदर शामिल सामान",
  "Products": "सामान",
  "more items": "और सामान",
  "Special kit price": "खास किट कीमत",
  "Customize": "कस्टमाइज़ करें",
  "Language": "भाषा",
  "English": "अंग्रेज़ी",
  "Hindi": "हिंदी",
};


Object.assign(translations, {
  "Build your own combo": "अपना कॉम्बो बनाएं",
  "Make This Kit Yours!": "इस किट को अपनी पसंद का बनाएं!",
  "Choose what you need, adjust quantities and add extra groceries.": "ज़रूरत का सामान चुनें, मात्रा बदलें और अतिरिक्त किराना जोड़ें।",
  "KIT BUNDLE OFFER": "किट बंडल ऑफर",
  "items selected": "सामान चुने गए",
  "Your kit items": "आपकी किट का सामान",
  "Your changes are saved as a custom request for the store.": "आपके बदलाव दुकान के लिए कस्टम अनुरोध के रूप में सेव होंगे।",
  "included": "शामिल",
  "Included in this kit": "इस किट में शामिल",
  "No original items left. Add the groceries you want below.": "पुराना कोई सामान नहीं बचा। नीचे अपनी पसंद का किराना जोड़ें।",
  "Add more groceries": "और किराना जोड़ें",
  "Choose from our kits or type any item you need.": "हमारी किट से चुनें या अपनी ज़रूरत का सामान लिखें।",
  "Try: Aata, Chini, Detergent...": "जैसे: आटा, चीनी, डिटर्जेंट...",
  "Your extra items · price to be confirmed": "आपका अतिरिक्त सामान · कीमत की पुष्टि बाकी",
  "Smart Kit Deal": "स्मार्ट किट डील",
  "STORE PRICE": "दुकान की कीमत",
  "Compare the full basket before you buy.": "खरीदने से पहले पूरी टोकरी की कीमत की तुलना करें।",
  "Ready-made kit pricing keeps everyday essentials together. Ask us on WhatsApp for your best customized final quote.": "रेडीमेड किट में रोज़मर्रा का ज़रूरी सामान एक साथ मिलता है। अपनी कस्टम किट की अंतिम कीमत WhatsApp पर पूछें।",
  "Kit base price": "किट की मूल कीमत",
  "per kit": "प्रति किट",
  "Changing quantities inside the kit updates your request. The base kit price stays fixed; extra-item rates and final amount are confirmed by the owner on WhatsApp.": "किट के अंदर मात्रा बदलने से आपका अनुरोध अपडेट होगा। किट की मूल कीमत तय रहेगी; अतिरिक्त सामान की दर और अंतिम राशि मालिक WhatsApp पर बताएंगे।",
  "Update My Customized Kit": "मेरी कस्टम किट अपडेट करें",
  "Add Customized Kit to Cart": "कस्टम किट कार्ट में जोड़ें",
  "Live Kit Calculator": "लाइव किट कैलकुलेटर",
  "Kit base total": "किट की मूल कुल राशि",
  "Extra / customized items": "अतिरिक्त / कस्टम सामान",
  "Owner quote pending": "मालिक की कीमत की पुष्टि बाकी",
  "Current calculated total": "अभी की गणना की गई राशि",
  "Kit price × kit quantity": "किट की कीमत × किट की संख्या",
  "Quantity buttons recalculate this total instantly. Editing quantities inside a kit changes your item request, not the fixed bundle price.": "मात्रा बदलते ही यह कुल राशि अपडेट होती है। किट के अंदर सामान की मात्रा बदलने से अनुरोध बदलेगा, तय बंडल कीमत नहीं।",
  "Ek kit mein zaroori samaan, ek saath smart deal mein.": "एक किट में ज़रूरी सामान, एक साथ स्मार्ट डील में।",
  "Alag-alag kharidne se pehle apna total compare karein. Aapke customized order ka best possible final price Rashid Mega Mart ke owner WhatsApp par confirm karenge.": "अलग-अलग खरीदने से पहले कुल कीमत की तुलना करें। आपकी कस्टम खरीदारी की अंतिम कीमत Rashid Mega Mart के मालिक WhatsApp पर बताएंगे।",
  "Delivery charge": "डिलीवरी शुल्क",
  "WhatsApp par confirm": "WhatsApp पर पुष्टि करें",
  "You may also need": "आपको ये सामान भी चाहिए हो सकता है",
  "Suggestions": "सुझाव",
  "Suggested items are added as extras. Their prices will be confirmed by the store on WhatsApp.": "सुझाए गए सामान अतिरिक्त रूप में जुड़ेंगे। उनकी कीमत दुकान WhatsApp पर बताएगी।",
  "Added extras · price confirmation pending": "अतिरिक्त सामान जुड़ा · कीमत की पुष्टि बाकी",
  "Order confirmation and final charges will be shared by the store.": "ऑर्डर की पुष्टि और अंतिम शुल्क दुकान बताएगी।",
  "Delivery details are subject to store confirmation.": "डिलीवरी की जानकारी दुकान की पुष्टि पर निर्भर है।",
  "Order on WhatsApp": "WhatsApp पर ऑर्डर करें",
  "Delivery Address (Optional)": "डिलीवरी का पता (ज़रूरी नहीं)",
  "Bas naam aur mobile number bharein. Address baad mein WhatsApp par bhi confirm kar sakte hain.": "बस नाम और मोबाइल नंबर भरें। पता बाद में WhatsApp पर भी बता सकते हैं।",
  "Agar delivery chahiye: house no., area, landmark": "डिलीवरी चाहिए तो मकान नंबर, इलाका और पहचान की जगह लिखें",
  "Open cart,": "कार्ट खोलें,"
});

Object.assign(translations, {
  "Grocery Quantity Calculator": "किराना मात्रा कैलकुलेटर",
  "Item rates will be added after owner confirmation.": "मालिक की पुष्टि के बाद सामान की दरें जोड़ी जाएंगी।",
  "rates pending": "दरें बाकी",
  "Rate pending": "दर की पुष्टि बाकी",
  "Customized item total": "कस्टम सामान की कुल राशि",
  "Final calculation appears when all item rates are set.": "सभी सामान की दरें जुड़ने के बाद पूरी गणना दिखेगी।",
  "Calculated from confirmed store rates.": "दुकान की पुष्टि की गई दरों से गणना।",
  "Customized grocery estimate": "कस्टम किराना अनुमान",
  "Rates pending": "दरें बाकी",
  "Included in estimate when rates are set": "दरें जुड़ने पर गणना में शामिल",
  "Customized item breakdown": "कस्टम सामान का हिसाब",
  "item rates need owner confirmation": "सामान की दरों की मालिक से पुष्टि बाकी",
  "When every grocery rate is confirmed, the calculator uses (requested quantity ÷ rate quantity) × rate price, then multiplies by kit quantity. Until then, the listed bundle total remains visible separately.": "हर किराना सामान की दर की पुष्टि होने पर कैलकुलेटर (मांगी गई मात्रा ÷ दर वाली मात्रा) × दर की कीमत से हिसाब करेगा, फिर किट की संख्या से गुणा करेगा। तब तक किट की लिस्टेड कीमत अलग दिखाई जाएगी।"
});

Object.assign(translations, {
  "Browse kit offers": "किट ऑफर देखें",
  "Check active offers": "चालू ऑफर देखें",
  "Pick your value": "अपनी बचत चुनें",
  "Every kit shows its listed price and included essentials.": "हर किट की लिस्टेड कीमत और शामिल ज़रूरी सामान देखें।",
  "New kit deals are coming soon.": "नई किट डील जल्द आ रही हैं।",
  "Prices and kit contents are subject to store confirmation. No unverified discount is applied.": "कीमत और किट का सामान दुकान की पुष्टि के अधीन है। बिना पुष्टि की छूट नहीं दी जाती।",
  "Smart grocery deals.": "किराने की स्मार्ट डील।",
  "More value in every kit.": "हर किट में ज़्यादा फायदा।",
  "Explore our available ready-made grocery kits, compare what is included and choose the one that fits your home.": "हमारी उपलब्ध रेडीमेड किराना किट देखें, शामिल सामान की तुलना करें और अपने घर के लिए सही किट चुनें।",
  "A little extra saving": "थोड़ी और बचत",
  "starts with the right coupon.": "सही कूपन से शुरू होती है।",
  "Check with our store for current coupon availability, eligible kits and offer terms before placing your order.": "ऑर्डर करने से पहले मौजूदा कूपन, लागू किट और ऑफर की शर्तें दुकान से पूछें।",
  "Store-confirmed offers": "दुकान से पुष्टि किए गए ऑफर",
  "Coupon codes and discounts are shared only after the store confirms the current offer. Ask us which coupon applies to your selected kit.": "कूपन कोड और छूट दुकान की पुष्टि के बाद ही बताए जाते हैं। पूछें कि आपकी चुनी हुई किट पर कौन-सा कूपन लागू है।",
  "Verified before checkout": "ऑर्डर से पहले पुष्टि",
  "The store confirms coupon validity, eligible kits and final payable amount on WhatsApp.": "दुकान WhatsApp पर कूपन की वैधता, लागू किट और अंतिम राशि की पुष्टि करती है।",
  "No expired code surprises": "एक्सपायर कूपन का झंझट नहीं",
  "We do not display made-up coupon codes or discounts that have not been approved by the store.": "हम नकली कूपन कोड या दुकान से मंज़ूर न हुई छूट नहीं दिखाते।",
  "Explore Top Deals": "टॉप डील देखें"
});

const hindiTranslations = { ...translations };

const hinglishTranslations: Record<string, string> = {
  "Home": "Ghar", "Kits": "Kits", "Cart": "Cart", "Contact": "Sampark",
  "SMART GROCERY KITS": "Smart Grocery Kits",
  "Explore Grocery Kits": "Grocery Kits Dekhein",
  "Value-packed combos": "Budget-friendly Combos",
  "Delivery on confirmation": "Confirm hone par Delivery",
  "Grocery Shopping, Made Easier": "Grocery Shopping Ab Easy",
  "Why Choose Us?": "Humein Kyun Choose Karein?",
  "Market Jaane Ka Time Nahi?": "Market Jaane ka Time Nahi?",
  "WhatsApp Par Poochhein": "WhatsApp par Poochhein",
  "Ready Kits Dekhein": "Ready Kits Dekhein",
  "Our Grocery Kits": "Hamari Grocery Kits",
  "View All": "Sabhi Dekhein",
  "Search grocery kits...": "Grocery kits search karein...",
  "All Kits": "All Kits",
  "In Stock": "Stock Mein",
  "Out of Stock": "Out of Stock",
  "Reset": "Reset",
  "Customize": "Customize Karein",
  "Your cart is empty": "Aapka cart abhi khaali hai",
  "Your suggestion matters": "Aapka Suggestion Important Hai",
  "Your name": "Aapka Naam",
  "Add item": "Item Add Karein",
  "You may also need": "Ye Items Bhi Kaam Aa Sakte Hain",
  "Top Deals": "Top Deals",
  "Deals": "Deals",
  "Coupons": "Coupons",
  "More": "More",
  "Explore all kits": "Saari Kits Dekhein",
  "Available Kit Deals": "Available Kit Deals",
  "Ask for today’s active coupon": "Aaj ka active coupon poochhein",
  "Get coupon on WhatsApp": "WhatsApp par coupon lein",
  "Your cart": "Aapka Cart",
  "Items in this kit": "Is Kit Mein Items",
  "Your kit items": "Aapki Kit Ke Items",
  "Add to cart": "Cart Mein Add Karein",
  "Proceed to checkout": "Order Aage Badhaayein",
  "Order summary": "Order Summary",
  "Subtotal": "Subtotal",
  "Continue shopping": "Shopping Jaari Rakhein",
  "Back to Kits": "Kits Par Wapas Jayein",
  "Special Kit Price": "Special Kit Price",
  "BEST OFFER PRICE": "BEST OFFER PRICE",
  "SPECIAL KIT OFFER": "SPECIAL KIT OFFER",
  "items ready for checkout": "items checkout ke liye ready",
  "Grocery kits will be available soon.": "Grocery kits jald available hongi.",
  "Build your own combo": "Apna combo banayein",
  "Make This Kit Yours!": "Is kit ko apni pasand ka banayein!",
  "Choose what you need, adjust quantities and add extra groceries.": "Jo chahiye chunein, quantity badlein aur extra grocery add karein.",
  "KIT BUNDLE OFFER": "KIT BUNDLE OFFER",
  "items selected": "items select kiye",
  "Your kit items": "Aapki kit ke items",
  "Your changes are saved as a custom request for the store.": "Aapke changes store ke liye custom request mein save honge.",
  "included": "included",
  "Included in this kit": "Is kit mein included",
  "No original items left. Add the groceries you want below.": "Original items nahi bache. Neeche apni pasand ki grocery add karein.",
  "Add more groceries": "Aur grocery add karein",
  "Choose from our kits or type any item you need.": "Hamari kits se chunein ya apni zaroorat ka item likhein.",
  "Try: Aata, Chini, Detergent...": "Jaise: Aata, Chini, Detergent...",
  "Your extra items · price to be confirmed": "Aapke extra items · price confirm hona baaki",
  "Smart Kit Deal": "Smart Kit Deal",
  "STORE PRICE": "STORE PRICE",
  "Compare the full basket before you buy.": "Buy karne se pehle poori basket ka total compare karein.",
  "Ready-made kit pricing keeps everyday essentials together. Ask us on WhatsApp for your best customized final quote.": "Ready-made kit mein daily essentials ek saath milte hain. Customized final quote WhatsApp par poochhein.",
  "Kit base price": "Kit ki base price",
  "per kit": "per kit",
  "Changing quantities inside the kit updates your request. The base kit price stays fixed; extra-item rates and final amount are confirmed by the owner on WhatsApp.": "Kit ke andar quantity badalne se request update hogi. Base kit price fixed rahegi; extra items ke rates aur final amount owner WhatsApp par confirm karenge.",
  "Update My Customized Kit": "Meri Customized Kit Update Karein",
  "Add Customized Kit to Cart": "Customized Kit Cart Mein Add Karein",
  "Live Kit Calculator": "Live Kit Calculator",
  "Kit base total": "Kit ka base total",
  "Extra / customized items": "Extra / customized items",
  "Owner quote pending": "Owner quote pending",
  "Current calculated total": "Abhi ka calculated total",
  "Kit price × kit quantity": "Kit price × kit quantity",
  "Quantity buttons recalculate this total instantly. Editing quantities inside a kit changes your item request, not the fixed bundle price.": "Quantity buttons se total turant update hota hai. Kit ke andar quantity edit karne se item request badlegi, fixed bundle price nahi.",
  "Ek kit mein zaroori samaan, ek saath smart deal mein.": "Ek kit mein zaroori samaan, ek saath smart deal mein.",
  "Alag-alag kharidne se pehle apna total compare karein. Aapke customized order ka best possible final price Rashid Mega Mart ke owner WhatsApp par confirm karenge.": "Alag-alag kharidne se pehle total compare karein. Customized order ka final price Rashid Mega Mart ke owner WhatsApp par confirm karenge.",
  "Delivery charge": "Delivery charge",
  "WhatsApp par confirm": "WhatsApp par confirm",
  "Suggestions": "Suggestions",
  "Suggested items are added as extras. Their prices will be confirmed by the store on WhatsApp.": "Suggested items extras mein add honge. Inki price store WhatsApp par confirm karega.",
  "Added extras · price confirmation pending": "Extra items add hue · price confirmation pending",
  "Order confirmation and final charges will be shared by the store.": "Order confirmation aur final charges store share karega.",
  "Delivery details are subject to store confirmation.": "Delivery details store confirmation par depend hain.",
  "Order on WhatsApp": "WhatsApp par Order Karein",
  "Delivery Address (Optional)": "Delivery Address (Optional)",
  "Bas naam aur mobile number bharein. Address baad mein WhatsApp par bhi confirm kar sakte hain.": "Bas naam aur mobile number bharein. Address baad mein WhatsApp par bhi confirm kar sakte hain.",
  "Agar delivery chahiye: house no., area, landmark": "Delivery chahiye to house no., area, landmark likhein",
  "Grocery Quantity Calculator": "Grocery Quantity Calculator",
  "Item rates will be added after owner confirmation.": "Owner confirm karne ke baad item rates add honge.",
  "rates pending": "rates pending",
  "Rate pending": "Rate pending",
  "Customized item total": "Customized items ka total",
  "Final calculation appears when all item rates are set.": "Sabhi item rates set hone par final calculation dikhegi.",
  "Calculated from confirmed store rates.": "Store ke confirmed rates se calculated.",
  "Customized grocery estimate": "Customized grocery estimate",
  "Rates pending": "Rates pending",
  "Included in estimate when rates are set": "Rates set hone par estimate mein included",
  "Customized item breakdown": "Customized items ka breakdown",
  "item rates need owner confirmation": "item rates owner se confirm hone baaki",
  "When every grocery rate is confirmed, the calculator uses (requested quantity ÷ rate quantity) × rate price, then multiplies by kit quantity. Until then, the listed bundle total remains visible separately.": "Jab sabhi grocery rates confirm ho jayenge, calculator (requested quantity ÷ rate quantity) × rate price karega, phir kit quantity se multiply karega. Tab tak listed bundle total alag dikhega.",
  "Browse kit offers": "Kit offers dekhein",
  "Check active offers": "Active offers check karein",
  "Pick your value": "Apni value chunein",
  "Every kit shows its listed price and included essentials.": "Har kit ki listed price aur included essentials dekhein.",
  "New kit deals are coming soon.": "Nayi kit deals jald aa rahi hain.",
  "Prices and kit contents are subject to store confirmation. No unverified discount is applied.": "Prices aur kit contents store confirmation par depend hain. Bina verify ki discount apply nahi hoti.",
  "Smart grocery deals.": "Smart grocery deals.",
  "More value in every kit.": "Har kit mein zyada value.",
  "Explore our available ready-made grocery kits, compare what is included and choose the one that fits your home.": "Available ready-made grocery kits dekhein, included items compare karein aur apne ghar ke liye sahi kit chunein.",
  "A little extra saving": "Thodi extra saving",
  "starts with the right coupon.": "Sahi coupon se shuru hoti hai.",
  "Check with our store for current coupon availability, eligible kits and offer terms before placing your order.": "Order se pehle current coupon availability, eligible kits aur offer terms store se confirm karein.",
  "Store-confirmed offers": "Store-confirmed offers",
  "Coupon codes and discounts are shared only after the store confirms the current offer. Ask us which coupon applies to your selected kit.": "Coupon codes aur discounts store ke current offer confirm karne ke baad hi share hote hain. Apni selected kit ke liye applicable coupon poochhein.",
  "Verified before checkout": "Checkout se pehle verified",
  "The store confirms coupon validity, eligible kits and final payable amount on WhatsApp.": "Store WhatsApp par coupon validity, eligible kits aur final payable amount confirm karta hai.",
  "No expired code surprises": "Expired code ka surprise nahi",
  "We do not display made-up coupon codes or discounts that have not been approved by the store.": "Hum fake coupon codes ya store se approve na hui discounts display nahi karte.",
  "Explore Top Deals": "Top Deals dekhein"
  "Grocery": "Kirana",
  "Grocery Kit": "Kirana Kit",
  "Grocery Kits": "Kirana Kits",
  "Products in this kit": "Is kit mein samaan",
  "Products": "Samaan",
  "Search grocery kits...": "Kirana kits search karein...",
  "Clear search": "Search hataayein",
  "Availability": "Availability",
  "All Kits": "Saari Kits",
  "In Stock": "Stock mein",
  "Out of Stock": "Stock mein nahi",
  "Sort:": "Sort karein:",
  "Featured": "Featured",
  "Price: Low to High": "Price: kam se zyada",
  "Price: High to Low": "Price: zyada se kam",
  "Name: A to Z": "Naam: A se Z",
  "No kits found": "Koi kit nahi mili",
  "Try another search or change the filters.": "Dusra search karein ya filters badlein.",
  "Reset Filters": "Filters reset karein",
  "Browse kit offers": "Kit offers dekhein",
  "Check active offers": "Active offers check karein",
  "Pick your value": "Apni value chunein",
  "More value in every kit.": "Har kit mein zyada value.",
  "Smart grocery deals.": "Smart grocery deals.",
  "New kit deals are coming soon.": "Nayi kit deals jald aa rahi hain.",
  "Top Deals": "Top Deals",
  "Deals": "Deals",
  "Coupons": "Coupons",
  "More": "More",
  "Home": "Ghar",
  "Cart": "Cart",
  "Contact": "Sampark",
  "Language": "Bhasha",
  "English": "English",
  "Hindi": "Hindi",
  "Current language:": "Abhi ki language:",
  "Switch to": "Badlein:",

};

const DEVANAGARI_CONSONANTS: Record<string, string> = {
  क:"k", ख:"kh", ग:"g", घ:"gh", ङ:"ng", च:"ch", छ:"chh", ज:"j", झ:"jh", ञ:"ny",
  ट:"t", ठ:"th", ड:"d", ढ:"dh", ण:"n", त:"t", थ:"th", द:"d", ध:"dh", न:"n",
  प:"p", फ:"ph", ब:"b", भ:"bh", म:"m", य:"y", र:"r", ल:"l", व:"v", श:"sh", ष:"sh", स:"s", ह:"h"
};
const DEVANAGARI_VOWELS: Record<string, string> = {
  अ:"a", आ:"aa", इ:"i", ई:"ee", उ:"u", ऊ:"oo", ऋ:"ri", ए:"e", ऐ:"ai", ओ:"o", औ:"au"
};
const DEVANAGARI_MATRAS: Record<string, string> = {
  "ा":"aa", "ि":"i", "ी":"ee", "ु":"u", "ू":"oo", "ृ":"ri", "े":"e", "ै":"ai", "ो":"o", "ौ":"au"
};

function transliterateHindi(value: string) {
  const chars = Array.from(value.replaceAll("क्ष", "ksh").replaceAll("ज्ञ", "gya").replaceAll("त्र", "tra"));
  let output = "";
  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    if (DEVANAGARI_CONSONANTS[char]) {
      output += DEVANAGARI_CONSONANTS[char];
      const next = chars[index + 1];
      if (DEVANAGARI_MATRAS[next]) {
        output += DEVANAGARI_MATRAS[next];
        index += 1;
      } else if (next === "्") {
        index += 1;
      } else {
        output += "a";
      }
    } else if (DEVANAGARI_VOWELS[char]) {
      output += DEVANAGARI_VOWELS[char];
    } else if (DEVANAGARI_MATRAS[char]) {
      output += DEVANAGARI_MATRAS[char];
    } else if (char === "ं" || char === "ँ") {
      output += "n";
    } else if (char === "ः") {
      output += "h";
    } else if (char === "़" || char === "्") {
      continue;
    } else {
      output += char;
    }
  }
  return output.replace(/a(?=[\s.,!?।]|$)/g, "");
}

for (const [source, target] of Object.entries(translations)) {
  if (!hinglishTranslations[source]) hinglishTranslations[source] = transliterateHindi(target);
}

function translateText(value: string, dictionary: Record<string, string> = translations) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const exact = dictionary[trimmed];
  if (exact) return value.replace(trimmed, exact);

  let result = value;
  for (const [source, target] of Object.entries(dictionary).filter(([source]) => source.length > 3).sort(([a], [b]) => b.length - a.length)) {
    if (result.includes(source)) result = result.replaceAll(source, target);
  }
  if (dictionary === hindiTranslations) {
    result = result.replace(/(\d+) WALI KIT/gi, "$1 वाली किट");
    result = result.replace(/Open cart, (\d+) items?/gi, "कार्ट खोलें, $1 सामान");
    result = result.replace(/Decrease (.+?) quantity/gi, "$1 की मात्रा घटाएं");
    result = result.replace(/Increase (.+?) quantity/gi, "$1 की मात्रा बढ़ाएं");
    result = result.replace(/(\d+) of (\d+) kits found/gi, "$1 में से $2 किट्स मिलीं");
    result = result.replace(/(\d+) Kits Found/gi, "$1 किट्स मिलीं");
    result = result.replace(/(\d+) items ready for checkout/gi, "$1 सामान ऑर्डर के लिए तैयार");
    result = result.replace(/(\d+) items?/gi, "$1 सामान");
    result = result.replace(/(\d+) Items/gi, "$1 सामान");
  } else {
    result = result.replace(/(\d+) WALI KIT/gi, "$1 wali kit");
    result = result.replace(/Open cart, (\d+) items?/gi, "Cart kholein, $1 items");
    result = result.replace(/Decrease (.+?) quantity/gi, "$1 ki quantity kam karein");
    result = result.replace(/Increase (.+?) quantity/gi, "$1 ki quantity badhayein");
    result = result.replace(/(\d+) of (\d+) kits found/gi, "$1 mein se $2 kits mili");
    result = result.replace(/(\d+) Kits Found/gi, "$1 kits mili");
    result = result.replace(/(\d+) items ready for checkout/gi, "$1 items order ke liye ready");
    result = result.replace(/(\d+) items?/gi, "$1 items");
    result = result.replace(/(\d+) Items/gi, "$1 items");
  }
  return result;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribeToLanguage, getLanguageSnapshot, getServerLanguageSnapshot);
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
      const translated = nextLanguage === "en" ? original : translateText(original, nextLanguage === "hi" ? hindiTranslations : hinglishTranslations);
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
        const translated = nextLanguage === "en" ? original : translateText(original, nextLanguage === "hi" ? hindiTranslations : hinglishTranslations);
        records.set(attribute, { original, translated });
        if (current !== translated) element.setAttribute(attribute, translated);
      }
    }

    document.documentElement.lang = nextLanguage === "hi" ? "hi-IN" : nextLanguage === "hinglish" ? "hi-Latn" : "en-IN";
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

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "hinglish" : language === "hinglish" ? "hi" : "en";
    currentLanguage = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Language remains active in memory for this session.
    }
    window.dispatchEvent(new Event("rmm-language-change"));
  };

  return (
    <LanguageContext.Provider value={language}>
      <LanguageToggleContext.Provider value={toggleLanguage}>
        {children}
      </LanguageToggleContext.Provider>
    </LanguageContext.Provider>
  );
}
