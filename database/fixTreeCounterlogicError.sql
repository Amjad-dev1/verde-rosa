DROP VIEW IF EXISTS TreeCounter;
GO
CREATE VIEW TreeCounter AS
SELECT FLOOR(SUM(Amount)/10) AS TreesPlanted
FROM Donations;
GO
