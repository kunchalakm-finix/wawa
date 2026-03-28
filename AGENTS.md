# Coffee Shop Dashboard - Development Guide

## Project Overview

This is a business intelligence dashboard for coffee shop analytics with 30+ KPIs across 8 dimensions.

## Files

- `dashboard.html` - Main dashboard (single file application)
- `coffee_sales_group1_realistic_1500rows.csv` - Sample sales data
- `KPI_Coffee_Shop_UTF8BOM.csv` - KPI definitions

## Data Structure

### CSV Columns
```
order_id, order_date, day_of_week, hour, time_slot, menu_item, category, 
hot_iced, size, qty, unit_price_thb, discount_thb, net_sales_thb, 
channel, payment_method, promo_flag, customer_type, add_on
```

### Categories
- Coffee, Tea, Bakery, Soda, Non-Coffee

### Channels
- Walk-in, Grab/Delivery, Line Man/Delivery

### Time Slots
- Morning Peak (8-11), Midday (11-14), Afternoon Peak (14-17), Late (17+)

## Dashboard Features

### 8 Dimensions
1. ยอดขาย (Sales)
2. ผลิตภัณฑ์ (Product)
3. ลูกค้า (Customer)
4. ช่องทาง (Channel)
5. เวลา (Time)
6. โปรโมชัน (Promotion)
7. การชำระเงิน (Payment)
8. Productivity

### Key Features
- Cross filtering: Click chart elements to filter data
- KPI popup: Click ℹ️ button for detailed KPI info
- Donut charts for visual representation
- Bar charts for rankings

## Development Commands

### View Dashboard
Open `dashboard.html` in browser

### Import Data
Use the "Import Excel File" button or data loads automatically from CSV

## KPI Database Structure

KPI info is stored in `kpiInfo` object with:
- title: KPI name
- desc: Description for CEO
- interpretation: How to interpret
- formula: Calculation formula
- dataSource: Source columns
- target: Target value
- benchmark: Industry benchmark
- action: Action items
- history: Data tracking frequency
