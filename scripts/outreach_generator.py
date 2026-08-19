#!/usr/bin/env python3
"""
AgentIQ Outreach Campaign Generator
Generates personalized, high-converting WhatsApp, Cold Email, and LinkedIn outreach sequences
for Indian SMBs (Clinics, Restaurants, Salons, D2C Brands) tailored to AgentIQ's Chatbot & Voice Agent services.
"""

import argparse
import sys
from typing import Dict, Any

TEMPLATES: Dict[str, Dict[str, Any]] = {
    "clinic": {
        "title": "Medical Clinics & Healthcare",
        "pain_point": "After-hours missed patient inquiries & 30%+ no-show rates",
        "whatsapp": {
            "touch_1": (
                "Hi {owner_name} / Team {business_name},\n\n"
                "I noticed your clinic reception closes in the evening, but in {city}, nearly 35% of patient appointment queries happen between 7:30 PM and 11 PM.\n\n"
                "We built Naina — an AI voice receptionist that answers patient calls 24/7 in natural Hindi & English, checks doctor slots, and confirms bookings instantly via WhatsApp (with 0 hold time).\n\n"
                "Could I send you a 30-second audio recording of how Naina handles patient bookings for {business_name}?"
            ),
            "touch_2": (
                "Hi {owner_name},\n\n"
                "Here is a 45-second demo of our AI answering a patient booking inquiry in Hindi & English for a dental/medical clinic: https://agentiq.co.in/ai-voice-agents-india\n\n"
                "Clinics using this recover an extra 15-20 appointments/month that used to go to voicemail or busy tones.\n\n"
                "Would you be open to a quick 10-minute live demo on your phone this Thursday or Friday?"
            ),
            "touch_3": (
                "Hi {owner_name}, closing the loop here.\n\n"
                "If front-desk bandwidth is running smoothly, no worries at all! Just wanted to share that every AgentIQ voice agent is backed by a 100% 30-day money-back guarantee and goes live in 7 days.\n\n"
                "If you'd ever like to automate your after-hours patient bookings, you can test our bot live anytime here: https://agentiq.co.in/clinics"
            )
        },
        "email": {
            "subject": "Quick question regarding after-hours calls at {business_name}",
            "body": (
                "Hi {owner_name},\n\n"
                "Most medical practices in {city} lose 3-5 high-value consultation bookings every week simply because patients call after 7 PM or while receptionists are on another line.\n\n"
                "At AgentIQ (https://agentiq.co.in), we deploy done-for-you AI Voice Receptionists (Naina) and WhatsApp Assistants that:\n"
                "• Answer inbound phone calls 24/7 in natural Hindi & English (620ms latency)\n"
                "• Check real-time doctor availability and log appointments to Google Sheets / your CRM\n"
                "• Send instant WhatsApp confirmation & automated reminder nudges to cut no-shows\n"
                "• Gracefully escalate clinical emergency questions directly to human staff\n\n"
                "Our plans start at ₹14,999/mo (+ setup) and are backed by a 30-day money-back guarantee.\n\n"
                "Are you available for a brief 10-minute phone call this week so I can simulate a test call customized for {business_name}?\n\n"
                "Best regards,\n"
                "Shane Pereira\n"
                "Founder, AgentIQ\n"
                "shane@agentiq.co.in | +91 91596 65277"
            )
        },
        "linkedin": (
            "Hi {owner_name}, came across {business_name} while researching healthcare practices in {city}. "
            "We built an AI voice receptionist (Naina) that answers patient calls 24/7 in Hindi/English and auto-books appointments into your schedule. "
            "Would you be open to a 30-second audio demo of how it works?"
        )
    },
    "restaurant": {
        "title": "Restaurants, Cafes & Cloud Kitchens",
        "pain_point": "Weekend reservation call rushes & high 25-30% Zomato/Swiggy commission drag",
        "whatsapp": {
            "touch_1": (
                "Hi {owner_name} / Team {business_name},\n\n"
                "Quick question: on busy Friday & Saturday evenings, how many reservation calls or WhatsApp table booking requests get missed while staff is busy serving guests on the floor?\n\n"
                "We build 24/7 AI WhatsApp and Voice agents for Indian restaurants that take table reservations, share the food menu, and take direct orders without paying 25% aggregator commissions.\n\n"
                "Can I share a 30-second WhatsApp demo showing how it books a table for 4 at {business_name}?"
            ),
            "touch_2": (
                "Hi {owner_name},\n\n"
                "Here is a live simulation of a restaurant WhatsApp assistant taking a table booking and sending a Google Maps pin + reservation ID: https://agentiq.co.in/try-your-bot\n\n"
                "It takes 7 days to deploy and saves restaurant managers 2-3 hours of manual WhatsApp replies every day.\n\n"
                "Would you be free for a 10-min demo call tomorrow around 4 PM (before the evening rush)?"
            ),
            "touch_3": (
                "Hi {owner_name}, following up one last time.\n\n"
                "If table reservations and WhatsApp inquiries are already on autopilot, all good! If you ever want a done-for-you WhatsApp & Voice bot that never misses a weekend diner, our details are here: https://agentiq.co.in/restaurants\n\n"
                "Cheers!"
            )
        },
        "email": {
            "subject": "Automating weekend table bookings for {business_name}",
            "body": (
                "Hi {owner_name},\n\n"
                "During peak dining hours in {city}, front-of-house staff often miss 10-15 calls from customers trying to reserve a table or ask for parking/menu details.\n\n"
                "AgentIQ (https://agentiq.co.in) provides done-for-you WhatsApp AI Chatbots and Phone Voice Agents tailored for Indian restaurants:\n"
                "• 24/7 automated table reservations with real-time Google Sheets / POS sync\n"
                "• Interactive digital menu browsing & direct order checkout via WhatsApp Pay/UPI\n"
                "• Automated reservation reminder SMS/WhatsApp to eliminate weekend no-shows\n"
                "• Seamless human handoff for large banquet/party inquiries\n\n"
                "Starter plans are ₹7,999/mo (+ setup) and backed by a 30-day money-back guarantee.\n\n"
                "Could I show you a 5-minute live preview of {business_name}'s bot over WhatsApp this week?\n\n"
                "Best regards,\n"
                "Shane Pereira\n"
                "Founder, AgentIQ\n"
                "shane@agentiq.co.in | +91 91596 65277"
            )
        },
        "linkedin": (
            "Hi {owner_name}, love the concept at {business_name}! We help top restaurants in {city} automate WhatsApp table reservations and direct orders 24/7 so staff never miss a guest during peak dinner hours. "
            "Would you be open to seeing a 30-second live demo?"
        )
    },
    "salon": {
        "title": "Salons, Spas & Aesthetic Centers",
        "pain_point": "Unanswered Instagram DMs & late-night WhatsApp booking inquiries",
        "whatsapp": {
            "touch_1": (
                "Hi {owner_name} / Team {business_name},\n\n"
                "I noticed your team gets great engagement on Instagram! When clients message late at night asking 'What are your rates for [service]?' or 'Any slots for Saturday 4 PM?', who replies?\n\n"
                "We build AI WhatsApp and Instagram DM bots that instantly share service menus, stylist availability, and book confirmed appointments with automated reminder nudges.\n\n"
                "Could I send you a 20-second mockup of how {business_name}'s Instagram & WhatsApp bot would look?"
            ),
            "touch_2": (
                "Hi {owner_name},\n\n"
                "Sharing a quick link where you can test how our salon assistant answers price inquiries, recommends hair/skin services, and confirms slots: https://agentiq.co.in/salons\n\n"
                "Salons using this report zero lost DMs on weekend drops and a noticeable drop in no-shows.\n\n"
                "Would you be open to a 10-minute preview call this week?"
            ),
            "touch_3": (
                "Hi {owner_name}, closing the loop.\n\n"
                "If your team is managing all Instagram DMs and WhatsApp bookings smoothly, no problem at all! If you ever want to put bookings on autopilot with a 30-day money-back guarantee, feel free to reach out anytime: https://agentiq.co.in"
            )
        },
        "email": {
            "subject": "Capturing after-hours salon bookings for {business_name}",
            "body": (
                "Hi {owner_name},\n\n"
                "Over 40% of salon and spa appointments in {city} are researched and booked after 8 PM on Instagram and WhatsApp — when staff are off the clock.\n\n"
                "AgentIQ (https://agentiq.co.in) deploys done-for-you AI assistants that:\n"
                "• Instantly answer pricing and package queries on Instagram DM and WhatsApp 24/7\n"
                "• Book appointments based on stylist availability and sync to your calendar/Sheets\n"
                "• Send automated pre-appointment reminders to virtually eliminate no-shows\n"
                "• Speak naturally in Hindi, Hinglish, and English\n\n"
                "Starter plans start at ₹7,999/mo (+ setup) with a 30-day money-back guarantee.\n\n"
                "Would you be open to a 10-minute demo on WhatsApp this week to see how it works for {business_name}?\n\n"
                "Best regards,\n"
                "Shane Pereira\n"
                "Founder, AgentIQ\n"
                "shane@agentiq.co.in | +91 91596 65277"
            )
        },
        "linkedin": (
            "Hi {owner_name}, saw your work with {business_name} in {city}. We build 24/7 AI WhatsApp & Instagram booking assistants for premium salons that turn late-night DMs into confirmed appointments automatically. "
            "Would you be interested in a quick 30-second demo?"
        )
    },
    "d2c": {
        "title": "D2C & E-Commerce Brands",
        "pain_point": "High COD RTO rates, abandoned checkouts & support ticket backlogs",
        "whatsapp": {
            "touch_1": (
                "Hi {owner_name},\n\n"
                "Saw the growth at {business_name}! Quick question: what is your current RTO rate on Cash on Delivery orders?\n\n"
                "We build automated WhatsApp checkout and COD confirmation bots for Shopify D2C brands that verify orders right after checkout and nudge prepaid conversions with 1-click UPI links (cutting RTO by 18-25%).\n\n"
                "Can I share a 30-second screenshot of how our WhatsApp COD confirmation flow works?"
            ),
            "touch_2": (
                "Hi {owner_name},\n\n"
                "Here is how Indian D2C brands use automated WhatsApp flows for COD confirmation, address validation, and delivery day reminders: https://agentiq.co.in/d2c-ecommerce\n\n"
                "It connects directly to Shopify in under 7 business days without custom engineering.\n\n"
                "Would you be open to a 15-min call this Thursday to see the RTO math for {business_name}?"
            ),
            "touch_3": (
                "Hi {owner_name}, last follow up.\n\n"
                "If COD returns and order tracking are already fully optimized, no worries! If you ever want to test automated WhatsApp order validation with our 30-day money-back guarantee, here is our full breakdown: https://agentiq.co.in/blog/whatsapp-cod-confirmation-rto-reduction-d2c-india\n\n"
                "Best of luck with Q3/Q4 scaling!"
            )
        },
        "email": {
            "subject": "Reducing COD RTO by 20%+ for {business_name}",
            "body": (
                "Hi {owner_name},\n\n"
                "For high-growth Indian D2C brands, every 100 COD orders often result in 20-35 returns (RTO), costing double shipping fees, packaging waste, and stranded inventory.\n\n"
                "AgentIQ (https://agentiq.co.in) integrates directly with your Shopify store to deploy automated WhatsApp infrastructure that:\n"
                "• Sends instantaneous 1-click WhatsApp order confirmation buttons right after checkout\n"
                "• Offers time-sensitive UPI prepaid conversion discounts (converting ~15% of COD buyers to prepaid)\n"
                "• Flags incomplete pin codes and addresses before dispatch\n"
                "• Handles automated order status, sizing FAQs, and returns/exchanges 24/7\n\n"
                "Plans start at ₹7,999/mo (+ setup) and are backed by a 30-day money-back guarantee.\n\n"
                "Are you open to a brief 10-minute call this week to see how this fits into {business_name}'s post-purchase flow?\n\n"
                "Best regards,\n"
                "Shane Pereira\n"
                "Founder, AgentIQ\n"
                "shane@agentiq.co.in | +91 91596 65277"
            )
        },
        "linkedin": (
            "Hi {owner_name}, great work scaling {business_name}! We help Indian D2C brands cut COD RTO by 20%+ and automate post-purchase WhatsApp support directly on Shopify. "
            "Open to a quick 3-minute chat or demo?"
        )
    }
}

def generate_outreach(business_name: str, owner_name: str, city: str, vertical: str) -> str:
    vert_data = TEMPLATES.get(vertical.lower())
    if not vert_data:
        raise ValueError(f"Unknown vertical: {vertical}. Choose from: clinic, restaurant, salon, d2c")
    
    clean_owner = owner_name.strip()
    if vertical == "clinic":
        salutation_name = clean_owner if clean_owner.lower().startswith("dr") else f"Dr. {clean_owner}"
    else:
        salutation_name = clean_owner

    ctx = {
        "business_name": business_name,
        "owner_name": salutation_name,
        "city": city
    }
    
    output = []
    output.append("=" * 80)
    output.append(f"AGENTIQ OUTREACH PACKAGE: {business_name.upper()} ({vert_data['title']})")
    output.append(f"Target City: {city} | Decision Maker: {owner_name}")
    output.append(f"Core Pain Point: {vert_data['pain_point']}")
    output.append("=" * 80)
    
    output.append("\n" + "─" * 40)
    output.append("📱 3-TOUCH WHATSAPP CADENCE (High Conversion)")
    output.append("─" * 40)
    output.append("\n[Touch 1: Mystery Shopper / Pattern Interrupt]")
    output.append(vert_data["whatsapp"]["touch_1"].format(**ctx))
    output.append("\n[Touch 2: Value & Demo Proof (Send 2 days later)]")
    output.append(vert_data["whatsapp"]["touch_2"].format(**ctx))
    output.append("\n[Touch 3: Risk-Reversal & Breakup (Send 4 days later)]")
    output.append(vert_data["whatsapp"]["touch_3"].format(**ctx))
    
    output.append("\n" + "─" * 40)
    output.append("📧 COLD EMAIL SEQUENCE")
    output.append("─" * 40)
    output.append(f"Subject: {vert_data['email']['subject'].format(**ctx)}")
    output.append("\n" + vert_data["email"]["body"].format(**ctx))
    
    output.append("\n" + "─" * 40)
    output.append("💼 LINKEDIN DIRECT MESSAGE (Under 300 Characters)")
    output.append("─" * 40)
    output.append(vert_data["linkedin"].format(**ctx))
    output.append("\n" + "=" * 80)
    
    return "\n".join(output)

def main():
    parser = argparse.ArgumentParser(description="Generate AgentIQ Cold Outreach Sequences")
    parser.add_argument("--business", "-b", required=True, help="Business Name (e.g. 'Apex Dental', 'Bastian', 'Enrich Salon', 'Dr. Vaidya's')")
    parser.add_argument("--owner", "-o", default="Founder / Team", help="Decision Maker Name (e.g. 'Dr. Rohit', 'Karan', 'Priya')")
    parser.add_argument("--city", "-c", default="Mumbai", help="Target City (e.g. 'Mumbai', 'Delhi', 'Bangalore')")
    parser.add_argument("--vertical", "-v", required=True, choices=["clinic", "restaurant", "salon", "d2c"], help="Industry vertical")
    
    args = parser.parse_args()
    
    result = generate_outreach(
        business_name=args.business,
        owner_name=args.owner,
        city=args.city,
        vertical=args.vertical
    )
    print(result)

if __name__ == "__main__":
    main()
