/*
 CS-340
 Group 60
 Anson Davis, Alexander Licato
 DDL
 */

-- Recreate fresh database
drop database cs340_licatoa;
create database cs340_licatoa;
use cs340_licatoa;

START TRANSACTION;
--
-- constructions table
--

CREATE TABLE `constructions` (
    `construction_id` int(11) NOT NULL,
    `project_id` int(11) NULL,
    `construction_start_date` date DEFAULT NULL COMMENT 'date',
    `construction_completion_date` date DEFAULT NULL COMMENT 'date',
    `construction_location` varchar(60) NOT NULL COMMENT 'address',
    `construction_total` decimal(19, 2) NOT NULL COMMENT 'price'
);
--
-- constructions sample inserts
--

INSERT INTO `constructions` (
        `construction_id`,
        `project_id`,
        `construction_start_date`,
        `construction_completion_date`,
        `construction_location`,
        `construction_total`
    )
VALUES (
        1,
        1,
        '2023-02-04',
        '2029-02-04',
        'Portland, Oregon',
        52000.00
    ),
    (
        2,
        2,
        '2023-02-05',
        '2029-02-05',
        'Portland, Oregon',
        112000.00
    ),
    (
        3,
        3,
        '2023-02-06',
        '2029-02-06',
        'Portland, Oregon',
        13423.00
    );
-- --------------------------------------------------------
--
-- construction_materials table
--

CREATE TABLE `construction_materials` (
    `material_id` int(11) NOT NULL,
    `item` varchar(145) NOT NULL
);
--
-- construction_materials sample data inserts
--

INSERT INTO `construction_materials` (`material_id`, `item`)
VALUES (1, '10,000x Steel Nails'),
    (2, '1,000ft #3 Rebar'),
    (3, '50x Northern Pine 2x4');
-- --------------------------------------------------------
--
-- material_expendings table
--

CREATE TABLE `material_expendings` (
    `material_expending_id` int(11) NOT NULL,
    `vendor_specific_material_id` int(11) NOT NULL,
    `construction_id` int(11) NOT NULL,
    `quantity_material_expended` int(11) NOT NULL,
    `date_expended` date DEFAULT NULL COMMENT 'date'
);
--
-- material_expendings sample inserts
--

INSERT INTO `material_expendings` (
        `material_expending_id`,
        `vendor_specific_material_id`,
        `construction_id`,
        `quantity_material_expended`,
        `date_expended`
    )
VALUES (1, 1, 1, 5, '2023-02-05'),
    (2, 2, 2, 2, '2023-02-06'),
    (3, 3, 3, 3, '2023-02-07');
-- --------------------------------------------------------
--
-- material_orders data
--

CREATE TABLE `material_orders` (
    `material_order_id` int(11) NOT NULL,
    `total_cost` decimal(19, 2) NOT NULL COMMENT 'price',
    `purchase_date` date NOT NULL COMMENT 'date'
);
--
-- material_orders sample inserts
--

INSERT INTO `material_orders` (
        `material_order_id`,
        `total_cost`,
        `purchase_date`
    )
VALUES (1, 14600.0000, '2023-01-02 00:00:00'),
    (2, 13520.0000, '2023-01-25 00:00:00'),
    (3, 21000.0000, '2023-02-02 00:00:00');
-- --------------------------------------------------------
--
-- order_details table
--

CREATE TABLE `order_details` (
    `order_detail_id` int(11) NOT NULL,
    `material_order_id` int(11) NOT NULL,
    `vendor_specific_material_id` int(11) NOT NULL,
    `quantity_ordered` int(11) NOT NULL
);
--
-- order_details sample data inserts
--

INSERT INTO `order_details` (
        `order_detail_id`,
        `material_order_id`,
        `vendor_specific_material_id`,
        `quantity_ordered`
    )
VALUES (1, 1, 1, 40),
    (2, 1, 2, 10),
    (3, 2, 2, 30),
    (4, 2, 3, 40);
-- --------------------------------------------------------
--
-- projects table
--

CREATE TABLE `projects` (
    `project_id` int(11) NOT NULL,
    `project_manager` varchar(45) NOT NULL,
    `project_start_date` date NOT NULL COMMENT 'date',
    `project_completion_date` date NOT NULL COMMENT 'date',
    `project_location` varchar(60) NOT NULL COMMENT 'address',
    `project_total` decimal(19, 2) NOT NULL COMMENT 'price'
);
--
-- projects table sample inserts
--

INSERT INTO `projects` (
        `project_id`,
        `project_manager`,
        `project_start_date`,
        `project_completion_date`,
        `project_location`,
        `project_total`
    )
VALUES (
        1,
        'Jesse',
        '2023-02-04',
        '2029-02-04',
        'Portland, Oregon',
        120321.00
    ),
    (
        2,
        'Alicia',
        '2023-02-05',
        '2029-02-05',
        'Portland, Oregon',
        130230.00
    ),
    (
        3,
        'Patrick',
        '2023-02-06',
        '2029-02-06',
        'Portland, Oregon',
        42000.00
    );
-- --------------------------------------------------------
--
-- vendors table
--

CREATE TABLE `vendors` (
    `vendor_id` int(11) NOT NULL,
    `name` varchar(145) NOT NULL,
    `email_address` varchar(50) NOT NULL COMMENT 'address',
    `phone_number` varchar(20) NOT NULL COMMENT 'phone',
    `address` varchar(60) NOT NULL COMMENT 'address'
);
--
-- vendors table sample inserts
--

INSERT INTO `vendors` (
        `vendor_id`,
        `name`,
        `email_address`,
        `phone_number`,
        `address`
    )
VALUES (
        1,
        'Bob',
        'bob@gmail.com',
        '283-235-4748',
        '2135 F St., Portland OR, 97035'
    ),
    (
        2,
        'John',
        'john@yahoo.com',
        '923-357-2344',
        '3462 D Ave., Portland OR, 97035'
    ),
    (
        3,
        'David',
        'david@aol.com',
        '457-124-4657',
        '9290 A Park, Portland OR, 97211'
    ),
    (
        4,
        'Claudia',
        'claudia@xyz.com',
        '124-345-1234',
        '9012 B Lane, Portland OR, 97086'
    );
-- --------------------------------------------------------
--
-- vendor_specific_materials table
--

CREATE TABLE `vendor_specific_materials` (
    `vendor_specific_material_id` int(11) NOT NULL,
    `vendor_id` int(11) NOT NULL,
    `material_id` int(11) NOT NULL,
    `per_unit_price` decimal(19, 2) NOT NULL COMMENT 'price',
    `units_available` int(11) NOT NULL
);
--
-- vendor_specific_materials sample inserts
--

INSERT INTO `vendor_specific_materials` (
        `vendor_specific_material_id`,
        `vendor_id`,
        `material_id`,
        `per_unit_price`,
        `units_available`
    )
VALUES (1, 1, 1, 40.00, 5000),
    (2, 2, 2, 1300.00, 4000),
    (3, 3, 2, 1250.00, 3000);
--
-- Keys and Constraints
--

--
-- Indexes for table `constructions`
--
ALTER TABLE `constructions`
ADD PRIMARY KEY (`construction_id`),
    ADD KEY `fk_constructions_projects2_idx` (`project_id`);
--
-- Indexes for table `construction_materials`
--
ALTER TABLE `construction_materials`
ADD PRIMARY KEY (`material_id`);
--
-- Indexes for table `material_expendings`
--
ALTER TABLE `material_expendings`
ADD PRIMARY KEY (`material_expending_id`),
    ADD KEY `fk_vendor_specific_materials_has_constructions_construction_idx` (`construction_id`),
    ADD KEY `fk_vendor_specific_materials_has_constructions_vendor_speci_idx` (`vendor_specific_material_id`);
--
-- Indexes for table `material_orders`
--
ALTER TABLE `material_orders`
ADD PRIMARY KEY (`material_order_id`);
--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
ADD KEY `fk_material_orders_has_vendor_specific_materials_vendor_spe_idx` (`vendor_specific_material_id`),
    ADD KEY `fk_material_orders_has_vendor_specific_materials_material_o_idx` (`material_order_id`),
    ADD PRIMARY KEY(`order_detail_id`);
--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
ADD PRIMARY KEY (`project_id`);
--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
ADD PRIMARY KEY (`vendor_id`);
--
-- Indexes for table `vendor_specific_materials`
--
ALTER TABLE `vendor_specific_materials`
ADD PRIMARY KEY (`vendor_specific_material_id`),
    ADD KEY `material_id_idx` (`material_id`),
    ADD KEY `vendor_id_idx` (`vendor_id`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `constructions`
--
ALTER TABLE `constructions`
MODIFY `construction_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `construction_materials`
--
ALTER TABLE `construction_materials`
MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `material_orders`
--
ALTER TABLE `material_orders`
MODIFY `material_order_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 5;
--
-- AUTO_INCREMENT for table `vendor_specific_materials`
--
ALTER TABLE `vendor_specific_materials`
MODIFY `vendor_specific_material_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
MODIFY `order_detail_id` int (11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 5;
--
-- AUTO_INCREMENT for table `material_expendings`
--
ALTER TABLE `material_expendings`
MODIFY `material_expending_id` int (11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `constructions`
--
ALTER TABLE `constructions`
ADD CONSTRAINT `fk_constructions_projects2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `material_expendings`
--
ALTER TABLE `material_expendings`
ADD CONSTRAINT `fk_vendor_specific_materials_has_constructions_constructions1` FOREIGN KEY (`construction_id`) REFERENCES `constructions` (`construction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_vendor_specific_materials_has_constructions_vendor_specifi1` FOREIGN KEY (`vendor_specific_material_id`) REFERENCES `vendor_specific_materials` (`vendor_specific_material_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
ADD CONSTRAINT `fk_material_orders_has_vendor_specific_materials_material_ord1` FOREIGN KEY (`material_order_id`) REFERENCES `material_orders` (`material_order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_material_orders_has_vendor_specific_materials_vendor_speci1` FOREIGN KEY (`vendor_specific_material_id`) REFERENCES `vendor_specific_materials` (`vendor_specific_material_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Constraints for table `vendor_specific_materials`
--
ALTER TABLE `vendor_specific_materials`
ADD CONSTRAINT `material_id` FOREIGN KEY (`material_id`) REFERENCES `construction_materials` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Stored functions (mainly for use in triggers)
--
CREATE FUNCTION q_ordered(o_id INT) RETURNS INT RETURN (
SELECT quantity_ordered
FROM order_details
WHERE order_details.order_detail_id = o_id
);
CREATE FUNCTION u_price(v_id INT) RETURNS INT RETURN (
    SELECT per_unit_price
    FROM vendor_specific_materials
    WHERE vendor_specific_material_id = v_id
);
CREATE FUNCTION q_expended(m_id INT) RETURNS INT RETURN (
    SELECT quantity_material_expended
    FROM material_expendings
    WHERE material_expending_id = m_id
);
CREATE FUNCTION c_total(c_id INT) returns INT RETURN (
    SELECT construction_total
    FROM constructions
    WHERE construction_id = c_id
);
CREATE FUNCTION p_total(p_id INT) returns INT RETURN (
    SELECT project_total
    FROM projects
    WHERE project_id = p_id
);
--
-- Triggers to adjust prices and quantities on CREATE/UPDATE/DELETE ops
-- 
--
-- `order_details` triggers
--
DELIMITER // 
CREATE TRIGGER add_material
AFTER
INSERT ON order_details FOR EACH ROW BEGIN
UPDATE vendor_specific_materials
SET units_available = units_available + NEW.quantity_ordered
WHERE vendor_specific_material_id = NEW.vendor_specific_material_id;
UPDATE material_orders
SET total_cost = total_cost + (
        NEW.quantity_ordered * u_price(NEW.vendor_specific_material_id)
    )
WHERE material_order_id = NEW.material_order_id;
END;
// CREATE TRIGGER edit_material BEFORE
UPDATE ON order_details FOR EACH ROW BEGIN
UPDATE vendor_specific_materials
SET units_available = units_available + (
        NEW.quantity_ordered - q_ordered(NEW.material_order_id)
    )
WHERE vendor_specific_material_id = NEW.vendor_specific_material_id;
UPDATE material_orders
SET total_cost = total_cost + (
        (
            NEW.quantity_ordered - q_ordered(NEW.material_order_id)
        ) * u_price(NEW.vendor_specific_material_id)
    )
WHERE material_order_id = NEW.material_order_id;
END;
// CREATE TRIGGER remove_material BEFORE DELETE ON order_details FOR EACH ROW BEGIN
UPDATE vendor_specific_materials
SET units_available = units_available - OLD.quantity_ordered
WHERE vendor_specific_material_id = OLD.vendor_specific_material_id;
UPDATE material_orders
SET total_cost = total_cost - (
        OLD.quantity_ordered * u_price(OLD.vendor_specific_material_id)
    )
WHERE material_order_id = OLD.material_order_id;
END;
// --
-- `material_expendings` triggers
--
CREATE TRIGGER add_expenditure BEFORE
INSERT ON material_expendings FOR EACH ROW BEGIN
UPDATE constructions
SET construction_total = construction_total + (
        NEW.quantity_material_expended * u_price(NEW.vendor_specific_material_id)
    )
WHERE construction_id = NEW.construction_id;
IF (
    SELECT project_id
    FROM constructions
    WHERE construction_id = NEW.construction_id
) IS NOT NULL THEN
UPDATE projects
SET project_total = project_total + (
        NEW.quantity_material_expended * u_price(NEW.vendor_specific_material_id)
    )
WHERE project_id = (
        SELECT project_id
        FROM constructions
        WHERE construction_id = NEW.construction_id
    );
END IF;
END;
// CREATE TRIGGER edit_expenditure BEFORE
UPDATE ON material_expendings FOR EACH ROW BEGIN
UPDATE constructions
SET construction_total = construction_total + (
        (
            NEW.quantity_material_expended - q_expended(NEW.material_expending_id)
        ) * u_price(NEW.vendor_specific_material_id)
    )
WHERE construction_id = NEW.construction_id;
IF (
    SELECT project_id
    FROM constructions
    WHERE construction_id = NEW.construction_id
) IS NOT NULL THEN
UPDATE projects
SET project_total = project_total + (
        (
            NEW.quantity_material_expended - q_expended(NEW.material_expending_id)
        ) * u_price(NEW.vendor_specific_material_id)
    )
WHERE project_id = (
        SELECT project_id
        FROM constructions
        WHERE construction_id = NEW.construction_id
    );
END IF;
END;
// CREATE TRIGGER delete_expenditure BEFORE DELETE ON material_expendings FOR EACH ROW BEGIN
UPDATE constructions
SET construction_total = construction_total - (
        OLD.quantity_material_expended * u_price(OLD.vendor_specific_material_id)
    )
WHERE construction_id = OLD.construction_id;
IF (
    SELECT project_id
    FROM constructions
    WHERE construction_id = OLD.construction_id
) IS NOT NULL THEN
UPDATE projects
SET project_total = project_total - (
        OLD.quantity_material_expended * u_price(OLD.vendor_specific_material_id)
    )
WHERE project_id = (
        SELECT project_id
        FROM constructions
        WHERE construction_id = OLD.construction_id
    );
END IF;
END;
// DELIMITER ;
COMMIT;