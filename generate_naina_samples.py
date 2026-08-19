import asyncio
import edge_tts
import os

media_dir = "/Users/shanepereira/Projects/agentiq/media"
os.makedirs(media_dir, exist_ok=True)

# 1. Hindi Restaurant Demo (Naina - SwaraNeural, faster pace +14%)
hindi_text = (
    "Namaste! Spice Route main aapka swagat hai. "
    "Aaj raat 8 baje 4 logon ke liye aapki table confirm ho gayi hai. "
    "Kya aap starters main Paneer Tikka advance main pre-order karna chahenge? "
    "Ji bilkul, 2 Paneer Tikka add kar diya hai! Aapka table reserved hai."
)

# 2. Hinglish Salon Demo (Naina - SwaraNeural, faster pace +14%)
hinglish_text = (
    "Good Evening, kaise ho? Luxe Salon main aapka swagat hai. "
    "Saturday ko 11:30 AM aur 4:00 PM pe slots open hain Senior Stylist Priya ke saath. "
    "Perfect! Aapka Saturday 11:30 AM ka slot lock ho gaya hai. "
    "Location link aur reminder WhatsApp pe bhej diya hai!"
)

# 3. English D2C Cart Recovery Demo (Naina - NeerjaExpressiveNeural, faster pace +12%)
english_text = (
    "Hi Vikram! This is Naina calling from Velvet Fashion. "
    "I noticed you left items in your cart. "
    "Would you like an instant 10 percent discount to complete your order today? "
    "Great! I have sent the 1-click checkout link straight to your WhatsApp."
)

async def generate():
    print("Generating faster Hindi Naina audio (+14%)...")
    tts_hi = edge_tts.Communicate(hindi_text, "hi-IN-SwaraNeural", rate="+14%", pitch="+1Hz")
    await tts_hi.save(f"{media_dir}/voice-restaurant-hindi.mp3")

    print("Generating faster Hinglish Naina audio (+14%)...")
    tts_hinglish = edge_tts.Communicate(hinglish_text, "hi-IN-SwaraNeural", rate="+14%", pitch="+1Hz")
    await tts_hinglish.save(f"{media_dir}/voice-salon-hinglish.mp3")

    print("Generating faster English Naina audio (+12%)...")
    tts_en = edge_tts.Communicate(english_text, "en-IN-NeerjaExpressiveNeural", rate="+12%", pitch="+1Hz")
    await tts_en.save(f"{media_dir}/voice-d2c-english.mp3")

    print("All 3 faster Naina voice audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
