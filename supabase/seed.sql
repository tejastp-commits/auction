-- IPL Auction Arena: Deterministic Seed Data
-- Seed all 10 IPL Franchises and verified player catalog

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

-- Players
INSERT INTO players (id, canonical_name, date_of_birth, calculated_age, nationality, is_overseas, primary_role, secondary_role, batting_style, bowling_style, bowling_type, profile_summary, default_base_price) VALUES
('vkohli-18', 'Virat Kohli', '1988-11-05', 35, 'India', FALSE, 'BATTER', 'Top-order anchor', 'Right-hand bat', 'Right-arm medium', 'PACE', 'All-time leading run-scorer in IPL history with 8 centuries.', 20000000),
('rsharma-45', 'Rohit Sharma', '1987-04-30', 37, 'India', FALSE, 'BATTER', 'Opening batter', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Legendary opener and 5-time championship captain.', 20000000),
('syadav-63', 'Suryakumar Yadav', '1990-09-14', 33, 'India', FALSE, 'BATTER', '360-degree batter', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'The premier 360-degree T20 batter capable of manipulating any field setting.', 20000000),
('sgill-77', 'Shubman Gill', '1999-09-08', 24, 'India', FALSE, 'BATTER', 'Top-order batter', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Orange Cap winner renowned for immaculate timing and elite conversion rate.', 20000000),
('yjaiswal-19', 'Yashasvi Jaiswal', '2001-12-28', 22, 'India', FALSE, 'BATTER', 'Powerplay opener', 'Left-hand bat', 'Right-arm legbreak', 'SPIN', 'Record-holder for the fastest half-century in IPL history (13 balls).', 20000000),
('rgaikwad-31', 'Ruturaj Gaikwad', '1997-01-31', 27, 'India', FALSE, 'BATTER', 'Top-order anchor', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Orange Cap winning top-order batter with composed strokeplay.', 20000000),
('thead-62', 'Travis Head', '1993-12-29', 30, 'Australia', TRUE, 'BATTER', 'Powerplay destructor', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'High-impact powerplay batter scoring at unprecedented strike rates.', 20000000),
('fduplessis-13', 'Faf du Plessis', '1984-07-13', 40, 'South Africa', TRUE, 'BATTER', 'Opening batter & captain', 'Right-hand bat', 'Right-arm legbreak', 'SPIN', 'Veteran top-order run-getter known for exceptional fitness and leadership.', 20000000),
('rsingh-35', 'Rinku Singh', '1997-10-12', 26, 'India', FALSE, 'BATTER', 'Death-overs finisher', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'Renowned for clutchness under extreme pressure and 5 consecutive sixes.', 15000000),
('dmiller-10', 'David Miller', '1989-06-10', 35, 'South Africa', TRUE, 'BATTER', 'Finisher', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'Killer Miller has engineered memorable run chases in IPL history.', 15000000),
('msdhoni-07', 'MS Dhoni', '1981-07-07', 43, 'India', FALSE, 'WICKETKEEPER', 'Finisher & captain', 'Right-hand bat', 'Right-arm medium', 'PACE', 'The iconic Thala, 5-time championship captain and master of the chase.', 20000000),
('rpant-17', 'Rishabh Pant', '1997-10-04', 26, 'India', FALSE, 'WICKETKEEPER', 'Middle-order match winner', 'Left-hand bat', 'Right-arm medium', 'NONE', 'Devastating middle-order batter with unorthodox match-winning prowess.', 20000000),
('hklaasen-45', 'Heinrich Klaasen', '1991-07-30', 33, 'South Africa', TRUE, 'WICKETKEEPER', 'Spin destroyer', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'Statistically the most feared batter against spin in world cricket.', 20000000),
('jbuttler-63', 'Jos Buttler', '1990-09-08', 33, 'England', TRUE, 'WICKETKEEPER', 'Opening batter', 'Right-hand bat', 'None', 'NONE', 'Orange Cap winner holding the record for 7 IPL centuries.', 20000000),
('npooran-29', 'Nicholas Pooran', '1995-10-02', 28, 'West Indies', TRUE, 'WICKETKEEPER', 'Middle-order finisher', 'Left-hand bat', 'Right-arm offbreak', 'SPIN', 'Devastating power-hitter with career strike rate exceeding 160.', 20000000),
('ssamson-11', 'Sanju Samson', '1994-11-11', 29, 'India', FALSE, 'WICKETKEEPER', 'Top-order shotmaker', 'Right-hand bat', 'Right-arm medium', 'NONE', 'Elegant stroke-maker with supreme boundary-hitting capability.', 20000000),
('klrahul-01', 'KL Rahul', '1992-04-18', 32, 'India', FALSE, 'WICKETKEEPER', 'Opening anchor', 'Right-hand bat', 'Right-arm medium', 'NONE', 'Prolific opener boasting a career batting average above 45.', 20000000),
('hpandya-33', 'Hardik Pandya', '1993-10-11', 30, 'India', FALSE, 'ALL_ROUNDER', 'Pace all-rounder & captain', 'Right-hand bat', 'Right-arm fast-medium', 'PACE', 'Marquee fast-bowling all-rounder with championship-winning pedigree.', 20000000),
('rjadeja-08', 'Ravindra Jadeja', '1988-12-06', 35, 'India', FALSE, 'ALL_ROUNDER', 'Spin all-rounder & gun fielder', 'Left-hand bat', 'Slow left-arm orthodox', 'SPIN', 'Championship-winning stalwart known for suffocating economy and clutch hitting.', 20000000),
('arussell-12', 'Andre Russell', '1988-04-29', 36, 'West Indies', TRUE, 'ALL_ROUNDER', 'Power hitter & death bowler', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Highest strike rate in IPL history among significant run scorers (174.93).', 20000000),
('snarine-74', 'Sunil Narine', '1988-05-26', 36, 'West Indies', TRUE, 'ALL_ROUNDER', 'Mystery spinner & pinch-hitter', 'Left-hand bat', 'Right-arm offbreak mystery', 'SPIN', 'Multiple-time MVP with sub-7 economy and explosive powerplay hitting.', 20000000),
('gmaxwell-32', 'Glenn Maxwell', '1988-10-14', 35, 'Australia', TRUE, 'ALL_ROUNDER', 'Spin smasher & off-spinner', 'Right-hand bat', 'Right-arm offbreak', 'SPIN', 'The Big Show provides unmatched strike rate in middle overs.', 20000000),
('apatel-20', 'Axar Patel', '1994-01-20', 30, 'India', FALSE, 'ALL_ROUNDER', 'Economical spinner & finisher', 'Left-hand bat', 'Slow left-arm orthodox', 'SPIN', 'Disciplined all-rounder who cramps batters and hits clutch boundaries.', 20000000),
('mstoinis-17', 'Marcus Stoinis', '1989-08-16', 35, 'Australia', TRUE, 'ALL_ROUNDER', 'Power pace all-rounder', 'Right-hand bat', 'Right-arm medium-fast', 'PACE', 'Heavy ball striker who blasted 124* in a famous Chepauk run chase.', 20000000),
('scurran-58', 'Sam Curran', '1998-06-03', 26, 'England', TRUE, 'ALL_ROUNDER', 'Left-arm seam & pinch-hitter', 'Left-hand bat', 'Left-arm medium-fast', 'PACE', 'High-utility all-rounder in both powerplay and death overs.', 20000000),
('jbumrah-93', 'Jasprit Bumrah', '1993-12-06', 30, 'India', FALSE, 'BOWLER', 'Premier fast bowler', 'Right-hand bat', 'Right-arm fast', 'PACE', 'The gold standard of T20 bowling with lethal yorkers and sub-7 economy.', 20000000),
('rkhan-19', 'Rashid Khan', '1998-09-20', 25, 'Afghanistan', TRUE, 'BOWLER', 'Leg-spin wizard', 'Right-hand bat', 'Right-arm legbreak googly', 'SPIN', 'Spin phenomenon with rapid arm speed, unpickable googlies and 149+ wickets.', 20000000),
('mstarc-56', 'Mitchell Starc', '1990-01-30', 34, 'Australia', TRUE, 'BOWLER', 'Left-arm express pace', 'Left-hand bat', 'Left-arm fast', 'PACE', 'Championship final MVP who turns high-stakes knockout games on their head.', 20000000),
('pcummins-30', 'Pat Cummins', '1993-05-08', 31, 'Australia', TRUE, 'BOWLER', 'Pace bowler & captain', 'Right-hand bat', 'Right-arm fast', 'PACE', 'World Cup winning captain with lethal hard-length bowling and clutch striking.', 20000000),
('tboult-18', 'Trent Boult', '1989-07-22', 35, 'New Zealand', TRUE, 'BOWLER', 'Powerplay swing bowler', 'Right-hand bat', 'Left-arm fast', 'PACE', 'The most prolific first-over wicket-taker in IPL history.', 20000000),
('ychahal-03', 'Yuzvendra Chahal', '1990-07-23', 34, 'India', FALSE, 'BOWLER', 'Leg-spinner', 'Right-hand bat', 'Right-arm legbreak', 'SPIN', 'All-time leading wicket-taker in IPL history with over 200 wickets.', 20000000),
('kyadav-23', 'Kuldeep Yadav', '1994-12-14', 29, 'India', FALSE, 'BOWLER', 'Left-arm wrist-spinner', 'Left-hand bat', 'Left-arm wrist spin', 'SPIN', 'Attacking wrist-spinner who extracts sharp turn and bounce in middle overs.', 20000000),
('asingh-02', 'Arshdeep Singh', '1999-02-05', 25, 'India', FALSE, 'BOWLER', 'Death yorker specialist', 'Left-hand bat', 'Left-arm medium-fast', 'PACE', 'World Cup champion pace bowler executing pin-point death yorkers.', 20000000),
('krabada-25', 'Kagiso Rabada', '1995-05-25', 29, 'South Africa', TRUE, 'BOWLER', 'Express pace strike bowler', 'Left-hand bat', 'Right-arm fast', 'PACE', 'Purple Cap winner with one of the most prolific strike rates in IPL history.', 20000000),
('msiraj-73', 'Mohammed Siraj', '1994-03-13', 30, 'India', FALSE, 'BOWLER', 'Seam & swing bowler', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Fierce competitor who bowls with relentless energy attacking the stumps.', 20000000),
('mshami-11', 'Mohammed Shami', '1990-09-03', 34, 'India', FALSE, 'BOWLER', 'Seam presentation master', 'Right-hand bat', 'Right-arm fast', 'PACE', 'Purple Cap winner with the most immaculate upright seam presentation.', 20000000),
('vchakaravarthy-29', 'Varun Chakaravarthy', '1991-08-29', 33, 'India', FALSE, 'BOWLER', 'Mystery spinner', 'Right-hand bat', 'Right-arm mystery spin', 'SPIN', 'Key architect of championship bowling attacks with unreadable spin variations.', 15000000)
ON CONFLICT (id) DO NOTHING;
