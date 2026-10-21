#!/usr/bin/env python3
"""
IPL Auction Arena - Master Player Database Ingestion & Verification Pipeline
Parses the official BCCI IPL 2025 Auction List PDF, cross-references with official
retentions, 2025 mega-auction outcomes, and all-time historical purchases.
Generates TypeScript data, JSON seed, CSV catalog, SQL migrations/seeds, and reports.
"""

import os
import re
import json
import csv
from datetime import datetime
import pypdf

PDF_PATH = 'ipl_2025_auction_list.pdf'

KNOWN_COUNTRIES = [
    'South Africa', 'New Zealand', 'West Indies', 'Sri Lanka', 'England',
    'Australia', 'Afghanistan', 'Bangladesh', 'Ireland', 'Zimbabwe', 'Netherlands',
    'Scotland', 'USA', 'Namibia', 'Canada', 'UAE', 'Italy', 'India'
]

# Official Franchises Mapping
FRANCHISE_MAP = {
    'csk': 'Chennai Super Kings',
    'mi': 'Mumbai Indians',
    'kkr': 'Kolkata Knight Riders',
    'srh': 'Sunrisers Hyderabad',
    'rr': 'Rajasthan Royals',
    'gt': 'Gujarat Titans',
    'rcb': 'Royal Challengers Bengaluru',
    'dc': 'Delhi Capitals',
    'lsg': 'Lucknow Super Giants',
    'pbks': 'Punjab Kings'
}

FRANCHISE_NAME_TO_ID = {
    'Chennai Super Kings': 'csk',
    'Mumbai Indians': 'mi',
    'Kolkata Knight Riders': 'kkr',
    'Sunrisers Hyderabad': 'srh',
    'Rajasthan Royals': 'rr',
    'Gujarat Titans': 'gt',
    'Royal Challengers Bengaluru': 'rcb',
    'Royal Challengers Bangalore': 'rcb',
    'Delhi Capitals': 'dc',
    'Lucknow Super Giants': 'lsg',
    'Punjab Kings': 'pbks'
}

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[-\s]+', '-', text).strip('-')

print("Starting Master Player Database Ingestion Pipeline...")
