INSERT INTO category_items
(id, category_id, display_text, speak_text, speech_type, image_url)
VALUES
    ('A', 'alphabet', 'A', 'A', 'LETTER_NAME', '/images/letters/a.svg'),
    ('B', 'alphabet', 'B', 'B', 'LETTER_NAME', '/images/letters/b.svg'),
    ('C', 'alphabet', 'C', 'C', 'LETTER_NAME', '/images/letters/c.svg'),
    ('D', 'alphabet', 'D', 'D', 'LETTER_NAME', '/images/letters/d.svg'),
    ('E', 'alphabet', 'E', 'E', 'LETTER_NAME', '/images/letters/e.svg'),
    ('F', 'alphabet', 'F', 'F', 'LETTER_NAME', '/images/letters/f.svg'),
    ('G', 'alphabet', 'G', 'G', 'LETTER_NAME', '/images/letters/g.svg'),
    ('H', 'alphabet', 'H', 'H', 'LETTER_NAME', '/images/letters/h.svg'),
    ('I', 'alphabet', 'I', 'I', 'LETTER_NAME', '/images/letters/i.svg'),
    ('J', 'alphabet', 'J', 'J', 'LETTER_NAME', '/images/letters/j.svg'),
    ('K', 'alphabet', 'K', 'K', 'LETTER_NAME', '/images/letters/k.svg'),
    ('L', 'alphabet', 'L', 'L', 'LETTER_NAME', '/images/letters/l.svg'),
    ('M', 'alphabet', 'M', 'M', 'LETTER_NAME', '/images/letters/m.svg'),
    ('N', 'alphabet', 'N', 'N', 'LETTER_NAME', '/images/letters/n.svg'),
    ('O', 'alphabet', 'O', 'O', 'LETTER_NAME', '/images/letters/o.svg'),
    ('P', 'alphabet', 'P', 'P', 'LETTER_NAME', '/images/letters/p.svg'),
    ('Q', 'alphabet', 'Q', 'Q', 'LETTER_NAME', '/images/letters/q.svg'),
    ('R', 'alphabet', 'R', 'R', 'LETTER_NAME', '/images/letters/r.svg'),
    ('S', 'alphabet', 'S', 'S', 'LETTER_NAME', '/images/letters/s.svg'),
    ('T', 'alphabet', 'T', 'T', 'LETTER_NAME', '/images/letters/t.svg'),
    ('U', 'alphabet', 'U', 'U', 'LETTER_NAME', '/images/letters/u.svg'),
    ('V', 'alphabet', 'V', 'V', 'LETTER_NAME', '/images/letters/v.svg'),
    ('W', 'alphabet', 'W', 'W', 'LETTER_NAME', '/images/letters/w.svg'),
    ('X', 'alphabet', 'X', 'X', 'LETTER_NAME', '/images/letters/x.svg'),
    ('Y', 'alphabet', 'Y', 'Y', 'LETTER_NAME', '/images/letters/y.svg'),
    ('Z', 'alphabet', 'Z', 'Z', 'LETTER_NAME', '/images/letters/z.svg')
ON CONFLICT (category_id, id) DO UPDATE SET
                                            display_text = EXCLUDED.display_text,
                                            speak_text = EXCLUDED.speak_text,
                                            speech_type = EXCLUDED.speech_type,
                                            image_url = EXCLUDED.image_url;


INSERT INTO category_items (id, category_id, display_text, speak_text, image_url) VALUES
                                                                                      ('1', 'numbers', '1', 'one', '/images/numbers/1.svg'),
                                                                                      ('2', 'numbers', '2', 'two', '/images/numbers/2.svg'),
                                                                                      ('3', 'numbers', '3', 'three', '/images/numbers/3.svg'),
                                                                                      ('4', 'numbers', '4', 'four', '/images/numbers/4.svg'),
                                                                                      ('5', 'numbers', '5', 'five', '/images/numbers/5.svg'),
                                                                                      ('6', 'numbers', '6', 'six', '/images/numbers/6.svg'),
                                                                                      ('7', 'numbers', '7', 'seven', '/images/numbers/7.svg'),
                                                                                      ('8', 'numbers', '8', 'eight', '/images/numbers/8.svg'),
                                                                                      ('9', 'numbers', '9', 'nine', '/images/numbers/9.svg'),
                                                                                      ('10', 'numbers', '10', 'ten', '/images/numbers/10.svg'),
                                                                                      ('11', 'numbers', '11', 'eleven', '/images/numbers/11.svg'),
                                                                                      ('12', 'numbers', '12', 'twelve', '/images/numbers/12.svg'),
                                                                                      ('13', 'numbers', '13', 'thirteen', '/images/numbers/13.svg'),
                                                                                      ('14', 'numbers', '14', 'fourteen', '/images/numbers/14.svg'),
                                                                                      ('15', 'numbers', '15', 'fifteen', '/images/numbers/15.svg'),
                                                                                      ('16', 'numbers', '16', 'sixteen', '/images/numbers/16.svg'),
                                                                                      ('17', 'numbers', '17', 'seventeen', '/images/numbers/17.svg'),
                                                                                      ('18', 'numbers', '18', 'eighteen', '/images/numbers/18.svg'),
                                                                                      ('19', 'numbers', '19', 'nineteen', '/images/numbers/19.svg'),
                                                                                      ('20', 'numbers', '20', 'twenty', '/images/numbers/20.svg')
ON CONFLICT (category_id, id) DO NOTHING;












INSERT INTO category_items
(id, category_id, display_text, speak_text, image_url)
VALUES
    ('1', 'colors', 'Red', 'Red', '/images/colors/red.svg'),
    ('2', 'colors', 'Blue', 'Blue', '/images/colors/blue.svg'),
    ('3', 'colors', 'Yellow', 'Yellow', '/images/colors/yellow.svg'),
    ('4', 'colors', 'Green', 'Green', '/images/colors/green.svg'),
    ('5', 'colors', 'Orange', 'Orange', '/images/colors/orange.svg'),
    ('6', 'colors', 'Purple', 'Purple', '/images/colors/purple.svg'),
    ('7', 'colors', 'Pink', 'Pink', '/images/colors/pink.svg'),
    ('8', 'colors', 'Black', 'Black', '/images/colors/black.svg'),
    ('9', 'colors', 'White', 'White', '/images/colors/white.svg'),
    ('10', 'colors', 'Brown', 'Brown', '/images/colors/brown.svg')
ON CONFLICT (category_id, id) DO NOTHING;






INSERT INTO category_items
(id, category_id, display_text, speak_text, image_url)
VALUES
    ('1', 'shapes', 'Circle', 'Circle', '/images/shapes/circle.svg'),
    ('2', 'shapes', 'Square', 'Square', '/images/shapes/square.svg'),
    ('3', 'shapes', 'Triangle', 'Triangle', '/images/shapes/triangle.svg'),
    ('4', 'shapes', 'Rectangle', 'Rectangle', '/images/shapes/rectangle.svg'),
    ('5', 'shapes', 'Star', 'Star', '/images/shapes/star.svg'),
    ('6', 'shapes', 'Heart', 'Heart', '/images/shapes/heart.svg'),
    ('7', 'shapes', 'Oval', 'Oval', '/images/shapes/oval.svg'),
    ('8', 'shapes', 'Diamond', 'Diamond', '/images/shapes/diamond.svg'),
    ('9', 'shapes', 'Pentagon', 'Pentagon', '/images/shapes/pentagon.svg'),
    ('10', 'shapes', 'Hexagon', 'Hexagon', '/images/shapes/hexagon.svg')
ON CONFLICT (category_id, id) DO NOTHING;