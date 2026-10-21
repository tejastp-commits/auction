-- IPL Auction Arena: Deterministic Master Seed Data (620+ Players)
-- Sourced directly from official BCCI IPL 2025 Auction List & Match Archives.

INSERT INTO franchises (id, slug, name, short_name, primary_color, secondary_color) VALUES
('csk', 'csk', 'Chennai Super Kings', 'CSK', '#FDB913', '#002B49'),
('mi', 'mi', 'Mumbai Indians', 'MI', '#004BA0', '#D1AB3E'),
('kkr', 'kkr', 'Kolkata Knight Riders', 'KKR', '#3A225D', '#D4AF37'),
('srh', 'srh', 'Sunrisers Hyderabad', 'SRH', '#F26522', '#000000'),
('rr', 'rr', 'Rajasthan Royals', 'RR', '#EA1A85', '#001D48'),
('gt', 'gt', 'Gujarat Titans', 'GT', '#1B2133', '#B08D57'),
('rcb', 'rcb', 'Royal Challengers Bengaluru', 'RCB', '#EC1C24', '#000000'),
('dc', 'dc', 'Delhi Capitals', 'DC', '#0078BC', '#EF1B23'),
('lsg', 'lsg', 'Lucknow Super Giants', 'LSG', '#A72056', '#003B73'),
('pbks', 'pbks', 'Punjab Kings', 'PBKS', '#DD1F2D', '#DCDDDF')
ON CONFLICT (id) DO NOTHING;

-- Data Sources Provenance Registration
INSERT INTO data_sources (id, source_url, source_title, publisher, publication_date, source_type, fields_supported) VALUES
('bcci-pdf-2025', 'https://documents.iplt20.com/bcci/documents/1731674068078_TATA%20IPL%202025-%20Auction%20List%20-15.11.24.pdf', 'TATA IPL 2025 Player Auction List', 'BCCI / Indian Premier League', '2024-11-15', 'Official Published PDF', ARRAY['name', 'dob', 'age', 'role', 'batting_hand', 'bowling_style', 'reserve_price', 'set_code']),
('iplt20-retentions-2025', 'https://www.iplt20.com/news/article/tata-ipl-2025-player-retentions-announced', 'TATA IPL 2025 Player Retentions Announced', 'Indian Premier League', '2024-10-31', 'Official Press Release', ARRAY['retained_players', 'franchises', 'salaries']),
('iplt20-historical-archives', 'https://www.iplt20.com/', 'Official TATA IPL Historical Match Archives', 'BCCI', '2024-06-01', 'Official Archives', ARRAY['stats', 'teams', 'awards'])
ON CONFLICT (id) DO NOTHING;

-- Players
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vkohli-18', 'Virat Kohli', '1988-11-05', 35, 'India', FALSE, 'BATTER', 'Top-order anchor & match-winner', 'Right-hand bat', 'Right-arm medium', 'PACE', 'All-time leading run-scorer in IPL history with an exceptional pedigree of anchoring innings and accelerating in the death overs.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rsharma-45', 'Rohit Sharma', '1987-04-30', 37, 'India', FALSE, 'BATTER', 'Aggressive opening batter & five-time title-winning captain', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Legendary opener known for sublime pull shots, powerplay dominance, and calm tactical leadership.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('syadav-63', 'Suryakumar Yadav', '1990-09-14', 33, 'India', FALSE, 'BATTER', '360-degree middle-overs dominator', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'The premier 360-degree T20 batter capable of manipulating any field setting with unmatched strike rotation and boundary percentage.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sgill-77', 'Shubman Gill', '1999-09-08', 24, 'India', FALSE, 'BATTER', 'Technically classical top-order run machine', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Orange Cap winner renowned for immaculate timing, high boundary percentage, and elite converting ability.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yjaiswal-19', 'Yashasvi Jaiswal', '2001-12-28', 22, 'India', FALSE, 'BATTER', 'Explosive left-handed powerplay destroyer', 'Left-hand bat', 'Right-arm legbreak', 'SPIN', 'Record-holder for the fastest half-century in IPL history (13 balls), providing explosive starts at the top of the order.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rgaikwad-31', 'Ruturaj Gaikwad', '1997-01-31', 27, 'India', FALSE, 'BATTER', 'Composed top-order anchor and captain', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Orange Cap winning top-order batter with sublime strokeplay against pace and spin alike.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('thead-62', 'Travis Head', '1993-12-29', 30, 'Australia', TRUE, 'BATTER', 'High-impact powerplay batter & part-time off-spinner', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'One of the most destructive modern white-ball openers with a lethal scoring rate inside the first six overs.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('fduplessis-13', 'Faf du Plessis', '1984-07-13', 40, 'South Africa', TRUE, 'BATTER', 'Veteran opening batter & experienced leader', 'Right-hand bat', 'Right-arm legbreak', 'SPIN', 'Consistent top-order run-getter known for exceptional fitness, athletic fielding, and leadership.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rsingh-35', 'Rinku Singh', '1997-10-12', 26, 'India', FALSE, 'BATTER', 'Elite lower-order death-overs finisher', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'Renowned for clutchness under extreme pressure, notably hitting five consecutive sixes in an iconic final-over chase.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dmiller-10', 'David Miller', '1989-06-10', 35, 'South Africa', TRUE, 'BATTER', 'Middle-order finisher & crisis manager', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', '"Killer Miller" has engineered some of the greatest run chases in tournament history with blistering finishing hitting.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('msdhoni-07', 'MS Dhoni', '1981-07-07', 43, 'India', FALSE, 'WICKETKEEPER', 'Master finisher & 5-time championship captain', 'Right-hand bat', 'Right-arm medium', 'PACE', 'The iconic "Thala", celebrated for legendary tactical acumen, lightning glovework, and ice-cold finishing prowess.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rpant-17', 'Rishabh Pant', '1997-10-04', 26, 'India', FALSE, 'WICKETKEEPER', 'Destructive middle-order match winner & captain', 'Left-hand bat', 'Right-arm medium', 'NONE', 'A rare game-changer capable of tearing apart bowling attacks with audacious ramp shots and tremendous power down the ground.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hklaasen-45', 'Heinrich Klaasen', '1991-07-30', 33, 'South Africa', TRUE, 'WICKETKEEPER', 'Premier spin basher and middle-overs titan', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Statistically the most feared batter against spin bowling in world cricket, delivering extreme boundary output in middle and death overs.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jbuttler-63', 'Jos Buttler', '1990-09-08', 33, 'England', TRUE, 'WICKETKEEPER', 'Dominant opening batter & century specialist', 'Right-hand bat', 'None', 'NONE', 'Orange Cap winner and one of the all-time greats in franchise cricket, holding the record for 7 IPL centuries.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('npooran-29', 'Nicholas Pooran', '1995-10-02', 28, 'West Indies', TRUE, 'WICKETKEEPER', 'Explosive left-handed middle-order monster', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'Devastating power-hitter capable of turning games with blistering scoring bursts in excess of a 160 strike rate.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ssamson-11', 'Sanju Samson', '1994-11-11', 29, 'India', FALSE, 'WICKETKEEPER', 'Top-order shotmaker & inspirational captain', 'Right-hand bat', 'Right-arm medium', 'NONE', 'Elegant stroke-maker with supreme boundary-hitting capability from ball one and extensive tournament experience.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('klrahul-01', 'KL Rahul', '1992-04-18', 32, 'India', FALSE, 'WICKETKEEPER', 'Prolific opening anchor & proven captain', 'Right-hand bat', 'Right-arm medium', 'NONE', 'One of the most consistent accumulator-openers in IPL history with a career batting average above 45.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hpandya-33', 'Hardik Pandya', '1993-10-11', 30, 'India', FALSE, 'ALL_ROUNDER', 'Premier fast-bowling all-rounder & title-winning captain', 'Right-hand bat', 'Right-arm fast-medium', 'PACE', 'India’s marquee seam-bowling all-rounder, offering power-hitting through the death and crucial overs in all match phases.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rjadeja-08', 'Ravindra Jadeja', '1988-12-06', 35, 'India', FALSE, 'ALL_ROUNDER', 'Elite left-arm spin, finishing bat, and world-class fielder', 'Left-hand bat', 'Slow left-arm orthodox', 'SPIN', 'Championship-winning stalwart known for suffocating economy in middle overs, clutch death hitting, and direct hits.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('arussell-12', 'Andre Russell', '1988-04-29', 36, 'West Indies', TRUE, 'ALL_ROUNDER', 'Tremendous power hitter & death-overs pace bowler', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Boasts the highest strike rate in IPL history among significant run scorers (174.93), paired with high-impact wicket-taking overs.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('snarine-74', 'Sunil Narine', '1988-05-26', 36, 'West Indies', TRUE, 'ALL_ROUNDER', 'Mystery spinner & devastating pinch-hitter', 'Left-hand bat', 'Right-arm offbreak mystery spin', 'SPIN', 'Multiple-time MVP winner who revolutionized T20 cricket with mystery variations and ruthless powerplay pinch-hitting.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gmaxwell-32', 'Glenn Maxwell', '1988-10-14', 35, 'Australia', TRUE, 'ALL_ROUNDER', 'High-octane spin smasher & handy off-spin bowler', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', '"The Big Show" provides unparalleled strike rate in middle overs with reverse-sweeps and switch hits, coupled with economical off-spin.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('apatel-20', 'Axar Patel', '1994-01-20', 30, 'India', FALSE, 'ALL_ROUNDER', 'Economical left-arm orthodox & reliable lower-order bat', 'Left-hand bat', 'Slow left-arm orthodox', 'SPIN', 'Highly disciplined all-rounder who cramps batters for room in the powerplay and middle overs while providing valuable lower-order runs.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mstoinis-17', 'Marcus Stoinis', '1989-08-16', 35, 'Australia', TRUE, 'ALL_ROUNDER', 'Powerhouse pace all-rounder & clutch run-chaser', 'Right-hand bat', 'Right-arm medium-fast', 'PACE', 'Heavy ball striker who famously blasted an unbeaten 124* to pull off one of the greatest run chases at Chepauk.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('scurran-58', 'Sam Curran', '1998-06-03', 26, 'England', TRUE, 'ALL_ROUNDER', 'Left-arm swing, death variations, and handy pinch-hitting', 'Left-hand bat', 'Left-arm medium-fast', 'PACE', 'T20 World Cup Player of the Tournament, commanding record auction sums for his dual utility in powerplay and death bowling.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jbumrah-93', 'Jasprit Bumrah', '1993-12-06', 30, 'India', FALSE, 'BOWLER', 'World’s premier pace bowler across all match phases', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Universally recognized as the pinnacle of modern T20 bowling with lethal yorkers, deceptive slower balls, and sub-7 career economy.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rkhan-19', 'Rashid Khan', '1998-09-20', 25, 'Afghanistan', TRUE, 'BOWLER', 'Master leg-break googly wizard & lower-order batter', 'Right-hand bat', 'Right-arm legbreak googly', 'SPIN', 'T20 spin phenomenon delivering rapid arm speed, unpickable googlies, and a strike rate of 200+ with the bat in the death.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mstarc-56', 'Mitchell Starc', '1990-01-30', 34, 'Australia', TRUE, 'BOWLER', 'Left-arm thunderbolt & championship final MVP', 'Left-hand bat', 'Left-arm fast', 'PACE', 'Highest-priced auction player in IPL history who delivered match-defining Player of the Match spells in both Qualifier 1 and the 2024 Final.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pcummins-30', 'Pat Cummins', '1993-05-08', 31, 'Australia', TRUE, 'BOWLER', 'World Cup winning captain, hard-length pace & lower-order hitter', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Elite fast bowler and charismatic leader who steered SRH to the 2024 final with astute bowling changes and high-speed aggression.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tboult-18', 'Trent Boult', '1989-07-22', 35, 'New Zealand', TRUE, 'BOWLER', 'Lethal left-arm swing in the opening over', 'Right-hand bat', 'Left-arm fast', 'PACE', 'The most prolific first-over wicket-taker in IPL history, consistently setting games up with deadly incoming shape.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ychahal-03', 'Yuzvendra Chahal', '1990-07-23', 34, 'India', FALSE, 'BOWLER', 'All-time leading wicket-taker in IPL history', 'Right-hand bat', 'Right-arm legbreak', 'SPIN', 'The only bowler in IPL history to surpass 200 wickets, using generous loop and clever wide lines to outfox attacking batters.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kyadav-23', 'Kuldeep Yadav', '1994-12-14', 29, 'India', FALSE, 'BOWLER', 'Left-arm wrist-spin magician', 'Left-hand bat', 'Left-arm wrist spin', 'SPIN', 'Attacking wrist-spinner who extracts sharp turn and bounce, consistently taking middle-overs wickets against all batting types.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('asingh-02', 'Arshdeep Singh', '1999-02-05', 25, 'India', FALSE, 'BOWLER', 'Left-arm death yorker specialist', 'Left-hand bat', 'Left-arm medium-fast', 'PACE', 'T20 World Cup champion pace bowler renowned for executing yorkers under intense death-overs pressure.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('krabada-25', 'Kagiso Rabada', '1995-05-25', 29, 'South Africa', TRUE, 'BOWLER', 'Express pace strike bowler & Purple Cap winner', 'Left-hand bat', 'Right-arm fast', 'PACE', 'Rapid South African strike bowler with one of the most prolific wicket-taking strike rates in IPL history.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('msiraj-73', 'Mohammed Siraj', '1994-03-13', 30, 'India', FALSE, 'BOWLER', 'Aggressive seam-and-swing strike bowler', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Fierce competitor who bowls with relentless energy, attacking stumps with sharp swing and seam movement.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mshami-11', 'Mohammed Shami', '1990-09-03', 34, 'India', FALSE, 'BOWLER', 'Upright seam presentation and powerplay strike master', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Purple Cap winner renowned for possessing the most perfect seam position in world cricket, terrorizing top-order batters.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vchakaravarthy-29', 'Varun Chakaravarthy', '1991-08-29', 33, 'India', FALSE, 'BOWLER', 'Mystery spinner with multiple variations', 'Right-hand bat', 'Right-arm legbreak & mystery variations', 'SPIN', 'Crucial component of championship-winning bowling attacks, boasting high strike rate and unreadable variations in the middle overs.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tilak-varma-01', 'Tilak Varma', '2002-11-08', 21, 'India', FALSE, 'BATTER', 'Official 2025 Retained Core for Mumbai Indians', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'Marquee franchise superstar retained by Mumbai Indians ahead of the TATA IPL 2025 Mega Auction for ₹8.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('matheesha-pathirana-01', 'Matheesha Pathirana', '2002-12-18', 21, 'Sri Lanka', TRUE, 'BOWLER', 'Official 2025 Retained Core for Chennai Super Kings', 'Right-hand bat', 'Right-arm fast sling', 'PACE', 'Marquee franchise superstar retained by Chennai Super Kings ahead of the TATA IPL 2025 Mega Auction for ₹13.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shivam-dube-01', 'Shivam Dube', '1993-06-26', 31, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Chennai Super Kings', 'Left-hand bat', 'Right-arm medium', 'PACE', 'Marquee franchise superstar retained by Chennai Super Kings ahead of the TATA IPL 2025 Mega Auction for ₹12.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhishek-sharma-01', 'Abhishek Sharma', '2000-09-04', 24, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Sunrisers Hyderabad', 'Left-hand bat', 'Slow left-arm orthodox', 'SPIN', 'Marquee franchise superstar retained by Sunrisers Hyderabad ahead of the TATA IPL 2025 Mega Auction for ₹14.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nitish-kumar-reddy-01', 'Nitish Kumar Reddy', '2003-05-26', 21, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Sunrisers Hyderabad', 'Right-hand bat', 'Right-arm medium-fast', 'PACE', 'Marquee franchise superstar retained by Sunrisers Hyderabad ahead of the TATA IPL 2025 Mega Auction for ₹6.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('riyan-parag-01', 'Riyan Parag', '2001-11-10', 22, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Rajasthan Royals', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Marquee franchise superstar retained by Rajasthan Royals ahead of the TATA IPL 2025 Mega Auction for ₹14.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dhruv-jurel-01', 'Dhruv Jurel', '2001-01-21', 23, 'India', FALSE, 'WICKETKEEPER', 'Official 2025 Retained Core for Rajasthan Royals', 'Right-hand bat', 'None', 'NONE', 'Marquee franchise superstar retained by Rajasthan Royals ahead of the TATA IPL 2025 Mega Auction for ₹14.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shimron-hetmyer-01', 'Shimron Hetmyer', '1996-12-26', 27, 'West Indies', TRUE, 'BATTER', 'Official 2025 Retained Core for Rajasthan Royals', 'Left-hand bat', 'Right-arm legbreak', 'SPIN', 'Marquee franchise superstar retained by Rajasthan Royals ahead of the TATA IPL 2025 Mega Auction for ₹11.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sandeep-sharma-01', 'Sandeep Sharma', '1993-05-18', 31, 'India', FALSE, 'BOWLER', 'Official 2025 Retained Core for Rajasthan Royals', 'Right-hand bat', 'Right-arm medium', 'PACE', 'Marquee franchise superstar retained by Rajasthan Royals ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harshit-rana-01', 'Harshit Rana', '2001-12-22', 22, 'India', FALSE, 'BOWLER', 'Official 2025 Retained Core for Kolkata Knight Riders', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Marquee franchise superstar retained by Kolkata Knight Riders ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ramandeep-singh-01', 'Ramandeep Singh', '1997-04-13', 27, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Kolkata Knight Riders', 'Right-hand bat', 'Right-arm medium', 'PACE', 'Marquee franchise superstar retained by Kolkata Knight Riders ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ravi-bishnoi-01', 'Ravi Bishnoi', '2000-09-05', 24, 'India', FALSE, 'BOWLER', 'Official 2025 Retained Core for Lucknow Super Giants', 'Right-hand bat', 'Right-arm legbreak googly', 'SPIN', 'Marquee franchise superstar retained by Lucknow Super Giants ahead of the TATA IPL 2025 Mega Auction for ₹11.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mayank-yadav-01', 'Mayank Yadav', '2002-06-17', 22, 'India', FALSE, 'BOWLER', 'Official 2025 Retained Core for Lucknow Super Giants', 'Right-hand bat', 'Right-arm express fast', 'PACE', 'Marquee franchise superstar retained by Lucknow Super Giants ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohsin-khan-01', 'Mohsin Khan', '1998-07-15', 26, 'India', FALSE, 'BOWLER', 'Official 2025 Retained Core for Lucknow Super Giants', 'Left-hand bat', 'Left-arm fast-medium', 'PACE', 'Marquee franchise superstar retained by Lucknow Super Giants ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ayush-badoni-01', 'Ayush Badoni', '1999-12-03', 24, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Lucknow Super Giants', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Marquee franchise superstar retained by Lucknow Super Giants ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sai-sudharsan-01', 'Sai Sudharsan', '2001-10-15', 23, 'India', FALSE, 'BATTER', 'Official 2025 Retained Core for Gujarat Titans', 'Left-hand bat', 'Right-arm legbreak', 'SPIN', 'Marquee franchise superstar retained by Gujarat Titans ahead of the TATA IPL 2025 Mega Auction for ₹8.50 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rahul-tewatia-01', 'Rahul Tewatia', '1993-05-20', 31, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Gujarat Titans', 'Left-hand bat', 'Right-arm legbreak', 'SPIN', 'Marquee franchise superstar retained by Gujarat Titans ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shahrukh-khan-01', 'Shahrukh Khan', '1995-05-27', 29, 'India', FALSE, 'ALL_ROUNDER', 'Official 2025 Retained Core for Gujarat Titans', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Marquee franchise superstar retained by Gujarat Titans ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tristan-stubbs-01', 'Tristan Stubbs', '2000-08-14', 24, 'South Africa', TRUE, 'WICKETKEEPER', 'Official 2025 Retained Core for Delhi Capitals', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Marquee franchise superstar retained by Delhi Capitals ahead of the TATA IPL 2025 Mega Auction for ₹10.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abishek-porel-01', 'Abishek Porel', '2002-10-17', 22, 'India', FALSE, 'WICKETKEEPER', 'Official 2025 Retained Core for Delhi Capitals', 'Left-hand bat', 'None', 'NONE', 'Marquee franchise superstar retained by Delhi Capitals ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rajat-patidar-01', 'Rajat Patidar', '1993-06-01', 31, 'India', FALSE, 'BATTER', 'Official 2025 Retained Core for Royal Challengers Bengaluru', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Marquee franchise superstar retained by Royal Challengers Bengaluru ahead of the TATA IPL 2025 Mega Auction for ₹11.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yash-dayal-01', 'Yash Dayal', '1997-12-13', 26, 'India', FALSE, 'BOWLER', 'Official 2025 Retained Core for Royal Challengers Bengaluru', 'Left-hand bat', 'Left-arm fast-medium', 'PACE', 'Marquee franchise superstar retained by Royal Challengers Bengaluru ahead of the TATA IPL 2025 Mega Auction for ₹5.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shashank-singh-01', 'Shashank Singh', '1991-11-21', 32, 'India', FALSE, 'BATTER', 'Official 2025 Retained Core for Punjab Kings', 'Right-hand bat', 'Right-arm medium', 'PACE', 'Marquee franchise superstar retained by Punjab Kings ahead of the TATA IPL 2025 Mega Auction for ₹5.50 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prabhsimran-singh-01', 'Prabhsimran Singh', '2000-08-10', 24, 'India', FALSE, 'WICKETKEEPER', 'Official 2025 Retained Core for Punjab Kings', 'Right-hand bat', 'None', 'NONE', 'Marquee franchise superstar retained by Punjab Kings ahead of the TATA IPL 2025 Mega Auction for ₹4.00 Cr.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('chris-morris-01', 'Chris Morris', '1987-04-30', 37, 'South Africa', TRUE, 'ALL_ROUNDER', 'All-Time Record IPL Auction Buy', 'Right-hand bat', 'Right-arm fast-medium', 'PACE', 'Proteas pace-bowling all-rounder who previously held the all-time IPL auction record at ₹16.25 Cr in 2021.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yuvraj-singh-01', 'Yuvraj Singh', '1981-12-12', 42, 'India', FALSE, 'ALL_ROUNDER', 'All-Time Record IPL Auction Buy', 'Left-hand bat', 'Slow left-arm orthodox', 'SPIN', 'Legendary Indian World Cup winner who set historic benchmark auction bids including ₹16.00 Cr in 2015.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('cameron-green-01', 'Cameron Green', '1999-06-03', 25, 'Australia', TRUE, 'ALL_ROUNDER', 'All-Time Record IPL Auction Buy', 'Right-hand bat', 'Right-arm fast-medium', 'PACE', 'High-impact Australian pace-bowling all-rounder bought for ₹17.50 Cr by MI in 2023.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ben-stokes-01', 'Ben Stokes', '1991-06-04', 33, 'England', TRUE, 'ALL_ROUNDER', 'All-Time Record IPL Auction Buy', 'Left-hand bat', 'Right-arm fast-medium', 'PACE', 'World-class match-winning all-rounder who fetched ₹16.25 Cr in the 2023 auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shreyas-iyer-02', 'Shreyas Iyer', '1994-12-06', 30, 'India', FALSE, 'BATTER', 'Set M1 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set M1, #2) from India representing MCA. Acquired by Punjab Kings for ₹26.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('liam-livingstone-08', 'Liam Livingstone', '1993-08-04', 31, 'England', TRUE, 'ALL_ROUNDER', 'Set M2 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set M2, #8) from England. Acquired by Royal Challengers Bengaluru for ₹8.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harry-brook-13', 'Harry Brook', '1999-02-22', 26, 'England', TRUE, 'BATTER', 'Set BA1 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set BA1, #13) from England. Acquired by Delhi Capitals for ₹6.25 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('devon-conway-14', 'Devon Conway', '1991-07-08', 33, 'New Zealand', TRUE, 'BATTER', 'Set BA1 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA1, #14) from New Zealand. Acquired by Chennai Super Kings for ₹6.25 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jake-fraser-mcgurk-15', 'Jake Fraser-Mcgurk', '2002-04-11', 22, 'Australia', TRUE, 'BATTER', 'Set BA1 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA1, #15) from Australia. Acquired by Delhi Capitals for ₹9.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aiden-markram-16', 'Aiden Markram', '1994-10-04', 30, 'South Africa', TRUE, 'BATTER', 'Set BA1 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA1, #16) from South Africa. Acquired by Lucknow Super Giants for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('devdutt-padikkal-17', 'Devdutt Padikkal', '2000-07-07', 24, 'India', FALSE, 'BATTER', 'Set BA1 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA1, #17) from India representing KSCA. Acquired by Royal Challengers Bengaluru for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rahul-tripathi-18', 'Rahul Tripathi', '1991-03-02', 34, 'India', FALSE, 'BATTER', 'Set BA1 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set BA1, #18) from India representing MACA. Acquired by Chennai Super Kings for ₹3.40 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('david-warner-19', 'David Warner', '1986-10-27', 38, 'Australia', TRUE, 'BATTER', 'Set BA1 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA1, #19) from Australia.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ravichandaran-ashwin-20', 'Ravichandaran Ashwin', '1986-09-17', 38, 'India', FALSE, 'ALL_ROUNDER', 'Set AL1 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL1, #20) from India representing TNCA. Acquired by Chennai Super Kings for ₹9.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('venkatesh-iyer-21', 'Venkatesh Iyer', '1994-12-25', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set AL1 (Capped)', 'Left-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL1, #21) from India representing MPCA. Acquired by Kolkata Knight Riders for ₹23.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mitchell-marsh-22', 'Mitchell Marsh', '1991-10-20', 33, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL1 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL1, #22) from Australia. Acquired by Lucknow Super Giants for ₹3.40 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harshal-patel-24', 'Harshal Patel', '1990-11-23', 34, 'India', FALSE, 'ALL_ROUNDER', 'Set AL1 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL1, #24) from India representing HCA. Acquired by Sunrisers Hyderabad for ₹8.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rachin-ravindra-25', 'Rachin Ravindra', '1999-11-18', 25, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL1 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL1, #25) from New Zealand. Acquired by Chennai Super Kings for ₹4.00 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jonny-bairstow-27', 'Jonny Bairstow', '1989-09-26', 35, 'England', TRUE, 'WICKETKEEPER', 'Set WK1 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set WK1, #27) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('quinton-de-kock-28', 'Quinton De Kock', '1992-12-17', 32, 'South Africa', TRUE, 'WICKETKEEPER', 'Set WK1 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK1, #28) from South Africa. Acquired by Kolkata Knight Riders for ₹3.60 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rahmanullah-gurbaz-29', 'Rahmanullah Gurbaz', '2001-11-28', 23, 'Afghanistan', TRUE, 'WICKETKEEPER', 'Set WK1 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK1, #29) from Afghanistan. Acquired by Kolkata Knight Riders for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ishan-kishan-30', 'Ishan Kishan', '1998-07-18', 26, 'India', FALSE, 'WICKETKEEPER', 'Set WK1 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK1, #30) from India representing JSCA. Acquired by Sunrisers Hyderabad for ₹11.25 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('phil-salt-31', 'Phil Salt', '1996-08-28', 28, 'England', TRUE, 'WICKETKEEPER', 'Set WK1 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK1, #31) from England. Acquired by Royal Challengers Bengaluru for ₹11.50 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jitesh-sharma-32', 'Jitesh Sharma', '1993-10-22', 31, 'India', FALSE, 'WICKETKEEPER', 'Set WK1 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK1, #32) from India representing VCA. Acquired by Royal Challengers Bengaluru for ₹11.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('syed-khaleel-ahmed-33', 'Syed Khaleel Ahmed', '1997-12-05', 27, 'India', FALSE, 'BOWLER', 'Set FA1 (Capped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA1, #33) from India representing RCA. Acquired by Chennai Super Kings for ₹4.80 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('josh-hazlewood-35', 'Josh Hazlewood', '1991-01-08', 34, 'Australia', TRUE, 'BOWLER', 'Set FA1 (Capped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA1, #35) from Australia. Acquired by Royal Challengers Bengaluru for ₹12.50 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('avesh-khan-36', 'Avesh Khan', '1996-12-13', 28, 'India', FALSE, 'BOWLER', 'Set FA1 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA1, #36) from India representing MPCA. Acquired by Lucknow Super Giants for ₹9.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prasidh-krishna-37', 'Prasidh Krishna', '1996-02-19', 29, 'India', FALSE, 'BOWLER', 'Set FA1 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA1, #37) from India representing KSCA. Acquired by Gujarat Titans for ₹9.50 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('t-natarajan-38', 'T. Natarajan', '1991-05-27', 33, 'India', FALSE, 'BOWLER', 'Set FA1 (Capped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA1, #38) from India representing TNCA. Acquired by Delhi Capitals for ₹10.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anrich-nortje-39', 'Anrich Nortje', '1993-11-16', 31, 'South Africa', TRUE, 'BOWLER', 'Set FA1 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA1, #39) from South Africa. Acquired by Kolkata Knight Riders for ₹6.50 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('noor-ahmad-40', 'Noor Ahmad', '2005-01-03', 20, 'Afghanistan', TRUE, 'BOWLER', 'Set SP1 (Capped)', 'Right-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted capped candidate (Set SP1, #40) from Afghanistan. Acquired by Chennai Super Kings for ₹10.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rahul-chahar-41', 'Rahul Chahar', '1999-08-04', 25, 'India', FALSE, 'BOWLER', 'Set SP1 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP1, #41) from India representing RCA. Acquired by Sunrisers Hyderabad for ₹3.20 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('wanindu-hasaranga-42', 'Wanindu Hasaranga', '1997-07-29', 27, 'Sri Lanka', TRUE, 'BOWLER', 'Set SP1 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP1, #42) from Sri Lanka. Acquired by Rajasthan Royals for ₹5.25 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('waqar-salamkheil-43', 'Waqar Salamkheil', '2001-10-02', 23, 'Afghanistan', TRUE, 'BOWLER', 'Set SP1 (Capped)', 'Right-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted capped candidate (Set SP1, #43) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('maheesh-theekshana-44', 'Maheesh Theekshana', '2000-08-01', 24, 'Sri Lanka', TRUE, 'BOWLER', 'Set SP1 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP1, #44) from Sri Lanka. Acquired by Rajasthan Royals for ₹4.40 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('adam-zampa-45', 'Adam Zampa', '1992-12-31', 32, 'Australia', TRUE, 'BOWLER', 'Set SP1 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP1, #45) from Australia. Acquired by Sunrisers Hyderabad for ₹2.40 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yash-dhull-46', 'Yash Dhull', '2002-11-11', 22, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA1, #46) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhinav-manohar-47', 'Abhinav Manohar', '1994-09-16', 30, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA1, #47) from India representing KSCA. Acquired by Sunrisers Hyderabad for ₹3.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('karun-nair-48', 'Karun Nair', '1991-12-06', 33, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA1, #48) from India representing VCA. Acquired by Delhi Capitals for ₹0.50 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('angkrish-raghuvanshi-49', 'Angkrish Raghuvanshi', '2004-06-05', 20, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA1, #49) from India representing MCA. Acquired by Kolkata Knight Riders for ₹3.00 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anmolpreet-singh-50', 'Anmolpreet Singh', '1998-03-28', 27, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA1, #50) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('atharva-taide-51', 'Atharva Taide', '2000-04-26', 24, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA1, #51) from India representing VCA. Acquired by Sunrisers Hyderabad for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nehal-wadhera-52', 'Nehal Wadhera', '2000-09-04', 24, 'India', FALSE, 'BATTER', 'Set UBA1 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA1, #52) from India representing PCA. Acquired by Punjab Kings for ₹4.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harpreet-brar-53', 'Harpreet Brar', '1995-09-16', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #53) from India representing PCA. Acquired by Punjab Kings for ₹1.50 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('naman-dhir-54', 'Naman Dhir', '1999-12-31', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #54) from India representing PCA. Acquired by Mumbai Indians for ₹5.25 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mahipal-lomror-55', 'Mahipal Lomror', '1999-11-16', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #55) from India representing RCA. Acquired by Gujarat Titans for ₹1.70 Cr at the Jeddah Mega Auction.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sameer-rizvi-56', 'Sameer Rizvi', '2003-12-06', 21, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #56) from India representing UPCA. Acquired by Delhi Capitals for ₹0.95 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abdul-samad-57', 'Abdul Samad', '2001-10-28', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #57) from India representing JKCA. Acquired by Lucknow Super Giants for ₹4.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vijay-shankar-58', 'Vijay Shankar', '1991-01-26', 34, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL1, #58) from India representing TNCA. Acquired by Chennai Super Kings for ₹1.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashutosh-sharma-59', 'Ashutosh Sharma', '1998-09-15', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL1, #59) from India representing RSPB. Acquired by Delhi Capitals for ₹3.80 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nishant-sindhu-60', 'Nishant Sindhu', '2004-04-09', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #60) from India representing HCA. Acquired by Gujarat Titans for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('utkarsh-singh-61', 'Utkarsh Singh', '1998-05-07', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL1 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL1, #61) from India representing JSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aryan-juyal-62', 'Aryan Juyal', '2001-11-11', 23, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK1, #62) from India representing UPCA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kumar-kushagra-63', 'Kumar Kushagra', '2004-10-23', 20, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK1, #63) from India representing JSCA. Acquired by Gujarat Titans for ₹0.65 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('robin-minz-64', 'Robin Minz', '2002-09-13', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK1, #64) from India representing JSCA. Acquired by Mumbai Indians for ₹0.65 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anuj-rawat-65', 'Anuj Rawat', '1999-10-17', 25, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK1, #65) from India representing DDCA. Acquired by Gujarat Titans for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('luvnith-sisodia-66', 'Luvnith Sisodia', '2000-01-15', 25, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK1, #66) from India representing KSCA. Acquired by Kolkata Knight Riders for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vishnu-vinod-67', 'Vishnu Vinod', '1993-12-02', 31, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK1, #67) from India representing KCA. Acquired by Punjab Kings for ₹0.95 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('upendra-singh-yadav-68', 'Upendra Singh Yadav', '1996-10-08', 28, 'India', FALSE, 'WICKETKEEPER', 'Set UWK1 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK1, #68) from India representing RSPB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vaibhav-arora-69', 'Vaibhav Arora', '1997-12-14', 27, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #69) from India representing HPCA. Acquired by Kolkata Knight Riders for ₹1.80 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rasikh-dar-70', 'Rasikh Dar', '2000-04-05', 25, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #70) from India representing JKCA. Acquired by Royal Challengers Bengaluru for ₹6.00 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akash-madhwal-71', 'Akash Madhwal', '1993-11-25', 31, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #71) from India representing CAU. Acquired by Rajasthan Royals for ₹1.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohit-sharma-72', 'Mohit Sharma', '1988-09-18', 36, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #72) from India representing HCA. Acquired by Delhi Capitals for ₹2.20 Cr at the Jeddah Mega Auction.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('simarjeet-singh-73', 'Simarjeet Singh', '1998-01-17', 27, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #73) from India representing DDCA. Acquired by Sunrisers Hyderabad for ₹1.50 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yash-thakur-74', 'Yash Thakur', '1998-12-28', 26, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #74) from India representing VCA. Acquired by Punjab Kings for ₹1.60 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kartik-tyagi-75', 'Kartik Tyagi', '2000-11-08', 24, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #75) from India representing UPCA.', 4000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vyshak-vijaykumar-76', 'Vyshak Vijaykumar', '1997-01-31', 28, 'India', FALSE, 'BOWLER', 'Set UFA1 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA1, #76) from India representing KSCA. Acquired by Punjab Kings for ₹1.80 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('piyush-chawla-77', 'Piyush Chawla', '1988-12-24', 36, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #77) from India representing UPCA.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shreyas-gopal-78', 'Shreyas Gopal', '1993-09-04', 31, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #78) from India representing KSCA. Acquired by Chennai Super Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mayank-markande-79', 'Mayank Markande', '1997-11-11', 27, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #79) from India representing PCA. Acquired by Kolkata Knight Riders for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('suyash-sharma-80', 'Suyash Sharma', '2003-05-15', 21, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #80) from India representing DDCA. Acquired by Royal Challengers Bengaluru for ₹2.60 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('karn-sharma-81', 'Karn Sharma', '1987-10-23', 37, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #81) from India representing RSPB. Acquired by Mumbai Indians for ₹0.50 Cr at the Jeddah Mega Auction.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kumar-kartikeya-singh-82', 'Kumar Kartikeya Singh', '1997-12-26', 27, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #82) from India representing MPCA. Acquired by Rajasthan Royals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('manav-suthar-83', 'Manav Suthar', '2002-08-03', 22, 'India', FALSE, 'BOWLER', 'Set USP1 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP1, #83) from India representing RCA. Acquired by Gujarat Titans for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mayank-agarawal-84', 'Mayank Agarawal', '1991-02-16', 34, 'India', FALSE, 'BATTER', 'Set BA2 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA2, #84) from India representing KSCA. Acquired by Kolkata Knight Riders for ₹2.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('glenn-phillips-86', 'Glenn Phillips', '1996-12-06', 28, 'New Zealand', TRUE, 'BATTER', 'Set BA2 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA2, #86) from New Zealand. Acquired by Gujarat Titans for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rovman-powell-87', 'Rovman Powell', '1993-07-23', 31, 'West Indies', TRUE, 'BATTER', 'Set BA2 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set BA2, #87) from West Indies. Acquired by Kolkata Knight Riders for ₹1.50 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ajinkya-rahane-88', 'Ajinkya Rahane', '1988-06-06', 36, 'India', FALSE, 'BATTER', 'Set BA2 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA2, #88) from India representing MCA. Acquired by Kolkata Knight Riders for ₹1.50 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prithvi-shaw-89', 'Prithvi Shaw', '1999-11-09', 25, 'India', FALSE, 'BATTER', 'Set BA2 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA2, #89) from India representing MCA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kane-williamson-90', 'Kane Williamson', '1990-08-08', 34, 'New Zealand', TRUE, 'BATTER', 'Set BA2 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA2, #90) from New Zealand.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('marco-jansen-92', 'Marco Jansen', '2000-05-01', 24, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set AL2 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL2, #92) from South Africa. Acquired by Punjab Kings for ₹7.00 Cr at the Jeddah Mega Auction.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('daryl-mitchell-93', 'Daryl Mitchell', '1991-05-20', 33, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL2 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL2, #93) from New Zealand.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('krunal-pandya-94', 'Krunal Pandya', '1991-03-24', 34, 'India', FALSE, 'ALL_ROUNDER', 'Set AL2 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL2, #94) from India representing BCA. Acquired by Royal Challengers Bengaluru for ₹5.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nitish-rana-95', 'Nitish Rana', '1993-12-27', 31, 'India', FALSE, 'ALL_ROUNDER', 'Set AL2 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL2, #95) from India representing UPCA. Acquired by Rajasthan Royals for ₹4.20 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('washington-sundar-96', 'Washington Sundar', '1999-10-05', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set AL2 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL2, #96) from India representing TNCA. Acquired by Gujarat Titans for ₹3.20 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shardul-thakur-97', 'Shardul Thakur', '1991-10-16', 33, 'India', FALSE, 'ALL_ROUNDER', 'Set AL2 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL2, #97) from India representing MCA.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('k-s-bharat-98', 'K.S Bharat', '1993-10-03', 31, 'India', FALSE, 'WICKETKEEPER', 'Set WK2 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK2, #98) from India representing ACA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('alex-carey-99', 'Alex Carey', '1991-08-27', 33, 'Australia', TRUE, 'WICKETKEEPER', 'Set WK2 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK2, #99) from Australia.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('donovan-ferreira-100', 'Donovan Ferreira', '1998-07-21', 26, 'South Africa', TRUE, 'WICKETKEEPER', 'Set WK2 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK2, #100) from South Africa. Acquired by Delhi Capitals for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shai-hope-101', 'Shai Hope', '1993-11-10', 31, 'West Indies', TRUE, 'WICKETKEEPER', 'Set WK2 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK2, #101) from West Indies.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('josh-inglis-102', 'Josh Inglis', '1995-03-04', 30, 'Australia', TRUE, 'WICKETKEEPER', 'Set WK2 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK2, #102) from Australia. Acquired by Punjab Kings for ₹2.60 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ryan-rickelton-103', 'Ryan Rickelton', '1996-07-11', 28, 'South Africa', TRUE, 'WICKETKEEPER', 'Set WK2 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK2, #103) from South Africa. Acquired by Mumbai Indians for ₹1.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('deepak-chahar-104', 'Deepak Chahar', '1992-08-07', 32, 'India', FALSE, 'BOWLER', 'Set FA2 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA2, #104) from India representing RCA. Acquired by Mumbai Indians for ₹9.25 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gerald-coetzee-105', 'Gerald Coetzee', '2000-10-02', 24, 'South Africa', TRUE, 'BOWLER', 'Set FA2 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA2, #105) from South Africa. Acquired by Gujarat Titans for ₹2.40 Cr at the Jeddah Mega Auction.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akash-deep-106', 'Akash Deep', '1996-12-15', 28, 'India', FALSE, 'BOWLER', 'Set FA2 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA2, #106) from India representing CAB. Acquired by Lucknow Super Giants for ₹8.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tushar-deshpande-107', 'Tushar Deshpande', '1995-05-15', 29, 'India', FALSE, 'BOWLER', 'Set FA2 (Capped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA2, #107) from India representing MCA. Acquired by Rajasthan Royals for ₹6.50 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lockie-ferguson-108', 'Lockie Ferguson', '1991-06-13', 33, 'New Zealand', TRUE, 'BOWLER', 'Set FA2 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA2, #108) from New Zealand. Acquired by Punjab Kings for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bhuvneshwar-kumar-109', 'Bhuvneshwar Kumar', '1990-02-05', 35, 'India', FALSE, 'BOWLER', 'Set FA2 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA2, #109) from India representing UPCA. Acquired by Royal Challengers Bengaluru for ₹10.75 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mukesh-kumar-110', 'Mukesh Kumar', '1993-10-12', 31, 'India', FALSE, 'BOWLER', 'Set FA2 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA2, #110) from India representing CAB. Acquired by Delhi Capitals for ₹8.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('allah-ghazanfar-111', 'Allah Ghazanfar', '2006-03-20', 19, 'Afghanistan', TRUE, 'BOWLER', 'Set SP2 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP2, #111) from Afghanistan. Acquired by Mumbai Indians for ₹4.80 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akeal-hosein-112', 'Akeal Hosein', '1993-04-25', 31, 'West Indies', TRUE, 'BOWLER', 'Set SP2 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set SP2, #112) from West Indies.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('keshav-maharaj-113', 'Keshav Maharaj', '1990-02-07', 35, 'South Africa', TRUE, 'BOWLER', 'Set SP2 (Capped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set SP2, #113) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mujeeb-ur-rahman-114', 'Mujeeb Ur Rahman', '2001-03-28', 24, 'Afghanistan', TRUE, 'BOWLER', 'Set SP2 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP2, #114) from Afghanistan.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('adil-rashid-115', 'Adil Rashid', '1988-02-17', 37, 'England', TRUE, 'BOWLER', 'Set SP2 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP2, #115) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vijayakanth-viyaskanth-116', 'Vijayakanth Viyaskanth', '2001-12-05', 23, 'Sri Lanka', TRUE, 'BOWLER', 'Set SP2 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP2, #116) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ricky-bhui-117', 'Ricky Bhui', '1996-09-29', 28, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA2, #117) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('swastik-chhikara-118', 'Swastik Chhikara', '2005-04-03', 20, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #118) from India representing UPCA. Acquired by Royal Challengers Bengaluru for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aarya-desai-119', 'Aarya Desai', '2003-04-03', 22, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #119) from India representing GUCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shubham-dubey-120', 'Shubham Dubey', '1994-08-27', 30, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #120) from India representing VCA. Acquired by Rajasthan Royals for ₹0.80 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('madhav-kaushik-121', 'Madhav Kaushik', '1998-01-03', 27, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #121) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pukhraj-mann-122', 'Pukhraj Mann', '2001-06-07', 23, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #122) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shaik-rasheed-123', 'Shaik Rasheed', '2004-09-24', 20, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #123) from India representing ACA. Acquired by Chennai Super Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('himmat-singh-124', 'Himmat Singh', '1996-11-08', 28, 'India', FALSE, 'BATTER', 'Set UBA2 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA2, #124) from India representing DDCA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mayank-dagar-125', 'Mayank Dagar', '1996-11-11', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL2, #125) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anshul-kamboj-126', 'Anshul Kamboj', '2000-12-06', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL2, #126) from India representing HCA. Acquired by Chennai Super Kings for ₹3.40 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohd-arshad-khan-127', 'Mohd. Arshad Khan', '1997-12-20', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL2, #127) from India representing MPCA. Acquired by Gujarat Titans for ₹1.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('darshan-nalkande-128', 'Darshan Nalkande', '1998-10-04', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL2, #128) from India representing VCA. Acquired by Delhi Capitals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('suyash-prabhudessai-129', 'Suyash Prabhudessai', '1997-12-06', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL2, #129) from India representing GCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anukul-roy-130', 'Anukul Roy', '1998-11-30', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL2, #130) from India representing JSCA. Acquired by Kolkata Knight Riders for ₹0.40 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('swapnil-singh-131', 'Swapnil Singh', '1991-01-22', 34, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL2, #131) from India representing CAU. Acquired by Royal Challengers Bengaluru for ₹0.50 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sanvir-singh-132', 'Sanvir Singh', '1996-10-12', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL2 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL2, #132) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('avanish-aravelly-133', 'Avanish Aravelly', '2005-06-02', 19, 'India', FALSE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK2, #133) from India representing HYCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vansh-bedi-134', 'Vansh Bedi', '2002-12-23', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK2, #134) from India representing DDCA. Acquired by Chennai Super Kings for ₹0.55 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('saurav-chauhan-135', 'Saurav Chauhan', '2000-05-27', 24, 'India', FALSE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK2, #135) from India representing GUCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harvik-desai-136', 'Harvik Desai', '1999-10-04', 25, 'India', FALSE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK2, #136) from India representing SCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tom-kohler-cadmore-137', 'Tom Kohler-Cadmore', '1994-08-19', 30, 'England', TRUE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK2, #137) from England.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kunal-rathore-138', 'Kunal Rathore', '2002-10-09', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK2, #138) from India representing RCA. Acquired by Rajasthan Royals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('b-r-sharath-139', 'B.R Sharath', '1996-09-28', 28, 'India', FALSE, 'WICKETKEEPER', 'Set UWK2 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK2, #139) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gurnoor-singh-brar-140', 'Gurnoor Singh Brar', '2000-05-25', 24, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #140) from India representing PCA. Acquired by Gujarat Titans for ₹1.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mukesh-choudhary-141', 'Mukesh Choudhary', '1996-07-06', 28, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #141) from India representing MACA. Acquired by Chennai Super Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sakib-hussain-142', 'Sakib Hussain', '2004-12-14', 20, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #142) from India representing BICA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vidwath-kaverappa-143', 'Vidwath Kaverappa', '1999-02-25', 26, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #143) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rajan-kumar-144', 'Rajan Kumar', '1996-07-08', 28, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #144) from India representing CAU.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sushant-mishra-145', 'Sushant Mishra', '2000-12-23', 24, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #145) from India representing JSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('arjun-tendulkar-146', 'Arjun Tendulkar', '1999-09-24', 25, 'India', FALSE, 'BOWLER', 'Set UFA2 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA2, #146) from India representing GCA. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('zeeshan-ansari-147', 'Zeeshan Ansari', '1999-12-16', 25, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #147) from India representing UPCA. Acquired by Sunrisers Hyderabad for ₹0.40 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prince-choudhary-148', 'Prince Choudhary', '1999-09-29', 25, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #148) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('himanshu-sharma-149', 'Himanshu Sharma', '1998-06-06', 26, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #149) from India representing RCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('m-siddharth-150', 'M. Siddharth', '1998-07-03', 26, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #150) from India representing TNCA. Acquired by Lucknow Super Giants for ₹0.75 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('digvesh-singh-151', 'Digvesh Singh', '1999-12-15', 25, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #151) from India representing DDCA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prashant-solanki-152', 'Prashant Solanki', '2000-02-22', 25, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #152) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jhathavedh-subramanyan-153', 'Jhathavedh Subramanyan', '1999-09-16', 25, 'India', FALSE, 'BOWLER', 'Set USP2 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP2, #153) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('finn-allen-154', 'Finn Allen', '1999-04-22', 25, 'New Zealand', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA3, #154) from New Zealand.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dewald-brevis-155', 'Dewald Brevis', '2003-04-29', 21, 'South Africa', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA3, #155) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ben-duckett-156', 'Ben Duckett', '1994-10-17', 30, 'England', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA3, #156) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('manish-pandey-157', 'Manish Pandey', '1989-09-10', 35, 'India', FALSE, 'BATTER', 'Set BA3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA3, #157) from India representing KSCA. Acquired by Kolkata Knight Riders for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rilee-rossouw-158', 'Rilee Rossouw', '1989-10-09', 35, 'South Africa', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA3, #158) from South Africa.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sherfane-rutherford-159', 'Sherfane Rutherford', '1998-08-15', 26, 'West Indies', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set BA3, #159) from West Indies. Acquired by Gujarat Titans for ₹2.60 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashton-turner-160', 'Ashton Turner', '1993-01-25', 32, 'Australia', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA3, #160) from Australia.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('james-vince-161', 'James Vince', '1991-03-14', 34, 'England', TRUE, 'BATTER', 'Set BA3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA3, #161) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shahbaz-ahamad-162', 'Shahbaz Ahamad', '1994-12-11', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL3, #162) from India representing CAB. Acquired by Lucknow Super Giants for ₹2.40 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('moeen-ali-163', 'Moeen Ali', '1987-06-18', 37, 'England', TRUE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL3, #163) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tim-david-164', 'Tim David', '1996-03-16', 29, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL3, #164) from Australia. Acquired by Royal Challengers Bengaluru for ₹3.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('deepak-hooda-165', 'Deepak Hooda', '1995-04-19', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL3, #165) from India representing RCA. Acquired by Chennai Super Kings for ₹1.70 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('will-jacks-166', 'Will Jacks', '1998-11-21', 26, 'England', TRUE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL3, #166) from England. Acquired by Mumbai Indians for ₹5.25 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('azmatullah-omarzai-167', 'Azmatullah Omarzai', '2000-03-24', 25, 'Afghanistan', TRUE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL3, #167) from Afghanistan. Acquired by Punjab Kings for ₹2.40 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('r-sai-kishore-168', 'R. Sai Kishore', '1996-11-06', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Left-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL3, #168) from India representing TNCA. Acquired by Gujarat Titans for ₹2.00 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('romario-shepherd-169', 'Romario Shepherd', '1994-11-26', 30, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL3 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL3, #169) from West Indies. Acquired by Royal Challengers Bengaluru for ₹1.50 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tom-banton-170', 'Tom Banton', '1998-11-11', 26, 'England', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK3, #170) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sam-billings-171', 'Sam Billings', '1991-06-15', 33, 'England', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK3, #171) from England.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jordan-cox-172', 'Jordan Cox', '2000-10-21', 24, 'England', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK3, #172) from England.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ben-mcdermott-173', 'Ben McDermott', '1994-12-12', 30, 'Australia', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK3, #173) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kusal-mendis-174', 'Kusal Mendis', '1995-02-02', 30, 'Sri Lanka', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK3, #174) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kusal-perera-175', 'Kusal Perera', '1990-08-17', 34, 'Sri Lanka', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK3, #175) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('josh-philippe-176', 'Josh Philippe', '1997-06-01', 27, 'Australia', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK3, #176) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tim-seifert-177', 'Tim Seifert', '1994-12-14', 30, 'New Zealand', TRUE, 'WICKETKEEPER', 'Set WK3 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK3, #177) from New Zealand.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nandre-burger-178', 'Nandre Burger', '1995-08-11', 29, 'South Africa', TRUE, 'BOWLER', 'Set FA3 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA3, #178) from South Africa.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('spencer-johnson-179', 'Spencer Johnson', '1995-12-16', 29, 'Australia', TRUE, 'BOWLER', 'Set FA3 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA3, #179) from Australia. Acquired by Kolkata Knight Riders for ₹2.80 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('umran-malik-180', 'Umran Malik', '1999-11-22', 25, 'India', FALSE, 'BOWLER', 'Set FA3 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA3, #180) from India representing JKCA. Acquired by Kolkata Knight Riders for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mustafizur-rahman-181', 'Mustafizur Rahman', '1995-09-06', 29, 'Bangladesh', TRUE, 'BOWLER', 'Set FA3 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA3, #181) from Bangladesh.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ishant-sharma-182', 'Ishant Sharma', '1988-09-02', 36, 'India', FALSE, 'BOWLER', 'Set FA3 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA3, #182) from India representing DDCA. Acquired by Gujarat Titans for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nuwan-thushara-183', 'Nuwan Thushara', '1994-08-06', 30, 'Sri Lanka', TRUE, 'BOWLER', 'Set FA3 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA3, #183) from Sri Lanka. Acquired by Royal Challengers Bengaluru for ₹1.60 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('naveen-ul-haq-184', 'Naveen Ul Haq', '1999-09-23', 25, 'Afghanistan', TRUE, 'BOWLER', 'Set FA3 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set FA3, #184) from Afghanistan.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jaydev-unadkat-185', 'Jaydev Unadkat', '1991-10-18', 33, 'India', FALSE, 'BOWLER', 'Set FA3 (Capped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA3, #185) from India representing SCA. Acquired by Sunrisers Hyderabad for ₹1.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('umesh-yadav-186', 'Umesh Yadav', '1987-10-25', 37, 'India', FALSE, 'BOWLER', 'Set FA3 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA3, #186) from India representing VCA.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rishad-hossain-187', 'Rishad Hossain', '2002-07-15', 22, 'Bangladesh', TRUE, 'BOWLER', 'Set SP3 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP3, #187) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('zahir-khan-pakten-188', 'Zahir Khan Pakten', '1998-12-20', 26, 'Afghanistan', TRUE, 'BOWLER', 'Set SP3 (Capped)', 'Left-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted capped candidate (Set SP3, #188) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nqabayomzi-peter-189', 'Nqabayomzi Peter', '2001-12-09', 23, 'South Africa', TRUE, 'BOWLER', 'Set SP3 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP3, #189) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tanveer-sangha-190', 'Tanveer Sangha', '2001-11-26', 23, 'Australia', TRUE, 'BOWLER', 'Set SP3 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP3, #190) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tabraiz-shamsi-191', 'Tabraiz Shamsi', '1990-02-18', 35, 'South Africa', TRUE, 'BOWLER', 'Set SP3 (Capped)', 'Right-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted capped candidate (Set SP3, #191) from South Africa.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jeffery-vandersay-192', 'Jeffery Vandersay', '1990-02-05', 35, 'Sri Lanka', TRUE, 'BOWLER', 'Set SP3 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set SP3, #192) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sachin-baby-193', 'Sachin Baby', '1988-12-18', 36, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA3, #193) from India representing KCA. Acquired by Sunrisers Hyderabad for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('priyam-garg-194', 'Priyam Garg', '2000-11-30', 24, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA3, #194) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harnoor-pannu-195', 'Harnoor Pannu', '2003-01-30', 22, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA3, #195) from India representing PCA. Acquired by Punjab Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('smaran-ravichandran-196', 'Smaran Ravichandran', '2003-05-05', 21, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA3, #196) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shashwat-rawat-197', 'Shashwat Rawat', '2001-04-06', 24, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UBA3, #197) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('andre-siddarth-198', 'Andre Siddarth', '2006-08-28', 18, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA3, #198) from India representing TNCA. Acquired by Chennai Super Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('avneesh-sudha-199', 'Avneesh Sudha', '2001-11-20', 23, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA3, #199) from India representing CAU.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('apoorv-wankhade-200', 'Apoorv Wankhade', '1992-03-14', 33, 'India', FALSE, 'BATTER', 'Set UBA3 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA3, #200) from India representing VCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yudhvir-charak-201', 'Yudhvir Charak', '1997-09-13', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL3, #201) from India representing JKCA. Acquired by Rajasthan Royals for ₹0.35 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rishi-dhawan-202', 'Rishi Dhawan', '1990-02-19', 35, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL3, #202) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rajvardhan-hangargekar-203', 'Rajvardhan Hangargekar', '2002-11-10', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL3, #203) from India representing MACA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tanush-kotian-204', 'Tanush Kotian', '1998-10-16', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL3, #204) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('arshin-kulkarni-205', 'Arshin Kulkarni', '2005-02-15', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL3, #205) from India representing MACA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shams-mulani-206', 'Shams Mulani', '1997-03-13', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL3, #206) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shivam-singh-207', 'Shivam Singh', '1995-11-25', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL3, #207) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lalit-yadav-208', 'Lalit Yadav', '1997-01-03', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL3 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL3, #208) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohammed-azharuddeen-209', 'Mohammed Azharuddeen', '1994-03-22', 31, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK3, #209) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('l-r-chethan-210', 'L.R Chethan', '2000-05-25', 24, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK3, #210) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aryaman-singh-dhaliwal-211', 'Aryaman Singh Dhaliwal', '2002-04-30', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK3, #211) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('urvil-patel-212', 'Urvil Patel', '1998-10-17', 26, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK3, #212) from India representing GUCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sanskar-rawat-213', 'Sanskar Rawat', '2005-06-14', 19, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK3, #213) from India representing CAU.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bipin-saurabh-214', 'Bipin Saurabh', '1999-11-20', 25, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK3, #214) from India representing BICA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tanay-thyagarajann-215', 'Tanay Thyagarajann', '1995-11-15', 29, 'India', FALSE, 'WICKETKEEPER', 'Set UWK3 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK3, #215) from India representing HYCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('money-grewal-216', 'Money Grewal', '2000-10-04', 24, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #216) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashwani-kumar-217', 'Ashwani Kumar', '2001-08-29', 23, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #217) from India representing PCA. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ishan-porel-218', 'Ishan Porel', '1998-09-05', 26, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #218) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhilash-shetty-219', 'Abhilash Shetty', '1998-06-06', 26, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #219) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akash-singh-220', 'Akash Singh', '2002-04-26', 22, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #220) from India representing BCA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gurjapneet-singh-221', 'Gurjapneet Singh', '1998-11-08', 26, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #221) from India representing TNCA. Acquired by Chennai Super Kings for ₹2.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('basil-thampi-222', 'Basil Thampi', '1993-09-11', 31, 'India', FALSE, 'BOWLER', 'Set UFA3 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA3, #222) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('murugan-ashwin-223', 'Murugan Ashwin', '1990-09-08', 34, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #223) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shreyas-chavan-224', 'Shreyas Chavan', '2003-09-01', 21, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #224) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('chintal-gandhi-225', 'Chintal Gandhi', '1994-08-25', 30, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #225) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('raghav-goyal-226', 'Raghav Goyal', '2001-06-20', 23, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #226) from India representing HCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jagadeesha-suchith-227', 'Jagadeesha Suchith', '1994-01-16', 31, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #227) from India representing NCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('roshan-waghsare-228', 'Roshan Waghsare', '2003-09-07', 21, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #228) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bailapudi-yeswanth-229', 'Bailapudi Yeswanth', '2005-03-19', 20, 'India', FALSE, 'BOWLER', 'Set USP3 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP3, #229) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sediqullah-atal-230', 'Sediqullah Atal', '2001-08-12', 23, 'Afghanistan', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA4, #230) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('matthew-breetzke-231', 'Matthew Breetzke', '1998-11-03', 26, 'South Africa', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA4, #231) from South Africa. Acquired by Lucknow Super Giants for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mark-chapman-232', 'Mark Chapman', '1994-06-27', 30, 'New Zealand', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set BA4, #232) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('brandon-king-233', 'Brandon King', '1994-12-16', 30, 'West Indies', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA4, #233) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('evin-lewis-234', 'Evin Lewis', '1991-12-27', 33, 'West Indies', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA4, #234) from West Indies.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pathum-nissanka-235', 'Pathum Nissanka', '1998-05-18', 26, 'Sri Lanka', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA4, #235) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bhanuka-rajapaksa-236', 'Bhanuka Rajapaksa', '1991-10-24', 33, 'Sri Lanka', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA4, #236) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('steve-smith-237', 'Steve Smith', '1989-06-02', 35, 'Australia', TRUE, 'BATTER', 'Set BA4 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA4, #237) from Australia.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gus-atkinson-238', 'Gus Atkinson', '1998-01-19', 27, 'England', TRUE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL4, #238) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tom-curran-239', 'Tom Curran', '1995-03-12', 30, 'England', TRUE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL4, #239) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('krishnappa-gowtham-240', 'Krishnappa Gowtham', '1988-10-20', 36, 'India', FALSE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL4, #240) from India representing KSCA.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohammad-nabi-241', 'Mohammad Nabi', '1985-01-01', 40, 'Afghanistan', TRUE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL4, #241) from Afghanistan.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gulbadin-naib-242', 'Gulbadin Naib', '1991-06-04', 33, 'Afghanistan', TRUE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL4, #242) from Afghanistan.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sikandar-raza-243', 'Sikandar Raza', '1986-04-24', 38, 'Zimbabwe', TRUE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL4, #243) from Zimbabwe.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mitchell-santner-244', 'Mitchell Santner', '1992-02-05', 33, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL4, #244) from New Zealand. Acquired by Mumbai Indians for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jayant-yadav-245', 'Jayant Yadav', '1990-01-22', 35, 'India', FALSE, 'ALL_ROUNDER', 'Set AL4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL4, #245) from India representing HCA. Acquired by Gujarat Titans for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('johnson-charles-246', 'Johnson Charles', '1989-01-14', 36, 'West Indies', TRUE, 'WICKETKEEPER', 'Set WK4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK4, #246) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('litton-das-247', 'Litton Das', '1994-10-13', 30, 'Bangladesh', TRUE, 'WICKETKEEPER', 'Set WK4 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK4, #247) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('andre-fletcher-248', 'Andre Fletcher', '1987-11-28', 37, 'West Indies', TRUE, 'WICKETKEEPER', 'Set WK4 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set WK4, #248) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tom-latham-249', 'Tom Latham', '1992-04-02', 33, 'New Zealand', TRUE, 'WICKETKEEPER', 'Set WK4 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK4, #249) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ollie-pope-250', 'Ollie Pope', '1998-01-02', 27, 'England', TRUE, 'WICKETKEEPER', 'Set WK4 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK4, #250) from England.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kyle-verreynne-251', 'Kyle Verreynne', '1997-05-12', 27, 'South Africa', TRUE, 'WICKETKEEPER', 'Set WK4 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set WK4, #251) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('fazalhaq-farooqi-252', 'Fazalhaq Farooqi', '2000-09-22', 24, 'Afghanistan', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA4, #252) from Afghanistan. Acquired by Rajasthan Royals for ₹2.00 Cr at the Jeddah Mega Auction.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('richard-gleeson-253', 'Richard Gleeson', '1987-12-02', 37, 'England', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #253) from England.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('matt-henry-254', 'Matt Henry', '1991-12-14', 33, 'New Zealand', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA4, #254) from New Zealand.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('alzarri-joseph-255', 'Alzarri Joseph', '1996-11-20', 28, 'West Indies', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #255) from West Indies.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kwena-maphaka-256', 'Kwena Maphaka', '2006-04-08', 18, 'South Africa', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #256) from South Africa. Acquired by Rajasthan Royals for ₹1.50 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kuldeep-sen-257', 'Kuldeep Sen', '1996-10-22', 28, 'India', FALSE, 'BOWLER', 'Set FA4 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #257) from India representing MPCA. Acquired by Punjab Kings for ₹0.80 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('reece-topley-258', 'Reece Topley', '1994-02-21', 31, 'England', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #258) from England. Acquired by Mumbai Indians for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lizaad-williams-259', 'Lizaad Williams', '1993-10-01', 31, 'South Africa', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #259) from South Africa. Acquired by Mumbai Indians for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('luke-wood-260', 'Luke Wood', '1995-08-02', 29, 'England', TRUE, 'BOWLER', 'Set FA4 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA4, #260) from England.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sachin-dhas-261', 'Sachin Dhas', '2005-02-03', 20, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA4, #261) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('leus-du-plooy-262', 'Leus Du Plooy', '1995-01-12', 30, 'England', TRUE, 'BATTER', 'Set UBA4 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA4, #262) from England.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashwin-hebbar-263', 'Ashwin Hebbar', '1995-11-15', 29, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UBA4, #263) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rohan-kunnummal-264', 'Rohan Kunnummal', '1998-05-10', 26, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA4, #264) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ayush-pandey-265', 'Ayush Pandey', '2003-09-19', 21, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA4, #265) from India representing CSCSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akshat-raghuwanshi-266', 'Akshat Raghuwanshi', '2003-09-15', 21, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA4, #266) from India representing MPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shoun-roger-267', 'Shoun Roger', '2002-10-16', 22, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA4, #267) from India representing KCA.', 4000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('virat-singh-268', 'Virat Singh', '1997-12-08', 27, 'India', FALSE, 'BATTER', 'Set UBA4 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA4, #268) from India representing JSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('priyansh-arya-269', 'Priyansh Arya', '2001-09-18', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL4, #269) from India representing DDCA. Acquired by Punjab Kings for ₹3.80 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('manoj-bhandage-270', 'Manoj Bhandage', '1998-10-05', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL4, #270) from India representing KSCA. Acquired by Royal Challengers Bengaluru for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pravin-dubey-271', 'Pravin Dubey', '1993-07-01', 31, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL4, #271) from India representing KSCA. Acquired by Punjab Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ajay-mandal-272', 'Ajay Mandal', '1996-02-25', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL4, #272) from India representing CSCSCA. Acquired by Delhi Capitals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prerak-mankad-273', 'Prerak Mankad', '1994-04-23', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL4, #273) from India representing SCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vipraj-nigam-274', 'Vipraj Nigam', '2004-07-28', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL4, #274) from India representing UPCA. Acquired by Delhi Capitals for ₹0.50 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vicky-ostwal-275', 'Vicky Ostwal', '2002-09-01', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL4, #275) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shivalik-sharma-276', 'Shivalik Sharma', '1998-11-28', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL4 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL4, #276) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('salil-arora-277', 'Salil Arora', '2002-11-07', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #277) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dinesh-bana-278', 'Dinesh Bana', '2004-09-15', 20, 'India', FALSE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #278) from India representing HCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ajitesh-guruswamy-279', 'Ajitesh Guruswamy', '2002-09-26', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #279) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('narayan-jagadeesan-280', 'Narayan Jagadeesan', '1995-12-24', 29, 'India', FALSE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #280) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shrijith-krishnan-281', 'Shrijith Krishnan', '1996-08-12', 28, 'India', FALSE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #281) from India representing KSCA. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('michael-pepper-282', 'Michael Pepper', '1998-06-25', 26, 'England', TRUE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #282) from England.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vishnu-solanki-283', 'Vishnu Solanki', '1992-10-15', 32, 'India', FALSE, 'WICKETKEEPER', 'Set UWK4 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK4, #283) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('k-m-asif-284', 'K.M Asif', '1993-07-24', 31, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #284) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akhil-chaudhary-285', 'Akhil Chaudhary', '2002-07-15', 22, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #285) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('himanshu-chauhan-286', 'Himanshu Chauhan', '2003-01-18', 22, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #286) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('arpit-guleria-287', 'Arpit Guleria', '1997-04-26', 27, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #287) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nishanth-saranu-288', 'Nishanth Saranu', '2005-03-03', 20, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #288) from India representing HYCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kuldip-yadav-289', 'Kuldip Yadav', '1996-10-15', 28, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #289) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prithviraj-yarra-290', 'Prithviraj Yarra', '1998-02-20', 27, 'India', FALSE, 'BOWLER', 'Set UFA4 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA4, #290) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shubham-agrawal-291', 'Shubham Agrawal', '1993-11-21', 31, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #291) from India representing CSCSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jass-inder-baidwan-292', 'Jass Inder Baidwan', '1996-12-14', 28, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #292) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jasmer-dhankhar-293', 'Jasmer Dhankhar', '1998-10-16', 26, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #293) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pulkit-narang-294', 'Pulkit Narang', '1994-06-18', 30, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #294) from India representing SSCB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('saumy-pandey-295', 'Saumy Pandey', '2004-11-04', 20, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #295) from India representing MPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohit-rathee-296', 'Mohit Rathee', '1999-01-13', 26, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #296) from India representing SSCB. Acquired by Royal Challengers Bengaluru for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('himanshu-singh-297', 'Himanshu Singh', '2003-07-24', 21, 'India', FALSE, 'BOWLER', 'Set USP4 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP4, #297) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('towhid-hridoy-298', 'Towhid Hridoy', '2000-12-04', 24, 'Bangladesh', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA5, #298) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mikyle-louis-299', 'Mikyle Louis', '2000-08-19', 24, 'West Indies', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA5, #299) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harry-tector-300', 'Harry Tector', '1999-12-06', 25, 'Ireland', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA5, #300) from Ireland.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rassie-van-der-dussen-301', 'Rassie Van Der Dussen', '1989-02-07', 36, 'South Africa', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set BA5, #301) from South Africa.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('will-young-302', 'Will Young', '1992-11-22', 32, 'New Zealand', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA5, #302) from New Zealand.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('najibullah-zadran-303', 'Najibullah Zadran', '1993-02-28', 32, 'Afghanistan', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted capped candidate (Set BA5, #303) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ibrahim-zadran-304', 'Ibrahim Zadran', '2001-01-12', 24, 'Afghanistan', TRUE, 'BATTER', 'Set BA5 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set BA5, #304) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sean-abbott-305', 'Sean Abbott', '1992-02-29', 33, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL5, #305) from Australia.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jacob-bethell-306', 'Jacob Bethell', '2003-10-23', 21, 'England', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL5, #306) from England. Acquired by Royal Challengers Bengaluru for ₹2.60 Cr at the Jeddah Mega Auction.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('brydon-carse-307', 'Brydon Carse', '1995-07-31', 29, 'England', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL5, #307) from England. Acquired by Sunrisers Hyderabad for ₹1.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aaron-hardie-308', 'Aaron Hardie', '1999-01-07', 26, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL5, #308) from Australia. Acquired by Punjab Kings for ₹1.25 Cr at the Jeddah Mega Auction.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sarfaraz-khan-309', 'Sarfaraz Khan', '1997-10-22', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL5, #309) from India representing MCA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kyle-mayers-310', 'Kyle Mayers', '1992-09-08', 32, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL5, #310) from West Indies.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kamindu-mendis-311', 'Kamindu Mendis', '1998-09-30', 26, 'Sri Lanka', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL5, #311) from Sri Lanka. Acquired by Sunrisers Hyderabad for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('matthew-short-312', 'Matthew Short', '1995-11-08', 29, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL5 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL5, #312) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jason-behrendorff-313', 'Jason Behrendorff', '1990-04-20', 34, 'Australia', TRUE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA5, #313) from Australia.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dushmantha-chameera-314', 'Dushmantha Chameera', '1992-01-11', 33, 'Sri Lanka', TRUE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA5, #314) from Sri Lanka. Acquired by Delhi Capitals for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nathan-ellis-315', 'Nathan Ellis', '1994-09-22', 30, 'Australia', TRUE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA5, #315) from Australia. Acquired by Chennai Super Kings for ₹2.00 Cr at the Jeddah Mega Auction.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shamar-joseph-316', 'Shamar Joseph', '1999-08-31', 25, 'West Indies', TRUE, 'BOWLER', 'Set FA5 (Capped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA5, #316) from West Indies. Acquired by Lucknow Super Giants for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('josh-little-317', 'Josh Little', '1999-11-01', 25, 'Ireland', TRUE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA5, #317) from Ireland.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shivam-mavi-318', 'Shivam Mavi', '1998-11-26', 26, 'India', FALSE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA5, #318) from India representing UPCA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jhye-richardson-319', 'Jhye Richardson', '1996-09-20', 28, 'Australia', TRUE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA5, #319) from Australia.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('navdeep-saini-320', 'Navdeep Saini', '1992-11-23', 32, 'India', FALSE, 'BOWLER', 'Set FA5 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA5, #320) from India representing DDCA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tanmay-agarwal-321', 'Tanmay Agarwal', '1995-05-03', 29, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA5, #321) from India representing HYCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('amandeep-khare-322', 'Amandeep Khare', '1997-08-05', 27, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA5, #322) from India representing CSCSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ayush-mhatre-323', 'Ayush Mhatre', '2007-07-16', 17, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA5, #323) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('salman-nizar-324', 'Salman Nizar', '1997-06-30', 27, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA5, #324) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aniket-verma-325', 'Aniket Verma', '2002-02-05', 23, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA5, #325) from India representing MPCA. Acquired by Sunrisers Hyderabad for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sumeet-verma-326', 'Sumeet Verma', '1990-11-18', 34, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA5, #326) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('manan-vohra-327', 'Manan Vohra', '1993-07-18', 31, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA5, #327) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('samarth-vyas-328', 'Samarth Vyas', '1995-11-28', 29, 'India', FALSE, 'BATTER', 'Set UBA5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA5, #328) from India representing SCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('raj-angad-bawa-329', 'Raj Angad Bawa', '2002-11-12', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL5, #329) from India representing UTCA. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('emanjot-chahal-330', 'Emanjot Chahal', '2004-08-17', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL5, #330) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('musheer-khan-331', 'Musheer Khan', '2005-02-27', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL5, #331) from India representing MCA. Acquired by Punjab Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('manvanth-kumar-l-332', 'Manvanth Kumar L', '2004-01-11', 21, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL5, #332) from India representing KSCA. Acquired by Delhi Capitals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mayank-rawat-333', 'Mayank Rawat', '1999-12-04', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL5, #333) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('suryansh-shedge-334', 'Suryansh Shedge', '2003-01-29', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL5, #334) from India representing MCA. Acquired by Punjab Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hritik-shokeen-335', 'Hritik Shokeen', '2000-08-14', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL5, #335) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sonu-yadav-336', 'Sonu Yadav', '1999-11-11', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL5 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL5, #336) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('s-rithik-easwaran-337', 'S. Rithik Easwaran', '2002-02-15', 23, 'India', FALSE, 'WICKETKEEPER', 'Set UWK5 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK5, #337) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anmol-malhotra-338', 'Anmol Malhotra', '1995-11-29', 29, 'India', FALSE, 'WICKETKEEPER', 'Set UWK5 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK5, #338) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pradosh-paul-339', 'Pradosh Paul', '2000-12-21', 24, 'India', FALSE, 'WICKETKEEPER', 'Set UWK5 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK5, #339) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('karteek-sharma-340', 'Karteek Sharma', '2001-10-25', 23, 'India', FALSE, 'WICKETKEEPER', 'Set UWK5 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK5, #340) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tejasvi-singh-342', 'Tejasvi Singh', '2002-04-18', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK5 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK5, #342) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('siddharth-yadav-343', 'Siddharth Yadav', '2003-08-13', 21, 'India', FALSE, 'WICKETKEEPER', 'Set UWK5 (Uncapped)', 'Left-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UWK5, #343) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('saurabh-dubey-344', 'Saurabh Dubey', '1998-01-23', 27, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #344) from India representing VCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aaqib-khan-345', 'Aaqib Khan', '2003-12-25', 21, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #345) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kulwant-khejroliya-346', 'Kulwant Khejroliya', '1992-03-13', 33, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #346) from India representing MPCA. Acquired by Gujarat Titans for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ankit-singh-rajpoot-347', 'Ankit Singh Rajpoot', '1993-12-04', 31, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #347) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('divesh-sharma-348', 'Divesh Sharma', '2001-04-20', 23, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #348) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('naman-tiwari-349', 'Naman Tiwari', '2005-11-08', 19, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #349) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prince-yadav-350', 'Prince Yadav', '2001-12-12', 23, 'India', FALSE, 'BOWLER', 'Set UFA5 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA5, #350) from India representing DDCA. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kunal-singh-chibb-351', 'Kunal Singh Chibb', '1997-03-31', 28, 'India', FALSE, 'BOWLER', 'Set USP5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP5, #351) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yuvraj-chudasama-352', 'Yuvraj Chudasama', '1995-11-23', 29, 'India', FALSE, 'BOWLER', 'Set USP5 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP5, #352) from India representing SCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('deepak-devadiga-353', 'Deepak Devadiga', '1999-04-14', 25, 'India', FALSE, 'BOWLER', 'Set USP5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP5, #353) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ramesh-prasad-354', 'Ramesh Prasad', '1994-01-30', 31, 'India', FALSE, 'BOWLER', 'Set USP5 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set USP5, #354) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shivam-shukla-355', 'Shivam Shukla', '1995-12-11', 29, 'India', FALSE, 'BOWLER', 'Set USP5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP5, #355) from India representing MPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tejpreet-singh-357', 'Tejpreet Singh', '2000-08-11', 24, 'India', FALSE, 'BOWLER', 'Set USP5 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set USP5, #357) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('qais-ahmad-358', 'Qais Ahmad', '2000-08-15', 24, 'Afghanistan', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL6, #358) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('charith-asalanka-359', 'Charith Asalanka', '1997-06-29', 27, 'Sri Lanka', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL6, #359) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('michael-bracewell-360', 'Michael Bracewell', '1991-02-14', 34, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL6, #360) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gudakesh-motie-361', 'Gudakesh Motie', '1995-03-29', 30, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL6, #361) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('daniel-mousley-362', 'Daniel Mousley', '2001-07-08', 23, 'England', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL6, #362) from England.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jamie-overton-363', 'Jamie Overton', '1984-04-10', 41, 'England', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL6, #363) from England. Acquired by Chennai Super Kings for ₹1.50 Cr at the Jeddah Mega Auction.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dunith-wellalage-364', 'Dunith Wellalage', '2003-01-09', 22, 'Sri Lanka', TRUE, 'ALL_ROUNDER', 'Set AL6 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL6, #364) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ottneil-baartman-365', 'Ottneil Baartman', '1993-03-18', 32, 'South Africa', TRUE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA6, #365) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('xavier-bartlett-366', 'Xavier Bartlett', '1998-12-17', 26, 'Australia', TRUE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA6, #366) from Australia. Acquired by Punjab Kings for ₹0.80 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dilshan-madushanka-367', 'Dilshan Madushanka', '2000-09-18', 24, 'Sri Lanka', TRUE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA6, #367) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('adam-milne-368', 'Adam Milne', '1992-04-13', 32, 'New Zealand', TRUE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA6, #368) from New Zealand.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lungisani-ngidi-369', 'Lungisani Ngidi', '1996-03-29', 29, 'South Africa', TRUE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA6, #369) from South Africa. Acquired by Royal Challengers Bengaluru for ₹1.00 Cr at the Jeddah Mega Auction.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('william-o-rourke-370', 'William O''Rourke', '2001-08-06', 23, 'New Zealand', TRUE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA6, #370) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('chetan-sakariya-371', 'Chetan Sakariya', '1998-02-28', 27, 'India', FALSE, 'BOWLER', 'Set FA6 (Capped)', 'Left-hand bat', 'Left Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set FA6, #371) from India representing SCA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sandeep-warrier-372', 'Sandeep Warrier', '1991-04-04', 34, 'India', FALSE, 'BOWLER', 'Set FA6 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA6, #372) from India representing TNCA.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('musaif-ajaz-373', 'Musaif Ajaz', '2002-08-03', 22, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA6, #373) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('agni-chopra-374', 'Agni Chopra', '1998-11-04', 26, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA6, #374) from India representing CAM.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhimanyu-easwaran-375', 'Abhimanyu Easwaran', '1995-09-06', 29, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA6, #375) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sudip-gharami-376', 'Sudip Gharami', '1999-03-21', 26, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA6, #376) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shubham-khajuria-377', 'Shubham Khajuria', '1995-09-13', 29, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA6, #377) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akhil-rawat-378', 'Akhil Rawat', '2000-11-04', 24, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA6, #378) from India representing CAU.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prateek-yadav-379', 'Prateek Yadav', '1999-02-16', 26, 'India', FALSE, 'BATTER', 'Set UBA6 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA6, #379) from India representing CSCSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abdul-bazith-380', 'Abdul Bazith', '1998-10-09', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL6, #380) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('k-c-cariappa-381', 'K.C Cariappa', '1994-04-13', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL6, #381) from India representing CAM.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yuvraj-chaudhary-382', 'Yuvraj Chaudhary', '2001-10-06', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL6, #382) from India representing CAU. Acquired by Lucknow Super Giants for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aman-khan-383', 'Aman Khan', '1996-11-23', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL6, #383) from India representing CAP.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sumit-kumar-384', 'Sumit Kumar', '1995-12-12', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL6, #384) from India representing HCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kamlesh-nagarkoti-385', 'Kamlesh Nagarkoti', '1999-12-28', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL6, #385) from India representing RCA. Acquired by Chennai Super Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hardik-raj-386', 'Hardik Raj', '2006-03-10', 19, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL6, #386) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harsh-tyagi-387', 'Harsh Tyagi', '1999-12-23', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL6 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL6, #387) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('m-ajnas-388', 'M. Ajnas', '1997-05-08', 27, 'India', FALSE, 'WICKETKEEPER', 'Set UWK6 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK6, #388) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('unmukt-chand-389', 'Unmukt Chand', '1993-03-26', 32, 'USA', TRUE, 'WICKETKEEPER', 'Set UWK6 (Associate)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted associate candidate (Set UWK6, #389) from USA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tejasvi-dahiya-390', 'Tejasvi Dahiya', '2002-04-18', 22, 'India', FALSE, 'WICKETKEEPER', 'Set UWK6 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK6, #390) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sumit-ghadigaonkar-391', 'Sumit Ghadigaonkar', '1992-04-11', 32, 'India', FALSE, 'WICKETKEEPER', 'Set UWK6 (Uncapped)', 'Right-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UWK6, #391) from India representing ASCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('baba-indrajith-392', 'Baba Indrajith', '1994-07-08', 30, 'India', FALSE, 'WICKETKEEPER', 'Set UWK6 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK6, #392) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('muhammed-khan-393', 'Muhammed Khan', '2000-12-30', 24, 'India', FALSE, 'WICKETKEEPER', 'Set UWK6 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK6, #393) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bhagmender-lather-394', 'Bhagmender Lather', '1997-06-18', 27, 'India', FALSE, 'WICKETKEEPER', 'Set UWK6 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UWK6, #394) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('baltej-dhanda-395', 'Baltej Dhanda', '1990-11-04', 34, 'India', FALSE, 'BOWLER', 'Set UFA6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA6, #395) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ali-khan-396', 'Ali Khan', '1990-12-13', 34, 'USA', TRUE, 'BOWLER', 'Set UFA6 (Associate)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted associate candidate (Set UFA6, #396) from USA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ravi-kumar-397', 'Ravi Kumar', '2003-10-29', 21, 'India', FALSE, 'BOWLER', 'Set UFA6 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA6, #397) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vineet-panwar-398', 'Vineet Panwar', '1998-06-28', 26, 'India', FALSE, 'BOWLER', 'Set UFA6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA6, #398) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vidyadhar-patil-399', 'Vidyadhar Patil', '2000-09-05', 24, 'India', FALSE, 'BOWLER', 'Set UFA6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA6, #399) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('aradhya-shukla-400', 'Aradhya Shukla', '2004-12-06', 20, 'India', FALSE, 'BOWLER', 'Set UFA6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA6, #400) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhinandan-singh-401', 'Abhinandan Singh', '1997-03-30', 28, 'India', FALSE, 'BOWLER', 'Set UFA6 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA6, #401) from India representing UPCA. Acquired by Royal Challengers Bengaluru for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('cooper-connolly-402', 'Cooper Connolly', '2003-08-22', 21, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL7, #402) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dushan-hemantha-403', 'Dushan Hemantha', '1994-05-24', 30, 'Sri Lanka', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL7, #403) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jason-holder-404', 'Jason Holder', '1991-11-05', 33, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL7, #404) from West Indies.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('karim-janat-405', 'Karim Janat', '1998-08-11', 26, 'Afghanistan', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL7, #405) from Afghanistan. Acquired by Gujarat Titans for ₹0.75 Cr at the Jeddah Mega Auction.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jimmy-neesham-406', 'Jimmy Neesham', '1990-09-17', 34, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL7, #406) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('daniel-sams-407', 'Daniel Sams', '1992-10-27', 32, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL7, #407) from Australia.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('william-sutherland-408', 'William Sutherland', '1999-10-27', 25, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL7 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL7, #408) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('taskin-ahmed-409', 'Taskin Ahmed', '1995-04-03', 30, 'Bangladesh', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA7, #409) from Bangladesh.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ben-dwarshuis-410', 'Ben Dwarshuis', '1994-06-23', 30, 'Australia', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA7, #410) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('obed-mccoy-411', 'Obed McCoy', '1997-01-04', 28, 'West Indies', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA7, #411) from West Indies.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('riley-meredith-412', 'Riley Meredith', '1996-06-21', 28, 'Australia', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA7, #412) from Australia.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lance-morris-413', 'Lance Morris', '1998-03-28', 27, 'Australia', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA7, #413) from Australia.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('olly-stone-414', 'Olly Stone', '1993-10-09', 31, 'England', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA7, #414) from England.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('daniel-worrall-415', 'Daniel Worrall', '1991-07-10', 33, 'England', TRUE, 'BOWLER', 'Set FA7 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA7, #415) from England.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pyla-avinash-416', 'Pyla Avinash', '2000-07-07', 24, 'India', FALSE, 'BATTER', 'Set UBA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UBA7, #416) from India representing ACA. Acquired by Punjab Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kiran-chormale-417', 'Kiran Chormale', '2005-10-11', 19, 'India', FALSE, 'BATTER', 'Set UBA7 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA7, #417) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashish-dahariya-418', 'Ashish Dahariya', '2004-10-17', 20, 'India', FALSE, 'BATTER', 'Set UBA7 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA7, #418) from India representing CSCSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tushar-raheja-419', 'Tushar Raheja', '2001-02-07', 24, 'India', FALSE, 'BATTER', 'Set UBA7 (Uncapped)', 'Left-hand bat', 'None', 'NONE', 'Official shortlisted uncapped candidate (Set UBA7, #419) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sarthak-ranjan-420', 'Sarthak Ranjan', '1996-09-25', 28, 'India', FALSE, 'BATTER', 'Set UBA7 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA7, #420) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhijeet-tomar-421', 'Abhijeet Tomar', '1995-03-14', 30, 'India', FALSE, 'BATTER', 'Set UBA7 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA7, #421) from India representing RCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('krish-bhagat-422', 'Krish Bhagat', '2004-11-06', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL7, #422) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sohraab-dhaliwal-423', 'Sohraab Dhaliwal', '1991-11-18', 33, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL7, #423) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('harsh-dubey-424', 'Harsh Dubey', '2002-07-23', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL7, #424) from India representing VCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ramakrishna-ghosh-425', 'Ramakrishna Ghosh', '1997-08-28', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL7, #425) from India representing MACA. Acquired by Chennai Super Kings for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('raj-limbani-426', 'Raj Limbani', '2005-02-02', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL7, #426) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ninad-rathva-427', 'Ninad Rathva', '1999-03-10', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL7, #427) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vivrant-sharma-428', 'Vivrant Sharma', '1999-10-30', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL7, #428) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shiva-singh-429', 'Shiva Singh', '1999-10-16', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL7 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL7, #429) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sayed-irfan-aftab-430', 'Sayed Irfan Aftab', '2003-11-20', 21, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #430) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anirudh-chowdhary-431', 'Anirudh Chowdhary', '1999-11-08', 25, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Left-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #431) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anshuman-hooda-432', 'Anshuman Hooda', '2001-01-04', 24, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #432) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('siddharth-kaul-433', 'Siddharth Kaul', '1990-05-19', 34, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #433) from India representing PCA.', 4000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prashant-sai-painkra-434', 'Prashant Sai Painkra', '2002-09-08', 22, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #434) from India representing CSCSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('venkata-satyanarayana-penmetsa-435', 'Venkata Satyanarayana Penmetsa', '1999-07-10', 25, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #435) from India representing ACA. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yeddala-reddy-436', 'Yeddala Reddy', '1999-12-13', 25, 'India', FALSE, 'BOWLER', 'Set UFA7 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA7, #436) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('zak-foulkes-437', 'Zak Foulkes', '2002-06-05', 22, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL8, #437) from New Zealand.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('chris-green-438', 'Chris Green', '1993-10-01', 31, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL8, #438) from Australia.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shakib-al-hasan-439', 'Shakib Al Hasan', '1987-03-24', 38, 'Bangladesh', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL8, #439) from Bangladesh.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mehidy-hasan-miraz-440', 'Mehidy Hasan Miraz', '1997-10-25', 27, 'Bangladesh', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL8, #440) from Bangladesh.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('wiaan-mulder-441', 'Wiaan Mulder', '1998-02-19', 27, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL8, #441) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dwaine-pretorius-442', 'Dwaine Pretorius', '1989-03-29', 36, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL8, #442) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dasun-shanaka-443', 'Dasun Shanaka', '1991-09-09', 33, 'Sri Lanka', TRUE, 'ALL_ROUNDER', 'Set AL8 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL8, #443) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shoriful-islam-444', 'Shoriful Islam', '2001-06-03', 23, 'Bangladesh', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA8, #444) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('blessing-muzarabani-445', 'Blessing Muzarabani', '1996-10-02', 28, 'Zimbabwe', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA8, #445) from Zimbabwe.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('matthew-potts-446', 'Matthew Potts', '1998-10-29', 26, 'England', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA8, #446) from England.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tanzim-hasan-sakib-447', 'Tanzim Hasan Sakib', '2002-10-20', 22, 'Bangladesh', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA8, #447) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('benjamin-sears-448', 'Benjamin Sears', '1998-02-11', 27, 'New Zealand', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA8, #448) from New Zealand.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tim-southee-449', 'Tim Southee', '1988-12-11', 36, 'New Zealand', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA8, #449) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('john-turner-450', 'John Turner', '2001-04-10', 23, 'England', TRUE, 'BOWLER', 'Set FA8 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA8, #450) from England.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('joshua-brown-451', 'Joshua Brown', '1993-12-26', 31, 'Australia', TRUE, 'BATTER', 'Set UBA8 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA8, #451) from Australia.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('oliver-davies-452', 'Oliver Davies', '2000-10-14', 24, 'Australia', TRUE, 'BATTER', 'Set UBA8 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA8, #452) from Australia.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bevan-john-jacobs-453', 'Bevan John Jacobs', '2002-05-06', 22, 'New Zealand', TRUE, 'BATTER', 'Set UBA8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UBA8, #453) from New Zealand. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('atharva-kale-454', 'Atharva Kale', '1999-09-21', 25, 'India', FALSE, 'BATTER', 'Set UBA8 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA8, #454) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhishek-nair-455', 'Abhishek Nair', '2004-06-06', 20, 'India', FALSE, 'BATTER', 'Set UBA8 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA8, #455) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vishwanath-pratap-singh-456', 'Vishwanath Pratap Singh', '1998-06-18', 26, 'India', FALSE, 'BATTER', 'Set UBA8 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA8, #456) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nasir-lone-457', 'Nasir Lone', '1997-09-05', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL8, #457) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('brandon-mcmullen-458', 'Brandon McMullen', '1999-10-18', 25, 'Scotland', TRUE, 'ALL_ROUNDER', 'Set UAL8 (Associate)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted associate candidate (Set UAL8, #458) from Scotland.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('s-midhun-459', 'S. Midhun', '1994-10-07', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL8, #459) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abid-mushtaq-460', 'Abid Mushtaq', '1997-01-17', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL8, #460) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mahesh-pithiya-461', 'Mahesh Pithiya', '2001-12-24', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL8, #461) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('maramreddy-reddy-462', 'Maramreddy Reddy', '2002-10-28', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL8, #462) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('atit-sheth-463', 'Atit Sheth', '1996-02-03', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL8, #463) from India representing BCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jonty-sidhu-464', 'Jonty Sidhu', '1997-12-09', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL8 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL8, #464) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohit-avasthi-465', 'Mohit Avasthi', '1992-11-18', 32, 'India', FALSE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #465) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('faridoon-dawoodzai-466', 'Faridoon Dawoodzai', '2005-11-26', 19, 'Afghanistan', TRUE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #466) from Afghanistan.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('praful-hinge-467', 'Praful Hinge', '2002-01-18', 23, 'India', FALSE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #467) from India representing VCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pankaj-jaswal-468', 'Pankaj Jaswal', '1995-09-20', 29, 'India', FALSE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #468) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vijay-kumar-469', 'Vijay Kumar', '2005-12-24', 19, 'India', FALSE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #469) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashok-sharma-470', 'Ashok Sharma', '2002-06-17', 22, 'India', FALSE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #470) from India representing RCA. Acquired by Rajasthan Royals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mujtaba-yousuf-471', 'Mujtaba Yousuf', '2002-06-07', 22, 'India', FALSE, 'BOWLER', 'Set UFA8 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA8, #471) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ashton-agar-472', 'Ashton Agar', '1993-10-14', 31, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL9, #472) from Australia.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('roston-chase-473', 'Roston Chase', '1992-03-22', 33, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL9, #473) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('junior-dala-474', 'Junior Dala', '1989-12-29', 35, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL9, #474) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mahedi-hasan-475', 'Mahedi Hasan', '1994-12-12', 30, 'Bangladesh', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL9, #475) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nangeyalia-kharote-476', 'Nangeyalia Kharote', '2004-04-25', 20, 'Afghanistan', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted capped candidate (Set AL9, #476) from Afghanistan.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dan-lawrence-477', 'Dan Lawrence', '1997-07-12', 27, 'England', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL9, #477) from England.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nathan-smith-478', 'Nathan Smith', '1998-07-15', 26, 'New Zealand', TRUE, 'ALL_ROUNDER', 'Set AL9 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL9, #478) from New Zealand.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('james-anderson-479', 'James Anderson', '1982-07-30', 42, 'England', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA9, #479) from England.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kyle-jamieson-480', 'Kyle Jamieson', '1994-12-30', 30, 'New Zealand', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA9, #480) from New Zealand.', 15000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('chris-jordan-481', 'Chris Jordan', '1988-10-04', 36, 'England', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA9, #481) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hasan-mahmud-482', 'Hasan Mahmud', '1997-02-12', 28, 'Bangladesh', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA9, #482) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tymal-mills-483', 'Tymal Mills', '1992-08-12', 32, 'England', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA9, #483) from England.', 20000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('david-payne-484', 'David Payne', '1991-02-15', 34, 'England', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Right-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA9, #484) from England.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nahid-rana-485', 'Nahid Rana', '2002-10-25', 22, 'Bangladesh', TRUE, 'BOWLER', 'Set FA9 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA9, #485) from Bangladesh.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prayas-ray-barman-486', 'Prayas Ray Barman', '2002-10-25', 22, 'India', FALSE, 'BATTER', 'Set UBA9 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA9, #486) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jafar-jamal-487', 'Jafar Jamal', '1990-03-20', 35, 'India', FALSE, 'BATTER', 'Set UBA9 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA9, #487) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ayaz-khan-488', 'Ayaz Khan', '2002-09-10', 22, 'India', FALSE, 'BATTER', 'Set UBA9 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA9, #488) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kaushik-maity-489', 'Kaushik Maity', '1999-10-14', 25, 'India', FALSE, 'BATTER', 'Set UBA9 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA9, #489) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rituraj-sharma-490', 'Rituraj Sharma', '2002-11-27', 22, 'India', FALSE, 'BATTER', 'Set UBA9 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA9, #490) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vaibhav-suryavanshi-491', 'Vaibhav Suryavanshi', '2011-03-27', 14, 'India', FALSE, 'BATTER', 'Set UBA9 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UBA9, #491) from India representing BICA. Acquired by Rajasthan Royals for ₹1.10 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kartik-chadha-492', 'Kartik Chadha', '2004-01-08', 21, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Left-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL9, #492) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('writtick-chatterjee-493', 'Writtick Chatterjee', '1992-09-28', 32, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL9, #493) from India representing CAB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prerit-dutta-494', 'Prerit Dutta', '1998-09-22', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL9, #494) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rajneesh-gurbani-495', 'Rajneesh Gurbani', '1993-01-28', 32, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL9, #495) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shubhang-hegde-496', 'Shubhang Hegde', '2001-03-30', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL9, #496) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('saransh-jain-497', 'Saransh Jain', '1993-03-31', 32, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL9, #497) from India representing MPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ripal-patel-498', 'Ripal Patel', '1995-09-28', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL9, #498) from India representing GUCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akash-vashisht-499', 'Akash Vashisht', '1994-12-17', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL9 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL9, #499) from India representing HPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('anirudh-kanwar-500', 'Anirudh Kanwar', '1994-03-13', 31, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #500) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shubham-kapse-501', 'Shubham Kapse', '1994-07-22', 30, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #501) from India representing VCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('atif-mushtaq-502', 'Atif Mushtaq', '2003-03-20', 22, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #502) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dipesh-parwani-503', 'Dipesh Parwani', '2000-01-14', 25, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #503) from India representing VCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('manish-reddy-504', 'Manish Reddy', '1999-01-07', 26, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #504) from India representing HYCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('chetan-sharma-505', 'Chetan Sharma', '2005-11-23', 19, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #505) from India representing RCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('avinash-singh-506', 'Avinash Singh', '1998-07-05', 26, 'India', FALSE, 'BOWLER', 'Set UFA9 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA9, #506) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('alick-athanaze-507', 'Alick Athanaze', '1998-12-07', 26, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted capped candidate (Set AL10, #507) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hilton-cartwright-508', 'Hilton Cartwright', '1992-02-14', 33, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL10, #508) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dominic-drakes-509', 'Dominic Drakes', '1998-02-06', 27, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL10, #509) from West Indies.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('daryn-dupavillon-510', 'Daryn Dupavillon', '1994-07-15', 30, 'South Africa', TRUE, 'BOWLER', 'Set FA10 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA10, #510) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('matthew-forde-511', 'Matthew Forde', '2002-04-29', 22, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL10, #511) from West Indies.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('patrick-kruger-512', 'Patrick Kruger', '1995-02-03', 30, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL10, #512) from South Africa.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lahiru-kumara-513', 'Lahiru Kumara', '1997-02-13', 28, 'Sri Lanka', TRUE, 'BOWLER', 'Set FA10 (Capped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set FA10, #513) from Sri Lanka.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('michael-neser-514', 'Michael Neser', '1990-03-29', 35, 'Australia', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set AL10, #514) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('richard-ngarava-515', 'Richard Ngarava', '1997-12-29', 27, 'Zimbabwe', TRUE, 'BOWLER', 'Set FA10 (Capped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA10, #515) from Zimbabwe.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('wayne-parnell-516', 'Wayne Parnell', '1989-07-30', 35, 'South Africa', TRUE, 'BOWLER', 'Set FA10 (Capped)', 'Left-hand bat', 'Left Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA10, #516) from South Africa.', 10000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('keemo-paul-517', 'Keemo Paul', '1998-02-21', 27, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted capped candidate (Set AL10, #517) from West Indies.', 12500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('odean-smith-518', 'Odean Smith', '1996-11-01', 28, 'West Indies', TRUE, 'ALL_ROUNDER', 'Set AL10 (Capped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted capped candidate (Set AL10, #518) from West Indies.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('andrew-tye-519', 'Andrew Tye', '1986-12-12', 38, 'Australia', TRUE, 'BOWLER', 'Set FA10 (Capped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted capped candidate (Set FA10, #519) from Australia.', 7500000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ajay-ahlawat-520', 'Ajay Ahlawat', '1997-05-27', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Left-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL10, #520) from India representing DDCA.', 4000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('corbin-bosch-521', 'Corbin Bosch', '1994-09-10', 30, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL10, #521) from South Africa.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mayank-gusain-522', 'Mayank Gusain', '2001-09-25', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL10, #522) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mukhtar-hussain-523', 'Mukhtar Hussain', '1999-01-11', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL10, #523) from India representing ASCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('girinath-reddy-524', 'Girinath Reddy', '1998-10-08', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL10, #524) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('jalaj-saxena-525', 'Jalaj Saxena', '1986-12-15', 38, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL10, #525) from India representing KCA.', 4000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yajas-sharma-526', 'Yajas Sharma', '2005-08-21', 19, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL10, #526) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sanjay-yadav-527', 'Sanjay Yadav', '1995-05-10', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL10 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL10, #527) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vishal-godara-528', 'Vishal Godara', '2003-02-25', 22, 'India', FALSE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Left-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #528) from India representing RCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('eshan-malinga-529', 'Eshan Malinga', '2001-02-04', 24, 'Sri Lanka', TRUE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #529) from Sri Lanka. Acquired by Sunrisers Hyderabad for ₹1.20 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('samarth-nagraj-530', 'Samarth Nagraj', '2005-10-21', 19, 'India', FALSE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #530) from India representing KSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhishek-saini-531', 'Abhishek Saini', '1998-12-02', 26, 'India', FALSE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #531) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dumindu-sewmina-532', 'Dumindu Sewmina', '2004-12-19', 20, 'Sri Lanka', TRUE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #532) from Sri Lanka.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pradyuman-kumar-singh-533', 'Pradyuman Kumar Singh', '2001-12-03', 23, 'India', FALSE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #533) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vasu-vats-534', 'Vasu Vats', '2002-09-08', 22, 'India', FALSE, 'BOWLER', 'Set UFA10 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UFA10, #534) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('umang-kumar-535', 'Umang  Kumar', '2000-12-11', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL11, #535) from India representing GUCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('mohamed-ali-536', 'Mohamed Ali', '2004-10-03', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL11, #536) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('atharva-ankolekar-537', 'Atharva Ankolekar', '2000-09-26', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL11, #537) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vaisakh-chandran-538', 'Vaisakh Chandran', '1996-05-31', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL11, #538) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('auqib-dar-539', 'Auqib Dar', '1996-11-04', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL11, #539) from India representing JKCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rohit-rayudu-540', 'Rohit Rayudu', '1994-07-29', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL11, #540) from India representing HYCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('uday-saharan-541', 'Uday Saharan', '2004-09-08', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL11, #541) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ayush-vartak-542', 'Ayush Vartak', '2004-10-29', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL11 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL11, #542) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('baba-aparajith-543', 'Baba Aparajith', '1994-07-08', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL12, #543) from India representing KCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sumit-kumar-beniwal-544', 'Sumit Kumar Beniwal', '1999-04-11', 25, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL12, #544) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('nishunk-birla-545', 'Nishunk Birla', '2004-10-22', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL12, #545) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('digvijay-deshmukh-546', 'Digvijay Deshmukh', '1998-04-12', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL12, #546) from India representing MACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('lakshay-jain-547', 'Lakshay Jain', '2002-07-05', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL12, #547) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('duan-jansen-548', 'Duan Jansen', '2000-05-01', 24, 'South Africa', TRUE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Right-hand bat', 'Left Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL12, #548) from South Africa.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kritagya-singh-549', 'Kritagya Singh', '2000-09-25', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL12, #549) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('p-vignesh-550', 'P. Vignesh', '2005-04-06', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL12 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL12, #550) from India representing TNCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sabhay-chadha-551', 'Sabhay Chadha', '1998-05-07', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL13, #551) from India representing CAP.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ben-howell-552', 'Ben Howell', '1988-10-05', 36, 'England', TRUE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL13, #552) from England.', 5000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('hemanth-kumar-553', 'Hemanth Kumar', '2004-12-12', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL13, #553) from India representing ACA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('rohan-rana-554', 'Rohan Rana', '2002-01-12', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Right-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL13, #554) from India representing HCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('bharat-sharma-555', 'Bharat Sharma', '1995-11-15', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL13, #555) from India representing CAP.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('pratham-singh-556', 'Pratham Singh', '1992-08-31', 32, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Left-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL13, #556) from India representing RSPB.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tripurana-vijay-557', 'Tripurana Vijay', '2001-09-05', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL13, #557) from India representing ACA. Acquired by Delhi Capitals for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('ravi-yadav-558', 'Ravi Yadav', '1997-12-26', 27, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL13 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL13, #558) from India representing JSCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('arjun-azad-559', 'Arjun Azad', '2001-08-08', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL14, #559) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('abhay-choudhary-560', 'Abhay Choudhary', '2002-06-26', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL14, #560) from India representing PCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('gaurav-gambhir-561', 'Gaurav Gambhir', '1987-11-26', 37, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL14, #561) from India representing UTCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('shubham-garhwal-562', 'Shubham Garhwal', '1995-05-14', 29, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL14, #562) from India representing RCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tejasvi-jaiswal-563', 'Tejasvi Jaiswal', '1997-03-02', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Left-hand bat', 'Right Arm Fast', 'PACE', 'Official shortlisted uncapped candidate (Set UAL14, #563) from India representing TCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('sairaj-patil-564', 'Sairaj Patil', '1996-10-31', 28, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL14, #564) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('madhav-tiwari-565', 'Madhav Tiwari', '2003-09-28', 21, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL14, #565) from India representing MPCA. Acquired by Delhi Capitals for ₹0.40 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('kamal-tripathi-566', 'Kamal Tripathi', '1998-08-15', 26, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL14 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL14, #566) from India representing MPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('prashant-chauhan-567', 'Prashant Chauhan', '2001-04-01', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Left-hand bat', 'Left Arm Slow Orthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL15, #567) from India representing CAU.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('yash-dabas-568', 'Yash Dabas', '2004-12-08', 20, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Right Arm Fast Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL15, #568) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('dhruv-kaushik-569', 'Dhruv Kaushik', '2000-07-11', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL15, #569) from India representing DDCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('khrievitso-kense-570', 'Khrievitso Kense', '2004-03-06', 21, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Right Arm Leg Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL15, #570) from India representing NCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('akash-parkar-571', 'Akash Parkar', '1994-05-20', 30, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL15, #571) from India representing MCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vignesh-puthur-572', 'Vignesh Puthur', '2001-03-02', 24, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Left Arm Slow Unorthodox', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL15, #572) from India representing KCA. Acquired by Mumbai Indians for ₹0.30 Cr at the Jeddah Mega Auction.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('tripuresh-singh-573', 'Tripuresh Singh', '2002-04-13', 22, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Right Arm Medium', 'PACE', 'Official shortlisted uncapped candidate (Set UAL15, #573) from India representing MPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price, data_completeness)
VALUES ('vijay-yadav-574', 'Vijay Yadav', '2001-12-19', 23, 'India', FALSE, 'ALL_ROUNDER', 'Set UAL15 (Uncapped)', 'Right-hand bat', 'Right Arm Off Spin', 'SPIN', 'Official shortlisted uncapped candidate (Set UAL15, #574) from India representing UPCA.', 3000000, 'VERIFIED_HISTORICAL')
ON CONFLICT (id) DO UPDATE SET
  default_base_price = EXCLUDED.default_base_price,
  calculated_age = EXCLUDED.calculated_age;
