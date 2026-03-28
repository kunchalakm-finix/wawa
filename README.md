# Coffee Shop Dashboard

Business Intelligence Dashboard for Coffee Shop Analytics

## Overview

This project provides a comprehensive analytics dashboard for coffee shop business management, featuring:

- **30+ KPIs** covering all business dimensions
- **Interactive Dashboard** with cross-filtering capabilities
- **Data Import** support for Excel (.xlsx) and CSV files

## Project Structure

```
case3-ร้านกาแฟ/
├── dashboard.html          # Main dashboard (HTML/CSS/JS)
├── coffee_sales_group1_realistic_1500rows.csv  # Sample data
├── KPI_Coffee_Shop_UTF8BOM.csv  # KPI definitions
└── README.md
```

## Features

### Dashboard Dimensions (8 Dimensions, 30 KPIs)

1. **ยอดขาย (Sales)** - Total Revenue, AOV, Growth Rate, Discount Rate
2. **ผลิตภัณฑ์ (Product)** - Sales by Category, Top Items, Hot/Iced, Size, Add-on
3. **ลูกค้า (Customer)** - New/Returning, Retention Rate, Acquisition
4. **ช่องทาง (Channel)** - Sales by Channel, Contribution %, Orders, AOV
5. **เวลา (Time)** - Sales by Time Slot, Hour, Day, Weekend/Weekday
6. **โปรโมชัน (Promotion)** - Promo Usage, Impact, Discount by Category
7. **การชำระเงิน (Payment)** - Payment Methods, Cash vs Digital
8. **Productivity** - Orders/Hour, Revenue/Hour, Peak Utilization

### Interactive Features

- **Cross Filtering**: Click on any chart element to filter data
- **KPI Information**: Click ℹ️ button to view detailed KPI descriptions
- **Import Excel**: Upload your own data files (.xlsx, .xls, .csv)

## Usage

1. Open `dashboard.html` in a web browser
2. Data loads automatically from CSV file
3. Click "Import Excel File" to upload your own data

## Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for CDN resources)

## KPI Definitions

See `KPI_Coffee_Shop_UTF8BOM.csv` for complete KPI definitions including:
- Description
- Interpretation
- Formula
- Data Source

## Tech Stack

- HTML5, CSS3, JavaScript
- SheetJS (xlsx) for Excel parsing
- Google Fonts (Prompt)

## License

Private - For business use only
