const fs = require('fs');
const path = require('path');

const content = `ลำดับ,มิติ,ชื่อ KPI,คำอธิบาย KPI (สำหรับ CEO),การแปลผลของ KPI (สำหรับ CEO),วิธีการคำนวน,วิธีการคำนวนข้อมูลที่ใช้
1,ยอดขาย,Total Revenue,รายได้รวมทั้งหมดจากการขาย,ควรเพิ่มขึ้นทุกเดือน หากต่ำกว่าเป้า ต้องหาสาเหตุ,ผลรวม net_sales_thb ทั้งหมด,SUM(net_sales_thb)
2,ยอดขาย,Average Order Value (AOV),มูลค่าเฉลี่ยต่อออร์เดอร์,ยิ่งสูง = ลูกค้าซื้อมากขึ้นต่อครั้ง,ผลรวมยอดขาย / จำนวนออร์เดอร์,SUM(net_sales_thb) / COUNT(DISTINCT order_id)
3,ยอดขาย,Revenue Growth Rate,อัตราการเติบโตของยอดขาย,เป้าหมาย >10% ต่อเดือน,(ยอดขายเดือนนี้ - ยอดขายเดือนก่อน) / ยอดขายเดือนก่อน *100,(Current Month Sales - Previous Month Sales) / Previous Month Sales * 100
4,ยอดขาย,Discount Rate,สัดส่วนส่วนลดต่อยอดขาย,ควร <5% สูงเกินไปแสดงถึงปัญหาราคา,ผลรวมส่วนลด / ผลรวมยอดขาย *100,SUM(discount_thb) / SUM(net_sales_thb+discount_thb) * 100
5,ผลิตภัณฑ์,Sales by Category,ยอดขายแต่ละหมวดสินค้า,วิเคราะห์หมวดไหนขายดี/ไม่ดี,ผลรวมยอดขายตามหมวด,GROUP BY category, SUM(net_sales_thb)
6,ผลิตภัณฑ์,Top Selling Items (Top 10),เมนูยอดนิยม 10 อันดับ,มุ่งเน้นโปรโมตสินค้าขายดี,จำนวนออร์เดอร์แต่ละเมนู,GROUP BY menu_item, COUNT(*) ORDER BY DESC
7,ผลิตภัณฑ์,Hot vs Iced Ratio,สัดส่วนเครื่องดื่มร้อน/เย็น,ปรับสต็อกตามความชอบลูกค้า,จำนวนรายการร้อน/เย็น,COUNT WHERE hot_iced='Hot' vs 'Iced'
8,ผลิตภัณฑ์,Size Preference,ความนิยมของขนาด,S/M/L อันไหนขายดีสุด,จำนวนขายตามขนาด,GROUP BY size, COUNT(*)
9,ผลิตภัณฑ์,Add-on Attachment Rate,อัตราการซื้อส่วนเพิ่ม,สูง = เพิ่มรายได้ต่อออร์เดอร์,สัดส่วนรายการมี add-on,COUNT WHERE add_on != 'None' / COUNT(*) *100
10,ลูกค้า,Customer Acquisition,จำนวนลูกค้าใหม่,เป้าหมายเพิ่มขึ้นทุกเดือน,นับลูกค้า New,COUNT WHERE customer_type='New'
11,ลูกค้า,Customer Retention Rate,อัตราการรักษาลูกค้า,>70% = ดี ความภักดีสูง,ลูกค้า Returning / ลูกค้าทั้งหมด *100,COUNT WHERE customer_type='Returning' / COUNT(*) *100
12,ลูกค้า,New vs Returning Ratio,สัดส่วนลูกค้าใหม่/เก่า,แสดงการเติบโตของฐานลูกค้า,นับแยก New และ Returning,GROUP BY customer_type, COUNT(*)
13,ลูกค้า,Average Items per Order,จำนวนรายการเฉลี่ยต่อออร์เดอร์,สูง = แนะนำสินค้าได้ดี,ผลรวม qty / จำนวนออร์เดอร์,SUM(qty) / COUNT(DISTINCT order_id)
14,ช่องทาง,Sales by Channel,ยอดขายแต่ละช่องทาง,ช่องทางไหนทำรายได้สูงสุด,ผลรวมยอดขายตามช่องทาง,GROUP BY channel, SUM(net_sales_thb)
15,ช่องทาง,Channel Contribution %,สัดส่วนยอดขายแต่ละช่องทาง,Walk-in ควร >50% ของรายได้,%ยอดขายแต่ละช่องทาง,(Channel Sales / Total Sales) *100
16,ช่องทาง,Orders by Channel,จำนวนออร์เดอร์แต่ละช่องทาง,วิเคราะห์ประสิทธิภาพช่องทาง,นับจำนวนออร์เดอร์,GROUP BY channel, COUNT(DISTINCT order_id)
17,เวลา,Sales by Time Slot,ยอดขายแต่ละช่วงเวลา,Peak hours = Morning/Afternoon,ผลรวมยอดขายตามช่วง,GROUP BY time_slot, SUM(net_sales_thb)
18,เวลา,Sales by Hour,ยอดขายแต่ละชั่วโมง,หาชั่วโมงขายดีสุด,ผลรวมยอดขายตามชั่วโมง,GROUP BY hour, SUM(net_sales_thb)
19,เวลา,Sales by Day of Week,ยอดขายแต่ละวัน,วันไหนขายดี/ไม่ดี,ผลรวมยอดขายตามวัน,GROUP BY day_of_week, SUM(net_sales_thb)
20,เวลา,Weekend vs Weekday,ยอดขายวันธรรมดา vs วันหยุด,วางแผน workforce,เปรียบเทียบยอดขาย,GROUP BY weekend/weekday
21,โปรโมชัน,Promo Usage Rate,อัตราการใช้โปรโมชัน,ควร <20% สูงเกินไปเสียรายได้,สัดส่วนออร์เดอร์มีโปร,SUM(promo_flag) / COUNT(*) *100
22,โปรโมชัน,Promo Impact on AOV,ผลโปรโมชันต่อ AOV,โปรเพิ่ม AOV หรือไม่,เปรียบเทียบ AOV มี/ไม่มีโปร,AOV with promo vs without promo
23,โปรโมชัน,Discount by Category,ส่วนลดแต่ละหมวดสินค้า,หมวดไหนให้ส่วนลดมาก,ผลรวมส่วนลดตามหมวด,GROUP BY category, SUM(discount_thb)
24,การชำระเงิน,Payment Method Mix,สัดส่วนวิธีการชำระเงิน,QR ควรเป็น main method,นับสัดส่วนแต่ละวิธี,GROUP BY payment_method, COUNT(*)
25,การชำระเงิน,Cash vs Digital Ratio,สัดส่วนเงินสด vs ดิจิทัล,ต้นทุน handling,เปรียบเทียบ,Cash / Total *100
26,Productivity,Orders per Hour,จำนวนออร์เดอร์ต่อชั่วโมง,ประสิทธิภาพการทำงาน,ออร์เดอร์ / ชั่วโมง,COUNT(order_id) / hours_operated
27,Productivity,Revenue per Hour,รายได้ต่อชั่วโมง,Productivity ของร้าน,รายได้ / ชั่วโมงทำงาน,SUM(net_sales_thb) / hours_operated
28,Productivity,Peak Hour Utilization,% การใช้งานชั่วโมงเร่งด่วน,ใช้เวลาพีคได้ดีแค่ไหน,ยอดขายชั่วโมงพีค / ยอดขายทั้งหมด,Peak hours sales / Total Sales *100
29,Productivity,Average Prep Time Proxy,เวลาเตรียมเฉลี่ย (จาก qty/hour),ประสิทธิภาพทำรายการ,qty รวม / จำนวนชั่วโมงพีค,SUM(qty) / peak_hours
30,Productivity,Basket Size Optimization,เพิ่มขนาดออร์เดอร์เฉลี่ย,เพิ่ม AOV ด้วย cross-sell,เป้า AOV >100 บาท,Monitor AOV trend`;

// Add UTF-8 BOM
const bom = '\ufeff';
const contentWithBom = bom + content;

const baseDir = "C:\\Users\\Nitchapat\\Downloads\\case3-ร้านกาแฟ";
const outputPath = path.join(baseDir, "KPI_Coffee_Shop_UTF8BOM.csv");

fs.writeFileSync(outputPath, contentWithBom, 'utf8');

console.log("File saved: " + outputPath);
