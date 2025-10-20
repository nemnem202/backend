INSERT INTO category (category_name) VALUES
  ('Medical'),
  ('Chemical'),
  ('Costumes'),
  ('Hacking Equipment'),
  ('Surveillance'),
  ('Storage');
INSERT INTO account (suspended, is_modo, username, password, is_vendor, number_of_reports) VALUES
  (FALSE, FALSE, 'med_vendor', 'secure123', TRUE, 0),
  (FALSE, FALSE, 'chem_vendor', 'chemPass!', TRUE, 1),
  (FALSE, FALSE, 'gear_vendor', 'gearUp2025', TRUE, 0);
INSERT INTO product (
  product_name, suspended, product_description, product_price,
  product_image_path, number_of_sells, number_of_reports,
  available_quantity, account_id
) VALUES
  ('Sterile Syringe Pack', FALSE, 'Pack of 10 sterile syringes for clinical use.', 12.99, '/PH_product_image.jpg', 120, 0, 500, 1),
  ('Antiseptic Wipes', FALSE, 'Alcohol-based wipes for disinfection.', 5.49, '/PH_product_image.jpg', 300, 0, 1000, 1),
  ('Hydrochloric Acid 500ml', FALSE, 'Laboratory-grade HCl solution.', 18.75, '/PH_product_image.jpg', 75, 1, 200, 2),
  ('Sodium Hydroxide Pellets', FALSE, 'Pure NaOH pellets for chemical synthesis.', 14.20, '/PH_product_image.jpg', 60, 0, 150, 2),
  ('Biohazard Suit Replica', FALSE, 'Full-body costume resembling a hazmat suit.', 89.99, '/PH_product_image.jpg', 40, 0, 80, 3),
  ('Lab Technician Outfit', FALSE, 'White coat costume with accessories.', 39.50, '/PH_product_image.jpg', 55, 0, 120, 3),
  ('USB Rubber Ducky', FALSE, 'Penetration testing tool disguised as a USB stick.', 49.99, '/PH_product_image.jpg', 90, 2, 60, 3),
  ('WiFi Sniffer Kit', FALSE, 'Toolkit for analyzing wireless networks.', 129.00, '/PH_product_image.jpg', 30, 1, 40, 3),
  ('Mini Spy Camera', FALSE, 'Discreet camera with motion detection.', 79.99, '/PH_product_image.jpg', 150, 0, 100, 3),
  ('Audio Bug Transmitter', FALSE, 'Compact audio surveillance device.', 65.00, '/PH_product_image.jpg', 85, 1, 70, 3),
  ('Chemical Storage Tank 10L', FALSE, 'High-density polyethylene tank for chemical storage.', 45.00, '/PH_product_image.jpg', 20, 0, 30, 2),
  ('Reinforced Tactical Backpack', FALSE, 'Durable backpack with multiple compartments.', 59.99, '/PH_product_image.jpg', 110, 0, 200, 3);

INSERT INTO product_belong_category (product_id, category_id) VALUES
  (1, 1), (2, 1),
  (3, 2), (4, 2),
  (5, 3), (6, 3),
  (7, 4), (8, 4),
  (9, 5), (10, 5),
  (11, 6), (12, 6);