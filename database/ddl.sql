CREATE DATABASE VerdeRosaDB;
GO
USE VerdeRosaDB;
GO

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Phone VARCHAR(50),
    Role VARCHAR(20) DEFAULT 'User',
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Subscribers (
    SubscriberID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NULL,
    Email VARCHAR(150) NOT NULL UNIQUE,
    Phone VARCHAR(50),
    PreferredChannel VARCHAR(20) DEFAULT 'email',
    SubscribeDate DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    ProductName VARCHAR(150) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL,
    Category VARCHAR(50),              
    CreatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE Flowers (
    FlowerID INT IDENTITY(1,1) PRIMARY KEY,
    FlowerName VARCHAR(100) NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);


CREATE TABLE CustomBouquets (
    CustomBouquetID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


CREATE TABLE CustomBouquetFlowers (
    CustomBouquetID INT NOT NULL,
    FlowerID INT NOT NULL,
    Quantity INT NOT NULL,
    PRIMARY KEY (CustomBouquetID, FlowerID),
    FOREIGN KEY (CustomBouquetID) REFERENCES CustomBouquets(CustomBouquetID),
    FOREIGN KEY (FlowerID) REFERENCES Flowers(FlowerID)
);


CREATE TABLE Carts (
    CartID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL UNIQUE, 
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


CREATE TABLE CartItems (
    CartItemID INT IDENTITY(1,1) PRIMARY KEY,
    CartID INT NOT NULL,
    ProductID INT NULL,
    CustomBouquetID INT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (CartID) REFERENCES Carts(CartID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (CustomBouquetID) REFERENCES CustomBouquets(CustomBouquetID)
);


CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    Status VARCHAR(50) DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE OrderItems (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NULL,
    CustomBouquetID INT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (CustomBouquetID) REFERENCES CustomBouquets(CustomBouquetID)
);


CREATE TABLE Donations (
    DonationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    DonateDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


CREATE VIEW TreeCounter AS
SELECT COUNT(*) AS TreesPlanted FROM Donations;


INSERT INTO Products (ProductName, Price, Stock, Category)
VALUES ('Custom Bouquet', 0, 9999, 'Bouquet');

CREATE TABLE Addresses (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    Province VARCHAR(100),
    Area VARCHAR(100),
    ZipCode VARCHAR(20),
    AddressLine VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

ALTER TABLE Orders
ADD AddressID INT NULL,
    FOREIGN KEY (AddressID) REFERENCES Addresses(AddressID);


ALTER TABLE Orders
ADD IsPOD BIT DEFAULT 0,
    PODStatus VARCHAR(50) DEFAULT 'In Process';

ALTER TABLE Donations
ADD TreesPlanted INT DEFAULT 1,
    TreeType VARCHAR(100) NULL,  -- e.g., 'Oak', 'Pine'
    PlantingLocation VARCHAR(255) NULL;  -- e.g., 'Amazon Rainforest'

CREATE TABLE SustainabilityFacts (
    FactID INT IDENTITY(1,1) PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Category VARCHAR(100) DEFAULT 'General',  -- e.g., 'Trees', 'Environment', 'Climate'
    Source VARCHAR(255) NULL,  -- e.g., 'One Tree Planted', 'World Bank'
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);
DROP VIEW IF EXISTS TreeCounter;
GO
CREATE VIEW TreeCounter AS
SELECT SUM(TreesPlanted) AS TreesPlanted FROM Donations;
GO
