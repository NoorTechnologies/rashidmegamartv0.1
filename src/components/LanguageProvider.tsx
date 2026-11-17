"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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
  result = result.replace(/(\\d+)\\s*किलो/g, "$1 kg").replace(/(\\d+)\\s*लीटर/g, "$1 litres").replace(/(\\d+)\\s*ग्राम/g, "$1 g").replace(/(\\d+)\\s*पैकेट/g, "$1 packs").replace(/(\\d+)\\s*पीस/g, "$1 pcs").replace(/(\\d+)\\s*पाउच/g, "$1 pouches").replace(/(\\d+)\\s*सेट/g, "$1 sets").replace(/(\\d+)\\s*बोरी/g, "$1 sack");
  return result;
}

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

const hindiTranslations = { ...translations };

Object.assign(translations, {
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
});

const phraseReplacements = Object.entries(translations)
  .filter(([source]) => source.length > 3)
  .sort(([a], [b]) => b.length - a.length);

function translateText(value: string, dictionary: Record<string, string> = translations) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const exact = dictionary[trimmed];
  if (exact) return value.replace(trimmed, exact);

  let result = value;
  for (const [source, target] of Object.entries(dictionary).filter(([source]) => source.length > 3).sort(([a], [b]) => b.length - a.length)) {
    if (result.includes(source)) result = result.replaceAll(source, target);
  }
  result = result.replace(/(\d+) WALI KIT/gi, "$1 वाली किट");
  result = result.replace(/Open cart, (\d+) items?/gi, "कार्ट खोलें, $1 सामान");
  result = result.replace(/Decrease (.+?) quantity/gi, "$1 की मात्रा घटाएं");
  result = result.replace(/Increase (.+?) quantity/gi, "$1 की मात्रा बढ़ाएं");
  result = result.replace(/(\d+) of (\d+) kits found/gi, "$1 में से $2 किट्स मिलीं");
  result = result.replace(/(\d+) Kits Found/gi, "$1 किट्स मिलीं");
  result = result.replace(/(\d+) items ready for checkout/gi, "$1 सामान ऑर्डर के लिए तैयार");
  result = result.replace(/(\d+) items?/gi, "$1 सामान");
  result = result.replace(/(\d+) Items/gi, "$1 सामान");
  return result;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
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
      const translated = nextLanguage === "en" ? original : translateText(original, nextLanguage === "hi" ? hindiTranslations : translations);
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

    document.documentElement.lang = nextLanguage === "hi" ? "hi-IN" : nextLanguage === "hinglish" ? "hi-Latn" : "en-IN";
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "hi" || saved === "hinglish" || saved === "en") setLanguage(saved);
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

  const toggleLanguage = () => {
    const next: Language = language === "en" ? "hinglish" : language === "hinglish" ? "hi" : "en";
    setLanguage(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Language remains active for this session.
    }
  };

  return (
    <LanguageContext.Provider value={language}>
      <LanguageToggleContext.Provider value={toggleLanguage}>
        {children}
      </LanguageToggleContext.Provider>
    </LanguageContext.Provider>
  );
}
